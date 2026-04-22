import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScoreRing } from "@/components/ui/score-ring";
import { MOCK_STORE_AUDIT } from "@/lib/mock-data";

const DIMENSION_LABELS: Record<string, string> = {
  dataCompleteness: "Product Data Completeness",
  policyClarity: "Policy Clarity",
  trustSignals: "Trust Signal Strength",
  faqCoverage: "FAQ Coverage",
  structuredDataQuality: "Structured Data Quality",
};

const FAQ_STATUS_VARIANT = {
  answerable: "success" as const,
  partial: "warning" as const,
  unanswerable: "error" as const,
};

export default function AuditPage() {
  const { overallAIReadiness: overallScore, productScores, faqItems } = MOCK_STORE_AUDIT;

  const faqAnswerable = faqItems.filter((f) => f.status === "answerable").length;
  const faqPartial = faqItems.filter((f) => f.status === "partial").length;
  const faqUnanswerable = faqItems.filter(
    (f) => f.status === "unanswerable"
  ).length;

  return (
    <div className="space-y-6">
      <Header
        title="AI Readiness Audit"
        description="Static analysis of how well your store data satisfies AI agent requirements"
        action={{ label: "Re-run Audit" }}
        meta={
          <Badge
            variant={
              overallScore >= 70
                ? "success"
                : overallScore >= 40
                ? "warning"
                : "error"
            }
          >
            Overall Score: {overallScore}/100
          </Badge>
        }
      />

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Store-Level Dimensions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productScores[0] &&
              Object.entries(DIMENSION_LABELS).map(([key, label]) => {
                const val =
                  productScores[0][key as keyof (typeof productScores)[0]] ?? 0;
                const numVal = typeof val === "number" ? val : 0;
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-gray-400">{label}</span>
                      <span className="text-xs font-bold text-gray-200">
                        {numVal}
                      </span>
                    </div>
                    <Progress value={numVal} />
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Coverage */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>FAQ Coverage</CardTitle>
            <div className="flex gap-2">
              <Badge variant="success">{faqAnswerable} answerable</Badge>
              <Badge variant="warning">{faqPartial} partial</Badge>
              <Badge variant="error">{faqUnanswerable} unanswerable</Badge>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            15 standard pre-purchase questions answered from your store data
            alone
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-2 border-b border-gray-800/60 last:border-0"
              >
                <Badge
                  variant={FAQ_STATUS_VARIANT[item.status]}
                  className="mt-0.5 shrink-0 text-[10px]"
                >
                  {item.status}
                </Badge>
                <p className="text-sm text-gray-300">{item.question}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Per-product scores */}
      <Card>
        <CardHeader>
          <CardTitle>Per-Product AI Readiness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {productScores.map((ps) => (
              <div key={ps.productId} className="bg-gray-800/40 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-gray-200">
                    {ps.productTitle}
                  </p>
                  <ScoreRing score={ps.overallAIReadiness} size={48} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                  {Object.entries(DIMENSION_LABELS).map(([key, label]) => {
                    const val = ps[key as keyof typeof ps];
                    const numVal = typeof val === "number" ? val : 0;
                    return (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[10px] text-gray-600">
                            {label}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400">
                            {numVal}
                          </span>
                        </div>
                        <Progress value={numVal} className="h-1" />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
