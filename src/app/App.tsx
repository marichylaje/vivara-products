import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "@app";
import { http, env } from "@shared";
import "./styles/App.css";

type Product = {
  id: number;
  title: string;
  price: number;
};

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export const aaa = 3;

function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await http<ProductsResponse>(`${env.apiBaseUrl}/products?limit=5`);

        console.log({ data });
      } catch (error) {
        console.error(`Error fetching API: ${error}`);
      }
    };

    void fetchProducts();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
