import { NextRequest, NextResponse } from "next/server";
import { MOCK_REWRITES } from "@/lib/mock-data";
import { generateRewrite } from "@/lib/claude";

// POST /api/rewrites
// Body: { productId, title, originalDescription, context? }
// Returns: ProductRewrite
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, title, originalDescription, context } = body;

    if (!productId || !title || !originalDescription) {
      return NextResponse.json(
        { error: "productId, title, and originalDescription are required" },
        { status: 400 }
      );
    }

    // Attempt Claude rewrite
    const result = await generateRewrite({
      id: productId,
      title,
      description: originalDescription,
      category: context?.category ?? "general",
    });

    if (result) {
      return NextResponse.json(result);
    }

    // Fall back: return mock rewrite for this product if it exists
    const mockRewrite = MOCK_REWRITES.find((r) => r.productId === productId);
    if (mockRewrite) {
      return NextResponse.json(mockRewrite);
    }

    // Stub fallback
    return NextResponse.json({
      productId,
      title,
      originalDescription,
      optimizedDescription: originalDescription,
      whyItWins: "Rewrite generation requires an active Anthropic API key.",
    });
  } catch (err) {
    console.error("[/api/rewrites] error:", err);
    return NextResponse.json(
      { error: "Failed to generate rewrite" },
      { status: 500 }
    );
  }
}

// GET /api/rewrites — return all cached rewrites
export async function GET() {
  // TODO: fetch from DB for connected store
  return NextResponse.json(MOCK_REWRITES);
}
