import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreRing } from "@/components/ui/score-ring";

interface ScoreOverviewProps {
  aiReadinessScore: number;
  catalogSyncScore: number;
  searchAppearanceRate: number;
  aiWinRate: number;
  hasCriticalBlock: boolean;
}

export function ScoreOverview({
  aiReadinessScore,
  catalogSyncScore,
  searchAppearanceRate,
  aiWinRate,
  hasCriticalBlock,
}: ScoreOverviewProps) {
  return (
    <div className="space-y-4">
      {hasCriticalBlock && (
        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-2xl px-5 py-4">
          <span className="text-xl">🚨</span>
          <div>
            <p className="text-sm font-semibold text-red-400">
              P0 — AI Crawler Blocked
            </p>
            <p className="text-xs text-red-400/70 mt-0.5">
              One or more AI bots are blocked in your robots.txt. Fix this
              before anything else. Go to{" "}
              <a
                href="/dashboard/health"
                className="underline hover:text-red-300"
              >
                Technical Health
              </a>{" "}
              for details.
            </p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Overall Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="flex flex-col items-center gap-2">
              <ScoreRing score={aiReadinessScore} size={72} label="AI Readiness" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <ScoreRing score={catalogSyncScore} size={72} label="Catalog Sync" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <ScoreRing score={searchAppearanceRate} size={72} label="Search Appearance" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <ScoreRing score={aiWinRate} size={72} label="AI Win Rate" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
