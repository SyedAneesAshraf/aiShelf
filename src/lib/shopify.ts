/**
 * Shopify Admin API client.
 * All functions are stubs — replace with real API calls in production.
 */

const SHOPIFY_API_VERSION = "2024-04";

function getAdminBaseUrl(): string {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  if (!domain) throw new Error("SHOPIFY_STORE_DOMAIN is not set");
  return `https://${domain}/admin/api/${SHOPIFY_API_VERSION}`;
}

function getAdminHeaders(): Record<string, string> {
  const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
  if (!token) throw new Error("SHOPIFY_ADMIN_ACCESS_TOKEN is not set");
  return {
    "X-Shopify-Access-Token": token,
    "Content-Type": "application/json",
  };
}

/** Fetch all products from the Shopify Admin REST API */
export async function fetchProducts(): Promise<ShopifyProduct[]> {
  // TODO: Replace with real paginated fetch
  // const res = await fetch(`${getAdminBaseUrl()}/products.json?limit=250`, { headers: getAdminHeaders() });
  // const data = await res.json();
  // return data.products;
  throw new Error("fetchProducts: not implemented — use mock data in development");
}

/** Fetch store policies (returns, shipping, privacy) */
export async function fetchPolicies(): Promise<ShopifyPolicy[]> {
  // TODO: GET /admin/api/{version}/policies.json
  throw new Error("fetchPolicies: not implemented");
}

/** Fetch robots.txt content */
export async function fetchRobotsTxt(storeDomain: string): Promise<string> {
  const url = `https://${storeDomain}/robots.txt`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`robots.txt fetch failed: ${res.status}`);
  return res.text();
}

/** Parse robots.txt and return a map of userAgent -> allowed|blocked */
export function parseRobotsTxt(content: string): Record<string, "allowed" | "blocked"> {
  const result: Record<string, "allowed" | "blocked"> = {};
  const lines = content.split("\n").map((l) => l.trim());

  let currentAgents: string[] = [];
  for (const line of lines) {
    if (line.toLowerCase().startsWith("user-agent:")) {
      currentAgents = [line.split(":")[1].trim().toLowerCase()];
    } else if (line.toLowerCase().startsWith("disallow:")) {
      const path = line.split(":")[1]?.trim();
      if (path === "/" || path === "") {
        // Disallow all
        for (const agent of currentAgents) {
          result[agent] = path === "/" ? "blocked" : result[agent] ?? "allowed";
        }
      }
    } else if (line.toLowerCase().startsWith("allow:")) {
      for (const agent of currentAgents) {
        if (!result[agent]) result[agent] = "allowed";
      }
    }
  }
  return result;
}

/** Run a search query against the Shopify Storefront API */
export async function storefrontSearch(
  storeDomain: string,
  query: string,
  first = 10
): Promise<StorefrontSearchResult[]> {
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!storefrontToken) throw new Error("SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set");

  const gql = `
    query SearchProducts($query: String!, $first: Int!) {
      search(query: $query, first: $first, types: PRODUCT) {
        edges {
          node {
            ... on Product {
              id
              title
              tags
              priceRange {
                minVariantPrice { amount currencyCode }
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(`https://${storeDomain}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: gql, variables: { query, first } }),
  });

  if (!res.ok) throw new Error(`Storefront API error: ${res.status}`);
  const data = await res.json();
  return data.data?.search?.edges?.map((e: { node: StorefrontSearchResult }) => e.node) ?? [];
}

// ─── Shopify types (minimal) ──────────────────────────────────────────────────

export interface ShopifyProduct {
  id: number;
  title: string;
  body_html: string;
  tags: string;
  variants: ShopifyVariant[];
  images: ShopifyImage[];
  status: string;
}

export interface ShopifyVariant {
  id: number;
  title: string;
  price: string;
  compare_at_price: string | null;
  inventory_quantity: number;
}

export interface ShopifyImage {
  id: number;
  alt: string | null;
  src: string;
}

export interface ShopifyPolicy {
  title: string;
  body: string;
  url: string;
}

export interface StorefrontSearchResult {
  id: string;
  title: string;
  tags: string[];
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
}
