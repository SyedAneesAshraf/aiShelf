/**
 * GET /api/search/results
 * Return the last cached search results and funnel metrics.
 *
 * Response: { queryResults, funnelMetrics, queryBreakdown, lostReasonClusters, winningPatterns }
 */

import { NextResponse } from "next/server";
import {
  MOCK_QUERY_RESULTS,
  MOCK_FUNNEL,
  MOCK_QUERY_BREAKDOWN,
  MOCK_LOST_REASONS,
  MOCK_WINNING_PATTERNS,
} from "@/lib/mock-data";

export async function GET() {
  // TODO: Retrieve latest run results from database for the connected store

  return NextResponse.json({
    queryResults: MOCK_QUERY_RESULTS,
    funnelMetrics: MOCK_FUNNEL,
    queryBreakdown: MOCK_QUERY_BREAKDOWN,
    lostReasonClusters: MOCK_LOST_REASONS,
    winningPatterns: MOCK_WINNING_PATTERNS,
  });
}
