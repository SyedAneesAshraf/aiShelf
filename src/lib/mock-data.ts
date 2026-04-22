import type {
  StoreConnection,
  CrawlerAuditResult,
  CatalogSyncProduct,
  InventoryIssue,
  StoreAudit,
  QueryResult,
  FunnelMetrics,
  QueryBreakdownRow,
  LostReasonCluster,
  WinningPattern,
  PerceptionGapAnalysis,
  ActionItem,
  ProductRewrite,
} from "./types";

// ─── Store Connection ─────────────────────────────────────────────────────────

export const MOCK_STORE: StoreConnection = {
  storeDomain: "glow-labs.myshopify.com",
  storeName: "Glow Labs",
  connectedAt: new Date().toISOString(),
  productCount: 12,
  collectionCount: 4,
};

// ─── Module 2a — Crawler Audit ────────────────────────────────────────────────

export const MOCK_CRAWLER_AUDIT: CrawlerAuditResult = {
  robotsTxtFound: true,
  robotsTxtUrl: "https://glow-labs.myshopify.com/robots.txt",
  hasCriticalBlock: true,
  bots: [
    { name: "OAI-SearchBot",  userAgent: "OAI-SearchBot",  status: "blocked",  note: "Blocked via Disallow: /" },
    { name: "GPTBot",         userAgent: "GPTBot",          status: "blocked",  note: "Blocked via Disallow: /" },
    { name: "PerplexityBot",  userAgent: "PerplexityBot",   status: "allowed" },
    { name: "GoogleBot",      userAgent: "Googlebot",       status: "allowed" },
    { name: "BingBot",        userAgent: "bingbot",         status: "allowed" },
    { name: "ClaudeBot",      userAgent: "ClaudeBot",       status: "unknown", note: "Not mentioned in robots.txt" },
  ],
};

// ─── Module 2b — Catalog Sync ─────────────────────────────────────────────────

export const MOCK_CATALOG_SYNC: CatalogSyncProduct[] = [
  {
    id: "prod_001",
    title: "Hydra Glow Moisturizer",
    sptCategory: null,
    sptAssigned: false,
    variantStructure: "correct",
    pricingConsistent: true,
    inventoryTracked: true,
    catalogSyncScore: 31,
    mandatoryMetafields: [
      { key: "skin_type",    present: false },
      { key: "ingredients",  present: false },
      { key: "volume_ml",    present: true, value: "50ml" },
      { key: "spf",          present: false },
    ],
  },
  {
    id: "prod_002",
    title: "Vitamin C Brightening Serum",
    sptCategory: "Health & Beauty > Skin Care > Serums",
    sptAssigned: true,
    variantStructure: "correct",
    pricingConsistent: true,
    inventoryTracked: true,
    catalogSyncScore: 82,
    mandatoryMetafields: [
      { key: "skin_type",    present: true, value: "All skin types" },
      { key: "ingredients",  present: true, value: "Vitamin C 15%, Niacinamide 5%" },
      { key: "volume_ml",    present: true, value: "30ml" },
      { key: "spf",          present: false },
    ],
  },
  {
    id: "prod_003",
    title: "Foam Cleanser — Sensitive Skin",
    sptCategory: null,
    sptAssigned: false,
    variantStructure: "incorrect",
    pricingConsistent: false,
    inventoryTracked: true,
    catalogSyncScore: 18,
    mandatoryMetafields: [
      { key: "skin_type",    present: false },
      { key: "ingredients",  present: false },
      { key: "volume_ml",    present: false },
    ],
  },
  {
    id: "prod_004",
    title: "Daily SPF 50 Sunscreen",
    sptCategory: "Health & Beauty > Skin Care > Sunscreen",
    sptAssigned: true,
    variantStructure: "correct",
    pricingConsistent: true,
    inventoryTracked: false,
    catalogSyncScore: 65,
    mandatoryMetafields: [
      { key: "skin_type",    present: true, value: "Oily, Combination" },
      { key: "ingredients",  present: true, value: "Zinc Oxide, Titanium Dioxide" },
      { key: "spf",          present: true, value: "50" },
    ],
  },
];

// ─── Module 2c — Inventory Issues ─────────────────────────────────────────────

export const MOCK_INVENTORY_ISSUES: InventoryIssue[] = [
  {
    productId: "prod_004",
    productTitle: "Daily SPF 50 Sunscreen",
    issue: "zero_inventory",
    detail: "Active product showing 0 units. AI agents will not recommend out-of-stock products.",
  },
  {
    productId: "prod_003",
    productTitle: "Foam Cleanser — Sensitive Skin",
    issue: "price_inconsistency",
    detail: "Variant '100ml' has price ₹0. This signals a broken listing to AI ranking systems.",
  },
];

// ─── Module 3 — Store Audit ───────────────────────────────────────────────────

export const MOCK_STORE_AUDIT: StoreAudit = {
  overallAIReadiness: 58,
  dataCompleteness: 52,
  policyClarity: 60,
  trustSignals: 44,
  faqCoverage: 67,
  structuredDataQuality: 55,
  faqItems: [
    { question: "Is this suitable for sensitive skin?",    status: "partial",      reason: "Mentioned for 3/12 products only" },
    { question: "What's the return process?",              status: "answerable" },
    { question: "How long will delivery take?",            status: "unanswerable", reason: "Policy says 'ships soon' with no specific timeline" },
    { question: "Does this come in other sizes?",          status: "answerable" },
    { question: "What are the ingredients?",               status: "partial",      reason: "Present on 4/12 products" },
    { question: "Is this dermatologist tested?",           status: "unanswerable", reason: "Claim made on homepage but not in product data" },
    { question: "Can I get a refund?",                     status: "answerable" },
    { question: "What size should I order?",               status: "unanswerable", reason: "No size guide found" },
    { question: "Is it cruelty-free?",                     status: "unanswerable", reason: "Not mentioned anywhere in store data" },
    { question: "Are there any certifications?",           status: "unanswerable", reason: "No third-party certification data found" },
    { question: "How do I apply this product?",            status: "partial",      reason: "Usage instructions on 2/12 products" },
    { question: "Do you offer international shipping?",    status: "unanswerable", reason: "Policy page does not mention international" },
    { question: "Is this suitable for acne-prone skin?",   status: "unanswerable", reason: "Skin type data missing on most products" },
    { question: "How long does a bottle last?",            status: "unanswerable", reason: "No usage frequency or longevity mentioned" },
    { question: "Do you have a loyalty or rewards program?", status: "unanswerable", reason: "Not found anywhere in store content" },
  ],
  productScores: [
    { productId: "prod_001", productTitle: "Hydra Glow Moisturizer",       dataCompleteness: 35, policyClarity: 60, trustSignals: 30, faqCoverage: 47, structuredDataQuality: 20, overallAIReadiness: 38 },
    { productId: "prod_002", productTitle: "Vitamin C Brightening Serum",  dataCompleteness: 85, policyClarity: 60, trustSignals: 78, faqCoverage: 80, structuredDataQuality: 80, overallAIReadiness: 79 },
    { productId: "prod_003", productTitle: "Foam Cleanser — Sensitive Skin", dataCompleteness: 20, policyClarity: 60, trustSignals: 15, faqCoverage: 33, structuredDataQuality: 10, overallAIReadiness: 24 },
    { productId: "prod_004", productTitle: "Daily SPF 50 Sunscreen",       dataCompleteness: 70, policyClarity: 60, trustSignals: 55, faqCoverage: 60, structuredDataQuality: 65, overallAIReadiness: 63 },
  ],
};

// ─── Module 4 — Search Results ────────────────────────────────────────────────

export const MOCK_QUERY_RESULTS: QueryResult[] = [
  {
    query: "moisturizer for oily skin under ₹500",
    category: "skincare",
    totalSurfaced: 3,
    surfacedProducts: [
      { productId: "prod_001", productTitle: "Hydra Glow Moisturizer",      position: 1, shortlisted: true,  recommended: false, lostReason: "No oily skin mention, no ingredient list", confidence: "high" },
      { productId: "prod_002", productTitle: "Vitamin C Brightening Serum", position: 2, shortlisted: false, recommended: false, lostReason: "Serum not a moisturizer — category mismatch", confidence: "high" },
      { productId: "prod_004", productTitle: "Daily SPF 50 Sunscreen",      position: 3, shortlisted: false, recommended: false, lostReason: "Zero inventory", confidence: "high" },
    ],
  },
  {
    query: "fragrance free cleanser for sensitive skin",
    category: "skincare",
    totalSurfaced: 1,
    surfacedProducts: [
      { productId: "prod_003", productTitle: "Foam Cleanser — Sensitive Skin", position: 1, shortlisted: false, recommended: false, lostReason: "No ingredient list — fragrance-free claim unverifiable", confidence: "high" },
    ],
  },
  {
    query: "vitamin C serum for dark spots",
    category: "skincare",
    totalSurfaced: 2,
    surfacedProducts: [
      { productId: "prod_002", productTitle: "Vitamin C Brightening Serum", position: 1, shortlisted: true,  recommended: true },
      { productId: "prod_001", productTitle: "Hydra Glow Moisturizer",      position: 2, shortlisted: false, recommended: false, lostReason: "Not a serum — category mismatch", confidence: "high" },
    ],
  },
  {
    query: "skincare gift set",
    category: "skincare",
    totalSurfaced: 0,
    surfacedProducts: [],
  },
  {
    query: "daily sunscreen SPF 50",
    category: "skincare",
    totalSurfaced: 1,
    surfacedProducts: [
      { productId: "prod_004", productTitle: "Daily SPF 50 Sunscreen", position: 1, shortlisted: true, recommended: false, lostReason: "Out of stock — AI agents deprioritize zero-inventory", confidence: "high" },
    ],
  },
];

// ─── Module 5 — Funnel Metrics ────────────────────────────────────────────────

export const MOCK_FUNNEL: FunnelMetrics = {
  queriesRun: 30,
  searchAppearanceCount: 22,
  searchAppearanceRate: 73,
  aiShortlistCount: 11,
  aiShortlistRate: 50,
  aiRecommendationCount: 5,
  aiRecommendationRate: 45,
  overallAIConversionRate: 17,
};

export const MOCK_QUERY_BREAKDOWN: QueryBreakdownRow[] = [
  { query: "moisturizer for oily skin",        appeared: true,  shortlisted: true,  recommended: false, lostBecause: "No skin type data, no ingredient list", confidence: "high" },
  { query: "fragrance free cleanser",          appeared: true,  shortlisted: false, recommended: false, lostBecause: "Ingredients missing — can't verify fragrance-free", confidence: "high" },
  { query: "skincare gift set",                appeared: false, shortlisted: false, recommended: false, lostBecause: "No gifting tags or collection", confidence: "medium" },
  { query: "vitamin C serum dark spots",       appeared: true,  shortlisted: true,  recommended: true },
  { query: "daily SPF 50 sunscreen",           appeared: true,  shortlisted: true,  recommended: false, lostBecause: "Zero inventory", confidence: "high" },
  { query: "gentle face wash acne prone skin", appeared: true,  shortlisted: false, recommended: false, lostBecause: "No acne-prone skin mention", confidence: "high" },
  { query: "hydrating serum without alcohol",  appeared: true,  shortlisted: true,  recommended: true },
  { query: "complete skincare routine beginners", appeared: false, shortlisted: false, recommended: false, lostBecause: "No starter kit / bundle product", confidence: "medium" },
  { query: "dermatologist tested moisturizer", appeared: true,  shortlisted: false, recommended: false, lostBecause: "Dermatologist claim not in product data", confidence: "high" },
  { query: "cruelty free skincare India",      appeared: false, shortlisted: false, recommended: false, lostBecause: "Cruelty-free not mentioned anywhere", confidence: "medium" },
];

export const MOCK_LOST_REASONS: LostReasonCluster[] = [
  { reason: "Ingredient transparency missing",     queriesLost: 9, confidence: "high" },
  { reason: "No gifting/occasion tags",            queriesLost: 6, confidence: "high" },
  { reason: "Review count too low (< 5 reviews)",  queriesLost: 5, confidence: "medium" },
  { reason: "Shipping timeline unclear",           queriesLost: 3, confidence: "medium" },
  { reason: "SPT category not assigned",           queriesLost: 2, confidence: "high" },
  { reason: "Out-of-stock active products",        queriesLost: 2, confidence: "high" },
];

export const MOCK_WINNING_PATTERNS: WinningPattern[] = [
  {
    pattern: "You consistently win price-sensitive queries",
    explanation: "Pricing data is clean, well-tagged, and consistent across variants.",
    opportunity: "Add more budget-friendly bundles to capture bundled-purchase queries.",
  },
  {
    pattern: "You win 'vitamin C / brightening' queries",
    explanation: "Vitamin C Serum has complete ingredient data and active reviews.",
    opportunity: "Apply the same description quality to your other 11 products.",
  },
];

// ─── Module 6 — Perception Gap ─────────────────────────────────────────────────

export const MOCK_PERCEPTION_GAP: PerceptionGapAnalysis = {
  merchantIntent: {
    brandDescription: "Premium clean skincare for sensitive skin, dermatologist-tested, ingredient-transparent",
    topDifferentiators: ["Dermatologist tested", "Ingredient transparency", "Suitable for sensitive skin"],
    primaryTargetCustomer: "Women 22–35 with sensitive or oily skin",
  },
  aiPerception:
    "Mid-range skincare brand. Ingredient information missing on 8 of 12 products. No dermatologist certification mentioned in product data. Return policy uses vague language ('reasonable time'). 4 products have zero or no reviews. Skin type targeting unclear on most listings. No cruelty-free or certification data found.",
  alignmentScore: 34,
  gaps: [
    { claim: '"Dermatologist-tested"',        reality: "This claim appears on the homepage but is absent from all product data — AI agents read product data, not marketing copy.", severity: "critical" },
    { claim: '"Ingredient-transparent"',      reality: "8 of 12 products have no ingredient list at all.", severity: "critical" },
    { claim: '"Sensitive skin" positioning',  reality: "Only 3 of 12 products mention sensitive skin in their descriptions or metafields.", severity: "moderate" },
    { claim: '"Premium" positioning',         reality: "No third-party certifications, reviews are sparse, and pricing data suggests mid-range without premium signals.", severity: "moderate" },
  ],
};

// ─── Module 7 — Action Plan ───────────────────────────────────────────────────

export const MOCK_ACTION_ITEMS: ActionItem[] = [
  { id: "a1", title: "Add ingredient lists to 8 products", description: "8 of 12 products have no ingredient data. This single gap is causing the most query losses.", queriesLost: 9, effort: "high", impact: "high", affectedProductIds: ["prod_001","prod_003"], hasRewrite: true },
  { id: "a2", title: "Assign SPT category to all products", description: "4 products have no Shopify Product Taxonomy category. This blocks Catalog API syndication to ChatGPT/Gemini integrations.", queriesLost: 2, effort: "low", impact: "high", affectedProductIds: ["prod_001","prod_003"], hasRewrite: false },
  { id: "a3", title: "Add skin_type metafield to all products", description: "Required for skin-type-based queries which represent 40% of category searches.", queriesLost: 9, effort: "low", impact: "high", affectedProductIds: ["prod_001","prod_003"], hasRewrite: false },
  { id: "a4", title: "Fix return policy — specify number of days", description: "Currently says 'reasonable time'. AI agents interpret vague policies as a risk signal.", queriesLost: 3, effort: "low", impact: "high", affectedProductIds: [], hasRewrite: true },
  { id: "a5", title: "Restock Daily SPF 50 or mark inactive", description: "Zero inventory active product. AI agents will not recommend it and it pollutes search results.", queriesLost: 2, effort: "low", impact: "high", affectedProductIds: ["prod_004"], hasRewrite: false },
  { id: "a6", title: "Get 10+ reviews on top 5 products", description: "Low review count (< 5) reduces AI recommendation confidence, especially vs competitive alternatives.", queriesLost: 5, effort: "high", impact: "high", affectedProductIds: ["prod_001","prod_003","prod_004"], hasRewrite: false },
  { id: "a7", title: "Create a skincare gift set / bundle",         description: "6 queries for gifting/occasion searches return nothing. A single bundle product captures them all.", queriesLost: 6, effort: "high", impact: "high", affectedProductIds: [], hasRewrite: false },
  { id: "a8", title: "Add alt text to all product images",  description: "Image alt text is missing on most products. Minor signal but quick to fix.", queriesLost: 0, effort: "low", impact: "low", affectedProductIds: [], hasRewrite: false },
];

// ─── Module 8 — Rewrites ─────────────────────────────────────────────────────

export const MOCK_REWRITES: ProductRewrite[] = [
  {
    productId: "prod_001",
    productTitle: "Hydra Glow Moisturizer",
    originalDescription: "Great moisturizer. Smells amazing. Good for all skin types.",
    optimizedDescription:
      "Lightweight daily moisturizer formulated for oily, combination, and sensitive skin. Fragrance-free. Key actives: 2% niacinamide, hyaluronic acid, ceramides. Dermatologist tested. No parabens, sulfates, or artificial fragrance. Available in 30ml and 50ml. Absorbs in under 60 seconds. Returns accepted within 30 days.",
    whyItWins:
      "Specifies three skin types (matches intent queries), lists key ingredients (trust + specificity), mentions dermatologist testing (trust signal), includes return policy window (reduces hesitation), provides variant sizes.",
  },
  {
    productId: "prod_003",
    productTitle: "Foam Cleanser — Sensitive Skin",
    originalDescription: "Gentle foam cleanser. Perfect for everyday use.",
    optimizedDescription:
      "Gentle daily foam cleanser designed for sensitive and acne-prone skin. Fragrance-free, alcohol-free, and hypoallergenic. Key actives: 1% allantoin, panthenol, aloe vera extract. Dermatologist tested. Does not strip natural moisture barrier. 150ml bottle (~90 days supply at twice-daily use). Returns accepted within 30 days.",
    whyItWins:
      "Explicitly states fragrance-free and alcohol-free (directly answerable in queries), quantifies supply duration (reduces hesitation), specifies skin types, adds dermatologist signal.",
  },
];
