export const productKeys = {
  all: ["products"] as const,
  list: (params: { limit: number; skip: number }) => ["products", "list", params] as const,
};
