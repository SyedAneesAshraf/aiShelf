import { Badge } from "@/components/ui/badge";
import type { LostReasonCluster, WinningPattern } from "@/lib/types";

interface LostReasonClustersProps {
  clusters: LostReasonCluster[];
  winningPatterns: WinningPattern[];
}

export function LostReasonClusters({
  clusters,
  winningPatterns,
}: LostReasonClustersProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-3">
          Why You&apos;re Losing
        </h3>
        <div className="space-y-2">
          {clusters.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-gray-800/50 rounded-xl px-4 py-3"
            >
              <span className="text-sm font-bold text-gray-600 w-5 shrink-0">
                #{i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-200">{c.reason}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="error" className="text-[10px]">
                  {c.queriesLost} lost
                </Badge>
                <Badge
                  variant={
                    c.confidence === "high"
                      ? "error"
                      : c.confidence === "medium"
                      ? "warning"
                      : "neutral"
                  }
                  className="text-[10px]"
                >
                  {c.confidence}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-3">
          Where You&apos;re Winning
        </h3>
        <div className="space-y-2">
          {winningPatterns.map((w, i) => (
            <div
              key={i}
              className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-4 py-3"
            >
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">✅</span>
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    {w.pattern}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {w.explanation}
                  </p>
                  <p className="text-xs text-emerald-600 mt-1">
                    Opportunity: {w.opportunity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
