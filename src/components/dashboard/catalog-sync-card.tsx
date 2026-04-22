import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { CatalogSyncProduct } from "@/lib/types";

interface CatalogSyncCardProps {
  products: CatalogSyncProduct[];
}

function StatusIcon({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="text-emerald-400 text-sm">✅</span>
  ) : (
    <span className="text-red-400 text-sm">❌</span>
  );
}

export function CatalogSyncCard({ products }: CatalogSyncCardProps) {
  const avgScore = Math.round(
    products.reduce((acc, p) => acc + p.catalogSyncScore, 0) / products.length
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Catalog Sync Health</CardTitle>
          <Badge variant={avgScore >= 70 ? "success" : avgScore >= 40 ? "warning" : "error"}>
            Avg {avgScore}/100
          </Badge>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Powers ChatGPT and Gemini Shopify integrations
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => {
            const allMetafieldsFilled = product.mandatoryMetafields.every((m) => m.present);
            const missingMetafields = product.mandatoryMetafields
              .filter((m) => !m.present)
              .map((m) => m.key);
            return (
              <div
                key={product.id}
                className="bg-gray-800/50 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">
                    {product.title}
                  </span>
                  <Badge
                    variant={
                      product.catalogSyncScore >= 70
                        ? "success"
                        : product.catalogSyncScore >= 40
                        ? "warning"
                        : "error"
                    }
                  >
                    {product.catalogSyncScore}/100
                  </Badge>
                </div>
                <Progress value={product.catalogSyncScore} className="mb-3" />
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-gray-400">
                    <StatusIcon ok={!!product.sptCategory} />
                    SPT Category
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <StatusIcon ok={allMetafieldsFilled} />
                    Mandatory Metafields
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <StatusIcon ok={product.variantStructure === "correct"} />
                    Variant Structure
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <StatusIcon ok={product.pricingConsistent} />
                    Pricing Consistent
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <StatusIcon ok={product.inventoryTracked} />
                    Inventory Tracked
                  </div>
                </div>
                {missingMetafields.length > 0 && (
                  <p className="text-xs text-amber-400 mt-2">
                    Missing: {missingMetafields.join(", ")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
