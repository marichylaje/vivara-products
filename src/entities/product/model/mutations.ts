import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productsApi } from "../api";
import { productKeys } from "./queryKeys";
import { addCreatedProduct, addUpdatedProduct } from "../lib";

import type { ProductCreateInput, ProductUpdateInput } from "./types";

export function useCreateProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: ProductCreateInput) => productsApi.create(input),
    onSuccess: (createdFromApi, input) => {
      addCreatedProduct(createdFromApi, input);
      void qc.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: ProductUpdateInput) => productsApi.update(input),
    onSuccess: (_updatedFromApi, input) => {
      addUpdatedProduct(input);
      void qc.invalidateQueries({ queryKey: productKeys.all });
      void qc.invalidateQueries({ queryKey: productKeys.detail(input.id) });
    },
  });
}
