import { useQuery } from "@tanstack/react-query";

import { productKeys } from "./queryKeys";
import { productsApi } from "../api/productsApi";

type Params = { limit: number; skip: number; q?: string; category?: string | null };

export function useProductsList(params: Params) {
  const q = params.q?.trim() ?? "";
  const category = params.category ?? null;

  const hasQ = q.length > 0;
  const hasCategory = !!category;

  return useQuery({
    queryKey: productKeys.list({ ...params, q, category }),
    queryFn: () => {
      if (hasQ) return productsApi.search({ q, limit: params.limit, skip: params.skip });
      if (hasCategory)
        return productsApi.byCategory({
          category: category,
          limit: params.limit,
          skip: params.skip,
        });
      return productsApi.list({ limit: params.limit, skip: params.skip });
    },
    placeholderData: (prev) => prev,
  });
}
