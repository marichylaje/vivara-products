import { useEffect } from "react";
import "./App.css";

import { http } from "@/shared/api/httpClient";
import { env } from "@/shared/config/env";

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

  return (
    <>
      <h1>Vivara Products Demo</h1>
      <p>Check the console to see API response.</p>
    </>
  );
}

export default App;
