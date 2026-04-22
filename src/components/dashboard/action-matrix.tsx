import { Badge } from "@/components/ui/badge";
import type { ActionItem } from "@/lib/types";

interface ActionMatrixProps {
  items: ActionItem[];
}

type Quadrant = "high-low" | "high-high" | "low-low" | "low-high";

function classify(item: ActionItem): Quadrant {
  const highImpact = item.impact === "high";
  const lowEffort = item.effort === "low";
  if (highImpact && lowEffort) return "high-low";
  if (highImpact && !lowEffort) return "high-high";
  if (!highImpact && lowEffort) return "low-low";
  return "low-high";
}

const quadrantMeta: Record<
  Quadrant,
  { label: string; desc: string; border: string }
> = {
  "high-low": {
    label: "High Impact · Low Effort",
    desc: "Do these first",
    border: "border-emerald-500/30",
  },
  "high-high": {
    label: "High Impact · High Effort",
    desc: "Schedule these",
    border: "border-amber-500/30",
  },
  "low-low": {
    label: "Low Impact · Low Effort",
    desc: "Do when convenient",
    border: "border-gray-700",
  },
  "low-high": {
    label: "Low Impact · High Effort",
    desc: "Do later or skip",
    border: "border-gray-800",
  },
};

export function ActionMatrix({ items }: ActionMatrixProps) {
  const grouped: Record<Quadrant, ActionItem[]> = {
    "high-low": [],
    "high-high": [],
    "low-low": [],
    "low-high": [],
  };
  for (const item of items) {
    grouped[classify(item)].push(item);
  }

  const order: Quadrant[] = ["high-low", "high-high", "low-low", "low-high"];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {order.map((q) => {
        const meta = quadrantMeta[q];
        const qItems = grouped[q];
        return (
          <div
            key={q}
            className={`border ${meta.border} rounded-2xl p-5 bg-gray-900/50`}
          >
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-200">
                {meta.label}
              </p>
              <p className="text-xs text-gray-600">{meta.desc}</p>
            </div>
            {qItems.length === 0 ? (
              <p className="text-xs text-gray-700 italic">None</p>
            ) : (
              <div className="space-y-2">
                {qItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-800/60 rounded-xl p-3 group"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-brand-400 mt-0.5">✦</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-200">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="error" className="text-[10px]">
                            {item.queriesLost} queries lost
                          </Badge>
                          {item.hasRewrite && (
                            <Badge variant="info" className="text-[10px]">
                              rewrite ready
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
