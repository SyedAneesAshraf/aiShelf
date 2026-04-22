/**
 * POST /api/audit
 * Module 3 — Run the full AI Readiness Audit via Claude.
 *
 * Body: { storeData?: Record<string, unknown> }
 * Response: StoreAudit
 */

import { NextRequest, NextResponse } from "next/server";
import { MOCK_STORE_AUDIT } from "@/lib/mock-data";
import { runStoreAudit } from "@/lib/claude";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { storeData } = body as { storeData?: Record<string, unknown> };

    // Attempt live Claude call; fall back to mock if not configured
    if (storeData && process.env.ANTHROPIC_API_KEY) {
      const result = await runStoreAudit(storeData);
      if (result) return NextResponse.json(result);
    }

    // ── MOCK ──────────────────────────────────────────────────────────────────
    return NextResponse.json(MOCK_STORE_AUDIT);
  } catch (err) {
    console.error("[/api/audit]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** GET convenience endpoint for the dashboard */
export async function GET() {
  return NextResponse.json(MOCK_STORE_AUDIT);
}
