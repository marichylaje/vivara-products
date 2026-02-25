import { useQuery } from "@tanstack/react-query";

import { productKeys } from "./queryKeys";
import { productsApi } from "../api/productsApi";

export function useProductCategories() {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: productsApi.categories,
    staleTime: 5 * 60 * 1000,
  });
}
