import { env, http } from "@shared";

import type { ProductsPage, Product, ProductUpdateInput, ProductCreateInput } from "../model";

export const productsApi = {
  list: (params: { limit: number; skip: number }) =>
    http<ProductsPage>(`${env.apiBaseUrl}/products?limit=${params.limit}&skip=${params.skip}`),

  search: (params: { q: string; limit: number; skip: number }) =>
    http<ProductsPage>(
      `${env.apiBaseUrl}/products/search?q=${encodeURIComponent(params.q)}&limit=${params.limit}&skip=${params.skip}`,
    ),

  categories: () => http<unknown>(`${env.apiBaseUrl}/products/categories`),

  byCategory: (params: { category: string; limit: number; skip: number }) =>
    http<ProductsPage>(
      `${env.apiBaseUrl}/products/category/${encodeURIComponent(params.category)}?limit=${params.limit}&skip=${params.skip}`,
    ),

  detail: (id: number) => http<Product>(`${env.apiBaseUrl}/products/${id}`),

  create: (input: ProductCreateInput) =>
    http<Product>(`${env.apiBaseUrl}/products/add`, { method: "POST", body: input }),

  update: (input: ProductUpdateInput) =>
    http<Product>(`${env.apiBaseUrl}/products/${input.id}`, { method: "PUT", body: input }),
};
