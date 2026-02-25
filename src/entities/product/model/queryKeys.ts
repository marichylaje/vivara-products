export const productKeys = {
  all: ["products"] as const,
  list: (params: { limit: number; skip: number; q?: string }) =>
    ["products", "list", params] as const,
};
