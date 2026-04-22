import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number; // 0-100
  max?: number;
  className?: string;
  color?: "brand" | "emerald" | "amber" | "red";
}

const colorClasses = {
  brand: "bg-brand-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

function scoreColor(value: number): "emerald" | "amber" | "red" {
  if (value >= 70) return "emerald";
  if (value >= 40) return "amber";
  return "red";
}

export function Progress({
  value,
  max = 100,
  className,
  color,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const resolvedColor = color ?? scoreColor(value);

  return (
    <div
      className={cn("h-2 bg-gray-800 rounded-full overflow-hidden", className)}
    >
      <div
        className={cn("h-full rounded-full transition-all", colorClasses[resolvedColor])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
