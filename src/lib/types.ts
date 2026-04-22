// ─── Store / Connection ───────────────────────────────────────────────────────

export interface StoreConnection {
  storeDomain: string;
  storeName: string;
  connectedAt: string;
  productCount: number;
  collectionCount: number;
}

// ─── Module 2 — Technical Health ─────────────────────────────────────────────

export type BotStatus = "allowed" | "blocked" | "unknown";

export interface CrawlerBot {
  name: string;
  userAgent: string;
  status: BotStatus;
  note?: string;
}

export interface CrawlerAuditResult {
  robotsTxtFound: boolean;
  robotsTxtUrl: string;
  bots: CrawlerBot[];
  hasCriticalBlock: boolean;
}

export interface CatalogSyncProduct {
  id: string;
  title: string;
  sptCategory: string | null;
  sptAssigned: boolean;
  mandatoryMetafields: MetafieldCheck[];
  variantStructure: "correct" | "incorrect" | "missing";
  pricingConsistent: boolean;
  inventoryTracked: boolean;
  catalogSyncScore: number; // 0-100
}

export interface MetafieldCheck {
  key: string;
  present: boolean;
  value?: string;
}

export interface InventoryIssue {
  productId: string;
  productTitle: string;
  issue: "zero_inventory" | "price_inconsistency" | "compare_at_price_error";
  detail: string;
}

// ─── Module 3 — AI Readiness Audit ───────────────────────────────────────────

export interface ProductAuditScore {
  productId: string;
  productTitle: string;
  dataCompleteness: number;   // 0-100
  policyClarity: number;      // 0-100 (store-level)
  trustSignals: number;       // 0-100
  faqCoverage: number;        // 0-100
  structuredDataQuality: number; // 0-100
  overallAIReadiness: number; // weighted average
}

export interface FAQItem {
  question: string;
  status: "answerable" | "partial" | "unanswerable";
  reason?: string;
}

export interface StoreAudit {
  overallAIReadiness: number;
  dataCompleteness: number;
  policyClarity: number;
  trustSignals: number;
  faqCoverage: number;
  structuredDataQuality: number;
  faqItems: FAQItem[];
  productScores: ProductAuditScore[];
}

// ─── Module 4 — Real Search Surfacing ────────────────────────────────────────

export type RecommendationStatus = "won" | "shortlisted_not_recommended" | "surfaced_not_shortlisted" | "not_surfaced";
export type Confidence = "high" | "medium" | "low";

export interface QueryResult {
  query: string;
  category: string;
  surfacedProducts: SurfacedProduct[];
  totalSurfaced: number;
}

export interface SurfacedProduct {
  productId: string;
  productTitle: string;
  position: number;
  shortlisted: boolean;
  recommended: boolean;
  lostReason?: string;
  confidence?: Confidence;
}

// ─── Module 5 — Funnel Dashboard ─────────────────────────────────────────────

export interface FunnelMetrics {
  queriesRun: number;
  searchAppearanceCount: number;
  searchAppearanceRate: number;   // percentage
  aiShortlistCount: number;
  aiShortlistRate: number;        // percentage of appeared
  aiRecommendationCount: number;
  aiRecommendationRate: number;   // percentage of shortlisted
  overallAIConversionRate: number; // percentage of all queries
}

export interface QueryBreakdownRow {
  query: string;
  appeared: boolean;
  shortlisted: boolean;
  recommended: boolean;
  lostBecause?: string;
  confidence?: Confidence;
}

export interface LostReasonCluster {
  reason: string;
  queriesLost: number;
  confidence: Confidence;
}

export interface WinningPattern {
  pattern: string;
  explanation: string;
  opportunity: string;
}

// ─── Module 6 — Perception Gap ───────────────────────────────────────────────

export interface MerchantIntent {
  brandDescription: string;
  topDifferentiators: string[];
  primaryTargetCustomer: string;
}

export interface PerceptionGapAnalysis {
  merchantIntent: MerchantIntent;
  aiPerception: string;
  alignmentScore: number; // 0-100
  gaps: PerceptionGap[];
}

export interface PerceptionGap {
  claim: string;
  reality: string;
  severity: "critical" | "moderate" | "minor";
}

// ─── Module 7 — Action Plan ───────────────────────────────────────────────────

export type EffortLevel = "low" | "high";
export type ImpactLevel = "high" | "low";

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  queriesLost: number;
  effort: EffortLevel;
  impact: ImpactLevel;
  affectedProductIds: string[];
  hasRewrite: boolean;
}

// ─── Module 8 — Rewrites ─────────────────────────────────────────────────────

export interface ProductRewrite {
  productId: string;
  productTitle: string;
  originalDescription: string;
  optimizedDescription: string;
  whyItWins: string;
}

// ─── Full Analysis State ──────────────────────────────────────────────────────

export interface AnalysisState {
  storeConnection: StoreConnection | null;
  crawlerAudit: CrawlerAuditResult | null;
  catalogSync: CatalogSyncProduct[] | null;
  inventoryIssues: InventoryIssue[] | null;
  storeAudit: StoreAudit | null;
  queryResults: QueryResult[] | null;
  funnelMetrics: FunnelMetrics | null;
  queryBreakdown: QueryBreakdownRow[] | null;
  lostReasonClusters: LostReasonCluster[] | null;
  winningPatterns: WinningPattern[] | null;
  perceptionGap: PerceptionGapAnalysis | null;
  actionItems: ActionItem[] | null;
  rewrites: ProductRewrite[] | null;
  runAt: string | null;
}
