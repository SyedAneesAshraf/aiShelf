import { Badge } from "@/components/ui/badge";
import type { QueryBreakdownRow } from "@/lib/types";

interface QueryBreakdownTableProps {
  rows: QueryBreakdownRow[];
}

function Check({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="text-emerald-400">✅</span>
  ) : (
    <span className="text-gray-700">—</span>
  );
}

export function QueryBreakdownTable({ rows }: QueryBreakdownTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-gray-800">
            <th className="pb-3 text-xs font-semibold text-gray-500 pr-4">
              Query
            </th>
            <th className="pb-3 text-xs font-semibold text-gray-500 text-center">
              Appeared
            </th>
            <th className="pb-3 text-xs font-semibold text-gray-500 text-center">
              Shortlisted
            </th>
            <th className="pb-3 text-xs font-semibold text-gray-500 text-center">
              Recommended
            </th>
            <th className="pb-3 text-xs font-semibold text-gray-500">
              Lost Because
            </th>
            <th className="pb-3 text-xs font-semibold text-gray-500">
              Confidence
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-800/60 hover:bg-gray-800/30 transition-colors"
            >
              <td className="py-3 pr-4 text-gray-300 font-medium max-w-48">
                &ldquo;{row.query}&rdquo;
              </td>
              <td className="py-3 text-center">
                <Check ok={row.appeared} />
              </td>
              <td className="py-3 text-center">
                <Check ok={row.shortlisted} />
              </td>
              <td className="py-3 text-center">
                {row.recommended ? (
                  <span className="text-emerald-400 font-semibold text-xs">
                    Won ✓
                  </span>
                ) : (
                  <span className="text-gray-700">—</span>
                )}
              </td>
              <td className="py-3 pr-4 text-gray-500 text-xs max-w-40">
                {row.lostBecause ?? (
                  <span className="text-emerald-500 text-xs">—</span>
                )}
              </td>
              <td className="py-3">
                {row.confidence ? (
                  <Badge
                    variant={
                      row.confidence === "high"
                        ? "error"
                        : row.confidence === "medium"
                        ? "warning"
                        : "neutral"
                    }
                  >
                    {row.confidence}
                  </Badge>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
