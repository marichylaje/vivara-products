import { useQuery } from "@tanstack/react-query";

import { productKeys } from "./queryKeys";
import { productsApi } from "../api";
import { applyWritesToProduct, findCreatedById, isDeleted } from "../lib";

export function useProductDetail(id: number | null) {
  return useQuery({
    queryKey: id !== null ? productKeys.detail(id) : ["products", "detail", "none"],
    enabled: id !== null,
    queryFn: async () => {
      if (id === null) throw new Error("Product id is null");

      if (id < 0) {
        const created = findCreatedById(id);
        if (!created) throw new Error("Local product not found");
        return applyWritesToProduct(created);
      }

      if (isDeleted(id)) throw new Error("Product was deleted");

      const fromApi = await productsApi.detail(id);
      return applyWritesToProduct(fromApi);
    },
  });
}
