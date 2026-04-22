/**
 * POST /api/search/run
 * Module 4 — Execute query bank against Storefront API and re-rank with Claude.
 *
 * Body: { storeDomain: string; category?: string }
 * Response: { queryResults: QueryResult[]; funnelMetrics: FunnelMetrics }
 */

import { NextRequest, NextResponse } from "next/server";
import { MOCK_QUERY_RESULTS, MOCK_FUNNEL } from "@/lib/mock-data";
import { getAllQueries, getQueriesForCategory } from "@/lib/query-bank";
import { storefrontSearch } from "@/lib/shopify";
import { rerankSearchResults } from "@/lib/claude";
import type { QueryCategory } from "@/lib/query-bank";
import type { FunnelMetrics, QueryResult } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { storeDomain, category } = body as { storeDomain?: string; category?: QueryCategory };

    if (!storeDomain) {
      return NextResponse.json({ error: "storeDomain is required" }, { status: 400 });
    }

    // ── LIVE PATH ─────────────────────────────────────────────────────────────
    if (
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN &&
      process.env.ANTHROPIC_API_KEY &&
      process.env.USE_MOCK !== "true"
    ) {
      const queries = category ? getQueriesForCategory(category) : getAllQueries();
      const queryResults: QueryResult[] = [];

      for (const q of queries) {
        try {
          const storefrontResults = await storefrontSearch(storeDomain, q.query);
          const products = storefrontResults.map((p, i) => ({
            id: p.id,
            title: p.title,
            tags: p.tags,
            price: p.priceRange.minVariantPrice.amount,
            position: i + 1,
          }));

          const reranked = await rerankSearchResults(
            q.query,
            products.map((p) => ({ id: p.id, title: p.title, tags: p.tags, price: p.price }))
          );

          if (reranked) queryResults.push(reranked);
        } catch (qErr) {
          console.warn(`[search/run] query failed: "${q.query}"`, qErr);
        }
      }

      const funnel = computeFunnelMetrics(queryResults);
      return NextResponse.json({ queryResults, funnelMetrics: funnel });
    }

    // ── MOCK ──────────────────────────────────────────────────────────────────
    return NextResponse.json({
      queryResults: MOCK_QUERY_RESULTS,
      funnelMetrics: MOCK_FUNNEL,
    });
  } catch (err) {
    console.error("[/api/search/run]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function computeFunnelMetrics(queryResults: QueryResult[]): FunnelMetrics {
  const total = queryResults.length;
  const appeared = queryResults.filter((q) => q.totalSurfaced > 0).length;
  const shortlisted = queryResults.filter((q) =>
    q.surfacedProducts.some((p) => p.shortlisted)
  ).length;
  const recommended = queryResults.filter((q) =>
    q.surfacedProducts.some((p) => p.recommended)
  ).length;

  return {
    queriesRun: total,
    searchAppearanceCount: appeared,
    searchAppearanceRate: total ? Math.round((appeared / total) * 100) : 0,
    aiShortlistCount: shortlisted,
    aiShortlistRate: appeared ? Math.round((shortlisted / appeared) * 100) : 0,
    aiRecommendationCount: recommended,
    aiRecommendationRate: shortlisted ? Math.round((recommended / shortlisted) * 100) : 0,
    overallAIConversionRate: total ? Math.round((recommended / total) * 100) : 0,
  };
}
