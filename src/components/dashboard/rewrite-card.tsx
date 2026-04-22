"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ProductRewrite } from "@/lib/types";

interface RewriteCardProps {
  rewrite: ProductRewrite;
}

export function RewriteCard({ rewrite }: RewriteCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(rewrite.optimizedDescription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{rewrite.productTitle}</CardTitle>
          <Button size="sm" onClick={handleCopy}>
            {copied ? "Copied ✓" : "Copy optimized"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-2">
              Before
            </p>
            <div className="bg-gray-800/40 rounded-xl p-4 text-sm text-gray-400 leading-relaxed border border-red-500/10">
              {rewrite.originalDescription}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-2">
              AI-Optimized
            </p>
            <div className="bg-gray-800/40 rounded-xl p-4 text-sm text-gray-200 leading-relaxed border border-emerald-500/20">
              {rewrite.optimizedDescription}
            </div>
          </div>
        </div>
        <div className="mt-4 bg-brand-500/5 border border-brand-500/20 rounded-xl p-4">
          <p className="text-xs font-semibold text-brand-400 mb-1">
            Why this version wins more AI recommendations
          </p>
          <p className="text-sm text-gray-400">{rewrite.whyItWins}</p>
        </div>
      </CardContent>
    </Card>
  );
}
