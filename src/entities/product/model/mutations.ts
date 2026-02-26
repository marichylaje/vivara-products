import { useMutation, useQueryClient, type MutationFunction } from "@tanstack/react-query";

import { productKeys } from "./queryKeys";
import { createLocalProduct, addUpdatedProduct, addDeletedProduct } from "../lib";

import type { ProductCreateInput, ProductUpdateInput, Product } from "./types";

export function useCreateProduct() {
  const qc = useQueryClient();

  const mutationFn: MutationFunction<Product, ProductCreateInput> = (input) => {
    const created = createLocalProduct(input);
    return Promise.resolve(created);
  };

  return useMutation<Product, Error, ProductCreateInput>({
    mutationFn,
    onSuccess: () => {
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

export function useDeleteProduct() {
  const qc = useQueryClient();

  const mutationFn: MutationFunction<void, number> = (id) => {
    addDeletedProduct(id);
    return Promise.resolve();
  };

  return useMutation<void, Error, number>({
    mutationFn,
    onSuccess: (_data, id) => {
      void qc.invalidateQueries({ queryKey: productKeys.all });
      void qc.invalidateQueries({ queryKey: productKeys.detail(id) });
    },
  });
}
