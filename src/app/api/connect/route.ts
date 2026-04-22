/**
 * POST /api/connect
 * Module 1 — Connect a Shopify store and ingest all catalog data.
 *
 * Body: { storeDomain: string; accessToken: string }
 * Response: StoreConnection
 */

import { NextRequest, NextResponse } from "next/server";
import { MOCK_STORE } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { storeDomain, accessToken } = body as { storeDomain?: string; accessToken?: string };

    if (!storeDomain || !accessToken) {
      return NextResponse.json(
        { error: "storeDomain and accessToken are required" },
        { status: 400 }
      );
    }

    // TODO: Validate the access token by calling GET /admin/api/shop.json
    // TODO: Ingest products, collections, policies, metafields via Admin API
    // TODO: Persist connection in database

    // ── MOCK RESPONSE ────────────────────────────────────────────────────────
    return NextResponse.json({
      ...MOCK_STORE,
      storeDomain,
      connectedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[/api/connect]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
