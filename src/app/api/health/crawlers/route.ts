/**
 * GET /api/health/crawlers?storeDomain=xxx
 * Module 2a — Fetch and parse robots.txt to check AI bot access.
 *
 * Response: CrawlerAuditResult
 */

import { NextRequest, NextResponse } from "next/server";
import { MOCK_CRAWLER_AUDIT } from "@/lib/mock-data";
import { fetchRobotsTxt, parseRobotsTxt } from "@/lib/shopify";
import type { CrawlerAuditResult, BotStatus } from "@/lib/types";

const AI_BOTS = [
  { name: "OAI-SearchBot", userAgent: "oai-searchbot" },
  { name: "GPTBot",        userAgent: "gptbot" },
  { name: "PerplexityBot", userAgent: "perplexitybot" },
  { name: "GoogleBot",     userAgent: "googlebot" },
  { name: "BingBot",       userAgent: "bingbot" },
  { name: "ClaudeBot",     userAgent: "claudebot" },
];

export async function GET(req: NextRequest) {
  const storeDomain = req.nextUrl.searchParams.get("storeDomain");

  if (!storeDomain) {
    return NextResponse.json({ error: "storeDomain query param required" }, { status: 400 });
  }

  // ── LIVE PATH (disabled in dev — set USE_MOCK=false to enable) ────────────
  if (process.env.USE_MOCK !== "false") {
    return NextResponse.json(MOCK_CRAWLER_AUDIT);
  }

  try {
    const robotsTxt = await fetchRobotsTxt(storeDomain);
    const statusMap = parseRobotsTxt(robotsTxt);

    const bots = AI_BOTS.map((bot) => ({
      ...bot,
      status: (statusMap[bot.userAgent] ?? "unknown") as BotStatus,
    }));

    const result: CrawlerAuditResult = {
      robotsTxtFound: true,
      robotsTxtUrl: `https://${storeDomain}/robots.txt`,
      hasCriticalBlock: bots.some(
        (b) => b.status === "blocked" && ["gptbot", "oai-searchbot", "perplexitybot"].includes(b.userAgent)
      ),
      bots,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("[/api/health/crawlers]", err);
    return NextResponse.json(
      { ...MOCK_CRAWLER_AUDIT, error: "Live fetch failed — showing cached mock data" },
      { status: 200 }
    );
  }
}
