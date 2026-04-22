import { NextRequest, NextResponse } from "next/server";
import { MOCK_PERCEPTION_GAP } from "@/lib/mock-data";
import { analyzePerceptionGap } from "@/lib/claude";
import type { MerchantIntent } from "@/lib/types";

// POST /api/perception
// Body: { storeData?, merchantIntent }
// Returns: PerceptionGapAnalysis
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const merchantIntent: MerchantIntent = body.merchantIntent ?? {
      brandDescription: "",
      topDifferentiators: [],
      primaryTargetCustomer: "",
    };

    // TODO: fetch real store data from DB using storeDomain from session/cookie
    const storeData = body.storeData ?? null;

    // Attempt Claude analysis
    const result = await analyzePerceptionGap(merchantIntent, storeData ?? {});

    if (result) {
      return NextResponse.json(result);
    }

    // Fall back to mock
    return NextResponse.json(MOCK_PERCEPTION_GAP);
  } catch (err) {
    console.error("[/api/perception] error:", err);
    return NextResponse.json(
      { error: "Failed to run perception analysis" },
      { status: 500 }
    );
  }
}

// GET /api/perception — return last cached result
export async function GET() {
  // TODO: fetch from DB for connected store
  return NextResponse.json(MOCK_PERCEPTION_GAP);
}
