import { useQuery } from "@tanstack/react-query";

import { productKeys } from "./queryKeys";
import { productsApi } from "../api/productsApi";

type Params = { limit: number; skip: number; q?: string };

export function useProductsList(params: Params) {
  const q = params.q?.trim() ?? "";
  const hasQ = q.length > 0;

  return useQuery({
    queryKey: productKeys.list({ ...params, q }),
    queryFn: () =>
      hasQ
        ? productsApi.search({ q, limit: params.limit, skip: params.skip })
        : productsApi.list(params),
    placeholderData: (prev) => prev,
  });
}
