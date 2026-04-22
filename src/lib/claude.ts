/**
 * Claude (Anthropic) AI client.
 * All functions are stubs with documented prompts — wire up SDK in production.
 */

import type { StoreAudit, PerceptionGapAnalysis, ProductRewrite, MerchantIntent, QueryResult } from "./types";

// ---------------------------------------------------------------------------
// NOTE: In production, initialise the Anthropic client here:
//   import Anthropic from "@anthropic-ai/sdk";
//   const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
// ---------------------------------------------------------------------------

const MODEL = "claude-opus-4-5";

/**
 * Module 3 — Run the full AI Readiness Audit against store data.
 * Stub: returns null so callers fall back to mock data.
 */
export async function runStoreAudit(
  _storeData: Record<string, unknown>
): Promise<StoreAudit | null> {
  // TODO: Build a structured prompt from storeData and call Claude.
  // The prompt should instruct Claude to score:
  //   - Product Data Completeness (0-100)
  //   - Policy Clarity (0-100)
  //   - Trust Signal Strength (0-100)
  //   - FAQ Coverage — attempt to answer 15 standard pre-purchase questions
  //   - Structured Data Quality (0-100)
  // Return scores as JSON matching the StoreAudit type.
  console.warn("[claude] runStoreAudit: stub — returning null");
  return null;
}

/**
 * Module 4c — Claude acts as an AI shopping agent, re-ranking Storefront results.
 * For each query, evaluate which surfaced products should be shortlisted / recommended.
 */
export async function rerankSearchResults(
  _query: string,
  _surfacedProducts: { id: string; title: string; tags: string[]; price: string }[]
): Promise<QueryResult | null> {
  // TODO: Prompt template:
  //
  // "You are an AI shopping agent helping a customer. The customer's query is:
  //  '<query>'
  //
  //  The following products were returned by the store's search engine:
  //  <products as JSON>
  //
  //  For each product, decide:
  //  1. Should it be shortlisted? (Does it match the customer's intent?)
  //  2. If shortlisted, should it be recommended? (Is there enough trust/data?)
  //  3. If not shortlisted or not recommended, what is the most likely reason?
  //     Indicate your confidence: high | medium | low.
  //
  //  Respond as a JSON array matching the SurfacedProduct[] type."
  console.warn("[claude] rerankSearchResults: stub — returning null");
  return null;
}

/**
 * Module 6 — Compare merchant intent vs what Claude reads from the store.
 */
export async function analyzePerceptionGap(
  _merchantIntent: MerchantIntent,
  _storeData: Record<string, unknown>
): Promise<PerceptionGapAnalysis | null> {
  // TODO: Prompt template:
  //
  // "You are an AI shopping agent reading an e-commerce store for the first time.
  //  Your task is to produce a neutral, factual summary of exactly what you can
  //  infer from the store's structured data — no assumptions, no marketing copy.
  //
  //  Then compare your perception to this merchant's stated intent:
  //  <merchantIntent as JSON>
  //
  //  Produce a JSON object matching the PerceptionGapAnalysis type, including:
  //  - aiPerception: what you (the AI) would say about this store
  //  - alignmentScore: 0-100 match between intent and data reality
  //  - gaps: specific mismatches with severity (critical | moderate | minor)"
  console.warn("[claude] analyzePerceptionGap: stub — returning null");
  return null;
}

/**
 * Module 8 — Generate an AI-optimised product description.
 */
export async function generateRewrite(
  _product: { id: string; title: string; description: string; category: string }
): Promise<ProductRewrite | null> {
  // TODO: Prompt template:
  //
  // "You are optimising a product description for AI shopping agents.
  //  The goal is to make the description explicitly answerable to the most
  //  common pre-purchase queries for this product category (<category>).
  //
  //  Original description: '<description>'
  //
  //  Rewrite the description to:
  //  1. Specify who it is for (skin type / use case)
  //  2. List key ingredients or materials
  //  3. Include size / variant information
  //  4. Mention return policy window
  //  5. State any relevant certifications / testing
  //
  //  Also write a 1–2 sentence explanation of why this rewrite wins more
  //  AI recommendations. Return JSON matching the ProductRewrite type."
  console.warn("[claude] generateRewrite: stub — returning null");
  return null;
}

/**
 * Module 7 — Aggregate lost-reason clusters across all query results.
 */
export async function clusterLostReasons(
  _queryResults: QueryResult[]
): Promise<{ reason: string; queriesLost: number; confidence: "high" | "medium" | "low" }[] | null> {
  // TODO: Send all "lostReason" strings to Claude and ask it to:
  //   1. Group semantically similar reasons
  //   2. Count queries affected per group
  //   3. Assign overall confidence per cluster
  console.warn("[claude] clusterLostReasons: stub — returning null");
  return null;
}
