import { env, http } from "@shared";

import type { ProductsPage } from "../model/types";

export const productsApi = {
  list: (params: { limit: number; skip: number }) =>
    http<ProductsPage>(`${env.apiBaseUrl}/products?limit=${params.limit}&skip=${params.skip}`),
};
