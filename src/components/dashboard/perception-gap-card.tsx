import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PerceptionGapAnalysis } from "@/lib/types";

interface PerceptionGapCardProps {
  data: PerceptionGapAnalysis;
}

const severityVariant = {
  critical: "error" as const,
  moderate: "warning" as const,
  minor: "neutral" as const,
};

export function PerceptionGapCard({ data }: PerceptionGapCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Perception vs. Intent Gap</CardTitle>
          <Badge
            variant={
              data.alignmentScore >= 70
                ? "success"
                : data.alignmentScore >= 40
                ? "warning"
                : "error"
            }
          >
            {data.alignmentScore}% Alignment
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800/50 rounded-xl p-4">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-2">
              You Say
            </p>
            <p className="text-sm text-gray-200 leading-relaxed">
              &quot;{data.merchantIntent.brandDescription}&quot;
            </p>
            {data.merchantIntent.topDifferentiators.length > 0 && (
              <ul className="mt-2 space-y-0.5">
                {data.merchantIntent.topDifferentiators.map((d) => (
                  <li key={d} className="text-xs text-gray-400">
                    • {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4">
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-2">
              AI Reads Your Store As
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              {data.aiPerception}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Biggest Gaps
          </p>
          <div className="space-y-3">
            {data.gaps.map((gap, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-gray-800/40 rounded-xl p-3"
              >
                <Badge variant={severityVariant[gap.severity]} className="mt-0.5 shrink-0">
                  {gap.severity}
                </Badge>
                <div>
                  <p className="text-sm text-gray-200 font-medium">
                    &quot;{gap.claim}&quot;
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Reality: {gap.reality}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
