import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActionMatrix } from "@/components/dashboard/action-matrix";
import { MOCK_ACTION_ITEMS } from "@/lib/mock-data";

export default function ActionsPage() {
  const totalQueriesLost = MOCK_ACTION_ITEMS.reduce(
    (acc, a) => acc + a.queriesLost,
    0
  );

  return (
    <div className="space-y-6">
      <Header
        title="Action Plan"
        description="Ranked by query losses caused × fixability. Each item has an auto-generated rewrite."
        action={{ label: "Regenerate Plan" }}
        meta={
          <Badge variant="error">
            {totalQueriesLost} total query losses addressable
          </Badge>
        }
      />

      <ActionMatrix items={MOCK_ACTION_ITEMS} />

      {/* Ranked list detail */}
      <Card>
        <CardHeader>
          <CardTitle>All Action Items — Ranked</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_ACTION_ITEMS.sort((a, b) => b.queriesLost - a.queriesLost).map(
              (item, i) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 bg-gray-800/40 rounded-xl p-4"
                >
                  <span className="text-2xl font-bold text-gray-700 w-7 shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-200">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge variant="error" className="text-[10px]">
                        {item.queriesLost} queries lost
                      </Badge>
                      <Badge
                        variant={item.impact === "high" ? "success" : "neutral"}
                        className="text-[10px]"
                      >
                        {item.impact} impact
                      </Badge>
                      <Badge
                        variant={item.effort === "low" ? "success" : "warning"}
                        className="text-[10px]"
                      >
                        {item.effort} effort
                      </Badge>
                      {item.hasRewrite && (
                        <Badge variant="info" className="text-[10px]">
                          ✦ rewrite ready
                        </Badge>
                      )}
                    </div>
                  </div>
                  {item.hasRewrite && (
                    <a
                      href="/dashboard/products"
                      className="text-xs text-brand-400 hover:text-brand-300 shrink-0"
                    >
                      View rewrite →
                    </a>
                  )}
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
