import { useMutation, useQueryClient, type MutationFunction } from "@tanstack/react-query";

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

  const mutationFn: MutationFunction<void, ProductUpdateInput> = (input) => {
    addUpdatedProduct(input);
    return Promise.resolve();
  };

  return useMutation<void, Error, ProductUpdateInput>({
    mutationFn,
    onSuccess: (_data, input) => {
      void qc.invalidateQueries({ queryKey: productKeys.all });
      void qc.invalidateQueries({ queryKey: productKeys.detail(input.id) });
    },
  });
}
