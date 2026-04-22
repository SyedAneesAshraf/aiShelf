import { Header } from "@/components/layout/header";
import { ScoreOverview } from "@/components/dashboard/score-overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MOCK_STORE_AUDIT,
  MOCK_CRAWLER_AUDIT,
  MOCK_CATALOG_SYNC,
  MOCK_FUNNEL,
  MOCK_PERCEPTION_GAP,
  MOCK_ACTION_ITEMS,
  MOCK_STORE,
} from "@/lib/mock-data";

export default function DashboardOverviewPage() {
  const avgCatalogSync = Math.round(
    MOCK_CATALOG_SYNC.reduce((a, p) => a + p.catalogSyncScore, 0) /
      MOCK_CATALOG_SYNC.length
  );

  const topActions = MOCK_ACTION_ITEMS.slice(0, 4);

  return (
    <div className="space-y-6">
      <Header
        title="AI Shelf Dashboard"
        description={`${MOCK_STORE.storeName} · ${MOCK_STORE.productCount} products · Last run: ${new Date(MOCK_STORE.connectedAt).toLocaleDateString()}`}
        action={{ label: "Re-run Analysis" }}
      />

      <ScoreOverview
        aiReadinessScore={MOCK_STORE_AUDIT.overallAIReadiness}
        catalogSyncScore={avgCatalogSync}
        searchAppearanceRate={MOCK_FUNNEL.searchAppearanceRate}
        aiWinRate={MOCK_FUNNEL.overallAIConversionRate}
        hasCriticalBlock={MOCK_CRAWLER_AUDIT.hasCriticalBlock}
      />

      {/* Quick insight row */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Perception Alignment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-amber-400">
              {MOCK_PERCEPTION_GAP.alignmentScore}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              How AI reads your store vs how you describe it
            </p>
            <a
              href="/dashboard/perception"
              className="text-xs text-brand-400 hover:text-brand-300 mt-3 inline-block"
            >
              View full gap analysis →
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-brand-400">
              {MOCK_FUNNEL.overallAIConversionRate}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Queries where AI agents recommended your products
            </p>
            <a
              href="/dashboard/search"
              className="text-xs text-brand-400 hover:text-brand-300 mt-3 inline-block"
            >
              View funnel breakdown →
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open Action Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-white">
              {MOCK_ACTION_ITEMS.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Ranked by query losses caused
            </p>
            <a
              href="/dashboard/actions"
              className="text-xs text-brand-400 hover:text-brand-300 mt-3 inline-block"
            >
              View action plan →
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Top actions preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Top Priority Actions</CardTitle>
            <a
              href="/dashboard/actions"
              className="text-xs text-brand-400 hover:text-brand-300"
            >
              View all →
            </a>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topActions.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 py-2.5 border-b border-gray-800 last:border-0"
              >
                <span className="text-brand-400">✦</span>
                <p className="text-sm text-gray-200 flex-1">{item.title}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="error" className="text-[10px]">
                    {item.queriesLost} lost
                  </Badge>
                  <Badge
                    variant={item.effort === "low" ? "success" : "warning"}
                    className="text-[10px]"
                  >
                    {item.effort} effort
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
