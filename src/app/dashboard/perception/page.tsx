import { Header } from "@/components/layout/header";
import { PerceptionGapCard } from "@/components/dashboard/perception-gap-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_PERCEPTION_GAP } from "@/lib/mock-data";

export default function PerceptionPage() {
  return (
    <div className="space-y-6">
      <Header
        title="Perception Gap"
        description="How AI agents actually read your store vs. how you describe your brand"
        action={{ label: "Re-analyze" }}
      />

      <PerceptionGapCard data={MOCK_PERCEPTION_GAP} />

      {/* Onboarding intent form (stub) */}
      <Card>
        <CardHeader>
          <CardTitle>Update Your Brand Intent</CardTitle>
          <p className="text-xs text-gray-500 mt-1">
            Tell us how you want AI agents to describe your brand
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                How do you want AI agents to describe your brand?
              </label>
              <textarea
                rows={3}
                defaultValue={
                  MOCK_PERCEPTION_GAP.merchantIntent.brandDescription
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Top 3 differentiators (comma-separated)
              </label>
              <input
                type="text"
                defaultValue={MOCK_PERCEPTION_GAP.merchantIntent.topDifferentiators.join(
                  ", "
                )}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Primary target customer
              </label>
              <input
                type="text"
                defaultValue={
                  MOCK_PERCEPTION_GAP.merchantIntent.primaryTargetCustomer
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <button
              disabled
              className="px-4 py-2 bg-brand-500/50 text-brand-300 rounded-lg text-sm font-semibold cursor-not-allowed"
            >
              Re-run Perception Analysis (coming soon)
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
