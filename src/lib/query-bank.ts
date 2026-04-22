/**
 * Curated query bank — realistic shopping queries per category.
 * Used by Module 4 to run live search surfacing tests.
 */

export type QueryCategory =
  | "skincare"
  | "footwear"
  | "apparel"
  | "supplements"
  | "haircare"
  | "general";

export interface QueryEntry {
  query: string;
  category: QueryCategory;
  intent: "specific_need" | "budget" | "gifting" | "routine" | "brand_trust" | "problem_solution";
}

const QUERY_BANK: QueryEntry[] = [
  // ── Skincare ──────────────────────────────────────────────────────────────
  { query: "moisturizer for oily skin under ₹500",               category: "skincare",     intent: "budget" },
  { query: "fragrance free cleanser for sensitive skin",          category: "skincare",     intent: "specific_need" },
  { query: "vitamin C serum for dark spots",                      category: "skincare",     intent: "problem_solution" },
  { query: "skincare gift set",                                   category: "skincare",     intent: "gifting" },
  { query: "gentle face wash for acne prone skin",                category: "skincare",     intent: "problem_solution" },
  { query: "hydrating serum without alcohol",                     category: "skincare",     intent: "specific_need" },
  { query: "complete skincare routine for beginners",             category: "skincare",     intent: "routine" },
  { query: "dermatologist tested moisturizer",                    category: "skincare",     intent: "brand_trust" },
  { query: "cruelty free vegan skincare India",                   category: "skincare",     intent: "brand_trust" },
  { query: "daily SPF 50 sunscreen non greasy",                   category: "skincare",     intent: "specific_need" },
  { query: "niacinamide serum for pores",                         category: "skincare",     intent: "problem_solution" },
  { query: "affordable anti aging eye cream",                     category: "skincare",     intent: "budget" },
  { query: "best cleanser for combination skin",                  category: "skincare",     intent: "specific_need" },
  { query: "under eye cream dark circles",                        category: "skincare",     intent: "problem_solution" },
  { query: "cleanser that doesn't dry out skin",                  category: "skincare",     intent: "specific_need" },

  // ── Footwear ──────────────────────────────────────────────────────────────
  { query: "running shoes for flat feet under ₹3000",            category: "footwear",     intent: "budget" },
  { query: "waterproof sneakers for monsoon",                     category: "footwear",     intent: "specific_need" },
  { query: "formal shoes for office under ₹2000",                category: "footwear",     intent: "budget" },
  { query: "wide fit comfortable sneakers women",                 category: "footwear",     intent: "specific_need" },
  { query: "lightweight hiking shoes India",                      category: "footwear",     intent: "specific_need" },

  // ── Apparel ───────────────────────────────────────────────────────────────
  { query: "breathable gym t-shirt men under ₹500",              category: "apparel",      intent: "budget" },
  { query: "plus size kurta set festive season",                  category: "apparel",      intent: "specific_need" },
  { query: "sustainable cotton t-shirts India",                   category: "apparel",      intent: "brand_trust" },
  { query: "gift for her ethnic wear",                            category: "apparel",      intent: "gifting" },
  { query: "office wear women formal blouse",                     category: "apparel",      intent: "specific_need" },

  // ── Supplements ───────────────────────────────────────────────────────────
  { query: "plant based protein powder vegetarian India",         category: "supplements",  intent: "specific_need" },
  { query: "vitamin D3 supplement under ₹300",                   category: "supplements",  intent: "budget" },
  { query: "collagen supplement for hair and skin",               category: "supplements",  intent: "specific_need" },
  { query: "ashwagandha capsules for stress",                     category: "supplements",  intent: "problem_solution" },
  { query: "FSSAI approved multivitamin tablets",                 category: "supplements",  intent: "brand_trust" },

  // ── Haircare ──────────────────────────────────────────────────────────────
  { query: "sulfate free shampoo for colored hair",               category: "haircare",     intent: "specific_need" },
  { query: "hair oil for hair fall under ₹400",                  category: "haircare",     intent: "budget" },
  { query: "deep conditioning mask dry damaged hair",             category: "haircare",     intent: "problem_solution" },
  { query: "scalp serum for dandruff sensitive scalp",            category: "haircare",     intent: "problem_solution" },
  { query: "haircare gift hamper for birthday",                   category: "haircare",     intent: "gifting" },
];

/** Return queries relevant to a given category */
export function getQueriesForCategory(category: QueryCategory): QueryEntry[] {
  return QUERY_BANK.filter((q) => q.category === category);
}

/** Return all queries */
export function getAllQueries(): QueryEntry[] {
  return QUERY_BANK;
}

/** Detect the most likely category for a product based on its title and tags */
export function detectCategory(title: string, tags: string[]): QueryCategory {
  const text = [title, ...tags].join(" ").toLowerCase();
  if (/moisturizer|serum|cleanser|spf|sunscreen|toner|face|skincare/.test(text)) return "skincare";
  if (/shoe|sneaker|boot|sandal|footwear/.test(text))                              return "footwear";
  if (/shirt|kurta|dress|jeans|apparel|clothing|wear/.test(text))                 return "apparel";
  if (/protein|vitamin|supplement|capsule|probiotic|collagen/.test(text))         return "supplements";
  if (/shampoo|conditioner|hair oil|hair mask|scalp/.test(text))                  return "haircare";
  return "general";
}
