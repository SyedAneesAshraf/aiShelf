import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CrawlerAuditResult } from "@/lib/types";

interface CrawlerAuditCardProps {
  data: CrawlerAuditResult;
}

const BOT_LABELS: Record<string, string> = {
  "OAI-SearchBot": "ChatGPT",
  GPTBot: "GPT Crawler",
  PerplexityBot: "Perplexity",
  GoogleBot: "Google",
  BingBot: "Bing",
  ClaudeBot: "Claude",
};

export function CrawlerAuditCard({ data }: CrawlerAuditCardProps) {
  const blockedBots = data.bots.filter((b) => b.status === "blocked");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AI Crawler Access</CardTitle>
          {data.hasCriticalBlock ? (
            <Badge variant="error">🚨 Critical Block</Badge>
          ) : (
            <Badge variant="success">✓ All Clear</Badge>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          robots.txt — {data.robotsTxtUrl}
        </p>
      </CardHeader>
      <CardContent>
        {data.hasCriticalBlock && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-400">
            <strong>P0 Issue:</strong> {blockedBots.length} AI bot(s) are
            blocked. This prevents web-crawling AI agents from indexing your
            store entirely.
          </div>
        )}
        <div className="space-y-2">
          {data.bots.map((bot) => (
            <div
              key={bot.name}
              className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
            >
              <div>
                <span className="text-sm text-gray-200">{bot.name}</span>
                <span className="text-xs text-gray-600 ml-2">
                  ({BOT_LABELS[bot.name] ?? bot.name})
                </span>
              </div>
              {bot.status === "allowed" ? (
                <Badge variant="success">✅ Allowed</Badge>
              ) : (
                <Badge variant="error">❌ Blocked</Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
