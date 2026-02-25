export const productKeys = {
  all: ["products"] as const,
  list: (params: { limit: number; skip: number; q?: string; category?: string | null }) =>
    ["products", "list", params] as const,
  categories: () => ["products", "categories"] as const,
};
