import { http } from "@shared/api/httpClient";
import { env } from "@shared/config/env";

import type { ProductsPage } from "../model/types";

export const productsApi = {
  list: (params: { limit: number; skip: number }) =>
    http<ProductsPage>(`${env.apiBaseUrl}/products?limit=${params.limit}&skip=${params.skip}`),

  search: (params: { q: string; limit: number; skip: number }) =>
    http<ProductsPage>(
      `${env.apiBaseUrl}/products/search?q=${encodeURIComponent(params.q)}&limit=${params.limit}&skip=${params.skip}`,
    ),
};
