/**
 * GET /api/health/inventory
 * Module 2c — Detect inventory and pricing consistency issues.
 *
 * Response: InventoryIssue[]
 */

import { NextResponse } from "next/server";
import { MOCK_INVENTORY_ISSUES } from "@/lib/mock-data";

export async function GET() {
  // TODO: Fetch all products from Admin API
  // TODO: For each product & variant:
  //   - Flag zero-inventory active products
  //   - Flag variants with price === "0.00" or null
  //   - Flag compare_at_price < price (illogical discount signal)

  // ── MOCK ──────────────────────────────────────────────────────────────────
  return NextResponse.json(MOCK_INVENTORY_ISSUES);
}
