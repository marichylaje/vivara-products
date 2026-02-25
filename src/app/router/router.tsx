import { createBrowserRouter } from "react-router-dom";

import { ProductDetailsPage } from "@pages/product-details";
import { ProductsPage } from "@pages/products";

export const router = createBrowserRouter([
  { path: "/", element: <ProductsPage /> },
  { path: "/products/:id", element: <ProductDetailsPage /> },
]);
