"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConnectPage() {
  const router = useRouter();
  const [storeDomain, setStoreDomain] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storeDomain, accessToken }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Connection failed");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Hero */}
      <div className="mb-12 text-center max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 rounded-full px-4 py-1.5 text-brand-400 text-sm font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          AI Shopping Agent Visibility Tool
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
          Your products exist.
          <br />
          <span className="text-brand-400">AI agents aren&apos;t recommending them.</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          AI Shelf shows Shopify merchants exactly where their products are
          invisible to AI shopping agents, why they&apos;re losing
          recommendations, and precisely what to fix.
        </p>
      </div>

      {/* Connect Card */}
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-white mb-1">
          Connect your Shopify store
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          We&apos;ll run a full AI visibility analysis in under 2 minutes.
        </p>

        <form onSubmit={handleConnect} className="space-y-4">
          <div>
            <label
              htmlFor="storeDomain"
              className="block text-sm font-medium text-gray-300 mb-1.5"
            >
              Store domain
            </label>
            <input
              id="storeDomain"
              type="text"
              placeholder="your-store.myshopify.com"
              value={storeDomain}
              onChange={(e) => setStoreDomain(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="accessToken"
              className="block text-sm font-medium text-gray-300 mb-1.5"
            >
              Admin API access token
            </label>
            <input
              id="accessToken"
              type="password"
              placeholder="shpat_••••••••••••••••"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
              required
            />
            <p className="text-xs text-gray-600 mt-1.5">
              Read-only access. We never write to your store.
            </p>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-4 py-3 transition-colors text-sm"
          >
            {loading ? "Connecting…" : "Run AI Visibility Analysis →"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-800 flex items-center justify-center gap-1">
          <span className="text-xs text-gray-600">Want to try the demo?</span>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-xs text-brand-400 hover:text-brand-300 font-medium"
          >
            Use mock data →
          </button>
        </div>
      </div>

      {/* Feature pills */}
      <div className="mt-10 flex flex-wrap gap-3 justify-center max-w-xl">
        {[
          "AI Crawler Access Audit",
          "Catalog Sync Health",
          "Real Search Surfacing",
          "AI Re-ranking Analysis",
          "Perception Gap Report",
          "Auto-Generated Rewrites",
        ].map((f) => (
          <span
            key={f}
            className="text-xs text-gray-500 bg-gray-900 border border-gray-800 rounded-full px-3 py-1"
          >
            {f}
          </span>
        ))}
      </div>
    </main>
  );
}
