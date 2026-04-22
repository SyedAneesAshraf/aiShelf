import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FunnelChart } from "@/components/dashboard/funnel-chart";
import { QueryBreakdownTable } from "@/components/dashboard/query-breakdown-table";
import { LostReasonClusters } from "@/components/dashboard/lost-reason-clusters";
import {
  MOCK_FUNNEL,
  MOCK_QUERY_BREAKDOWN,
  MOCK_LOST_REASONS,
  MOCK_WINNING_PATTERNS,
} from "@/lib/mock-data";

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <Header
        title="Search & Funnel"
        description="Real Storefront API search + Claude AI re-ranking analysis"
        action={{ label: "Run Search Queries" }}
        meta={
          <Badge variant="info">
            {MOCK_FUNNEL.queriesRun} queries · Mock data
          </Badge>
        }
      />

      {/* Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>AI Recommendation Funnel</CardTitle>
          <p className="text-xs text-gray-500 mt-1">
            From search query to AI recommendation win
          </p>
        </CardHeader>
        <CardContent>
          <FunnelChart metrics={MOCK_FUNNEL} />
        </CardContent>
      </Card>

      {/* Lost reason clusters + winners */}
      <Card>
        <CardHeader>
          <CardTitle>Root Cause Analysis</CardTitle>
          <p className="text-xs text-gray-500 mt-1">
            Aggregated from all {MOCK_FUNNEL.queriesRun} queries
          </p>
        </CardHeader>
        <CardContent>
          <LostReasonClusters
            clusters={MOCK_LOST_REASONS}
            winningPatterns={MOCK_WINNING_PATTERNS}
          />
        </CardContent>
      </Card>

      {/* Query breakdown table */}
      <Card>
        <CardHeader>
          <CardTitle>Query-Level Breakdown</CardTitle>
          <p className="text-xs text-gray-500 mt-1">
            Every query surfaced, shortlisted, and recommended status
          </p>
        </CardHeader>
        <CardContent>
          <QueryBreakdownTable rows={MOCK_QUERY_BREAKDOWN} />
        </CardContent>
      </Card>
    </div>
  );
}
