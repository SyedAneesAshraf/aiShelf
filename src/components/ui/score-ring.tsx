interface ScoreRingProps {
  score: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
}

function scoreColor(score: number) {
  if (score >= 70) return "#34d399"; // emerald-400
  if (score >= 40) return "#fbbf24"; // amber-400
  return "#f87171"; // red-400
}

export function ScoreRing({
  score,
  size = 80,
  strokeWidth = 7,
  label,
}: ScoreRingProps) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = scoreColor(score);

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#1f2937"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      {/* Overlay score text */}
      <div className="relative" style={{ marginTop: -(size + 4) / 2 - 4 }}>
        <span
          className="font-bold tabular-nums"
          style={{ fontSize: size * 0.22, color }}
        >
          {score}
        </span>
      </div>
      {label && (
        <span className="text-xs text-gray-500 text-center mt-1">{label}</span>
      )}
    </div>
  );
}
