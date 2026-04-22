import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScoreRing } from "@/components/ui/score-ring";
import { RewriteCard } from "@/components/dashboard/rewrite-card";
import { MOCK_STORE_AUDIT, MOCK_REWRITES, MOCK_CATALOG_SYNC } from "@/lib/mock-data";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <Header
        title="Products & Rewrites"
        description="Per-product AI scores and AI-optimized description rewrites"
      />

      {/* Product list */}
      <Card>
        <CardHeader>
          <CardTitle>Per-Product Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-800">
            {MOCK_STORE_AUDIT.productScores.map((ps) => {
              const catalogProduct = MOCK_CATALOG_SYNC.find(
                (c) => c.id === ps.productId
              );
              return (
                <div key={ps.productId} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <ScoreRing score={ps.overallAIReadiness} size={52} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-gray-200">
                          {ps.productTitle}
                        </p>
                        {catalogProduct && (
                          <Badge
                            variant={
                              catalogProduct.catalogSyncScore >= 70
                                ? "success"
                                : catalogProduct.catalogSyncScore >= 40
                                ? "warning"
                                : "error"
                            }
                            className="text-[10px]"
                          >
                            Catalog {catalogProduct.catalogSyncScore}
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                        {[
                          ["Data", ps.dataCompleteness],
                          ["Policy", ps.policyClarity],
                          ["Trust", ps.trustSignals],
                          ["FAQ", ps.faqCoverage],
                          ["Structure", ps.structuredDataQuality],
                        ].map(([label, val]) => (
                          <div key={label as string}>
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-[10px] text-gray-600">
                                {label}
                              </span>
                              <span className="text-[10px] text-gray-500">
                                {val}
                              </span>
                            </div>
                            <Progress
                              value={val as number}
                              className="h-1"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Rewrites */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-white">
          AI-Optimized Rewrites
        </h2>
        <p className="text-sm text-gray-500 -mt-2">
          Copy these directly into your Shopify product descriptions.
        </p>
        {MOCK_REWRITES.map((r) => (
          <RewriteCard key={r.productId} rewrite={r} />
        ))}
      </div>
    </div>
  );
}
