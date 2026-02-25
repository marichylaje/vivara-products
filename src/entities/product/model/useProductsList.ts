import { useQuery } from "@tanstack/react-query";

import { productKeys } from "./queryKeys";
import { productsApi } from "../api/productsApi";

export function useProductsList(params: { limit: number; skip: number }) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productsApi.list(params),
  });
}
