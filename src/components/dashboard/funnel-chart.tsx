import type { FunnelMetrics } from "@/lib/types";

interface FunnelChartProps {
  metrics: FunnelMetrics;
}

interface FunnelStage {
  label: string;
  sublabel: string;
  count: number;
  rate: number;
  color: string;
  bg: string;
}

export function FunnelChart({ metrics }: FunnelChartProps) {
  const stages: FunnelStage[] = [
    {
      label: "Queries Run",
      sublabel: "total queries tested",
      count: metrics.queriesRun,
      rate: 100,
      color: "text-gray-200",
      bg: "bg-gray-700",
    },
    {
      label: "Search Appearance",
      sublabel: "surfaced in results",
      count: metrics.searchAppearanceCount,
      rate: metrics.searchAppearanceRate,
      color: "text-brand-400",
      bg: "bg-brand-500",
    },
    {
      label: "AI Shortlist",
      sublabel: "shortlisted by AI",
      count: metrics.aiShortlistCount,
      rate: metrics.aiShortlistRate,
      color: "text-sky-400",
      bg: "bg-sky-500",
    },
    {
      label: "AI Recommendation",
      sublabel: "won recommendation",
      count: metrics.aiRecommendationCount,
      rate: metrics.aiRecommendationRate,
      color: "text-emerald-400",
      bg: "bg-emerald-500",
    },
  ];

  return (
    <div className="space-y-3">
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex items-center gap-4">
          <div className="w-36 shrink-0">
            <p className={`text-sm font-semibold ${stage.color}`}>
              {stage.label}
            </p>
            <p className="text-xs text-gray-600">{stage.sublabel}</p>
          </div>
          <div className="flex-1 bg-gray-800 rounded-full h-7 relative overflow-hidden">
            <div
              className={`h-full ${stage.bg} opacity-80 rounded-full transition-all duration-700`}
              style={{ width: `${stage.rate}%` }}
            />
            <div className="absolute inset-0 flex items-center px-3 justify-between">
              <span className="text-xs font-bold text-white">
                {stage.count}
              </span>
              <span className="text-xs font-bold text-white">
                {stage.rate}%
              </span>
            </div>
          </div>
          {i < stages.length - 1 && (
            <div className="w-4 text-gray-700 text-center text-xs">▼</div>
          )}
        </div>
      ))}

      <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
        <p className="text-sm text-gray-400">Overall AI Conversion Rate</p>
        <span className="text-2xl font-bold text-white">
          {metrics.overallAIConversionRate}%
        </span>
      </div>
    </div>
  );
}
