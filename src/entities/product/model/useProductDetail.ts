import { useQuery } from "@tanstack/react-query";

import { productKeys } from "./queryKeys";
import { productsApi } from "../api/productsApi";

export function useProductDetail(id: number | null) {
  return useQuery({
    queryKey: id !== null ? productKeys.detail(id) : ["products", "detail", "none"],
    enabled: id !== null,
    queryFn: () => {
      if (id === null) throw new Error("Product id is null");
      return productsApi.detail(id);
    },
  });
}
