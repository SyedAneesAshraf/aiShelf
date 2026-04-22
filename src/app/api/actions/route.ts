import { NextRequest, NextResponse } from "next/server";
import { MOCK_ACTION_ITEMS } from "@/lib/mock-data";

// GET /api/actions — return ranked action items for the connected store
export async function GET() {
  // TODO: fetch from DB based on connected store, compute from latest audit + search run
  const sorted = [...MOCK_ACTION_ITEMS].sort(
    (a, b) => b.queriesLost - a.queriesLost
  );
  return NextResponse.json({ actionItems: sorted });
}

// POST /api/actions — regenerate action plan from latest audit + search run
export async function POST(req: NextRequest) {
  try {
    // TODO:
    // 1. Fetch latest StoreAudit and QueryResults from DB
    // 2. Call clusterLostReasons() via Claude to recompute clusters
    // 3. Map clusters to ActionItems ranked by queriesLost × fixability
    // 4. Persist and return

    const sorted = [...MOCK_ACTION_ITEMS].sort(
      (a, b) => b.queriesLost - a.queriesLost
    );
    return NextResponse.json({ actionItems: sorted });
  } catch (err) {
    console.error("[/api/actions] error:", err);
    return NextResponse.json(
      { error: "Failed to generate action plan" },
      { status: 500 }
    );
  }
}
