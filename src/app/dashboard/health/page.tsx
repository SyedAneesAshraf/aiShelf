import { Header } from "@/components/layout/header";
import { CrawlerAuditCard } from "@/components/dashboard/crawler-audit-card";
import { CatalogSyncCard } from "@/components/dashboard/catalog-sync-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MOCK_CRAWLER_AUDIT,
  MOCK_CATALOG_SYNC,
  MOCK_INVENTORY_ISSUES,
} from "@/lib/mock-data";

export default function HealthPage() {
  return (
    <div className="space-y-6">
      <Header
        title="Technical Health"
        description="P0 blockers that make all other optimizations irrelevant if unresolved"
        action={{ label: "Refresh Checks" }}
        meta={
          MOCK_CRAWLER_AUDIT.hasCriticalBlock ? (
            <Badge variant="error">🚨 1 Critical Blocker</Badge>
          ) : (
            <Badge variant="success">✓ No Critical Blockers</Badge>
          )
        }
      />

      {/* Module 2a */}
      <CrawlerAuditCard data={MOCK_CRAWLER_AUDIT} />

      {/* Module 2b */}
      <CatalogSyncCard products={MOCK_CATALOG_SYNC} />

      {/* Module 2c */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Inventory & Pricing Consistency</CardTitle>
            <Badge
              variant={MOCK_INVENTORY_ISSUES.length > 0 ? "warning" : "success"}
            >
              {MOCK_INVENTORY_ISSUES.length === 0
                ? "All Clear"
                : `${MOCK_INVENTORY_ISSUES.length} Issues`}
            </Badge>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Silent killers — AI agents won&apos;t recommend out-of-stock or
            broken-price products
          </p>
        </CardHeader>
        <CardContent>
          {MOCK_INVENTORY_ISSUES.length === 0 ? (
            <p className="text-sm text-emerald-400">
              ✓ No inventory or pricing issues detected.
            </p>
          ) : (
            <div className="space-y-3">
              {MOCK_INVENTORY_ISSUES.map((issue) => (
                <div
                  key={issue.productId}
                  className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3"
                >
                  <span className="text-amber-400 mt-0.5">⚠</span>
                  <div>
                    <p className="text-sm font-medium text-gray-200">
                      {issue.productTitle}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 capitalize">
                      {issue.issue.replace(/_/g, " ")}
                      {issue.detail ? ` — ${issue.detail}` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
