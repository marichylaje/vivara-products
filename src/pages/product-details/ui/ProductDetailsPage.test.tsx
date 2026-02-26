import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ProductDetailsPage } from "./ProductDetailsPage";
import { renderWithProviders } from "../../../tests/utils/renderWithProviders";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

beforeEach(() => {
  localStorage.clear();

  vi.stubGlobal(
    "fetch",
    vi.fn((input: RequestInfo | URL) => {
      const url =
        input instanceof Request
          ? input.url
          : input instanceof URL
            ? input.toString()
            : String(input);

      if (url.endsWith("/products/1")) {
        return jsonResponse({
          id: 1,
          title: "iPhone 9",
          description: "desc",
          category: "smartphones",
          price: 549,
          stock: 94,
          brand: "Apple",
          thumbnail: "https://cdn.example.com/thumb.jpg",
        });
      }

      if (url.endsWith("/products/999")) {
        return jsonResponse({ message: "Not found" }, 404);
      }

      return jsonResponse({ message: `Unhandled: ${url}` }, 500);
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ProductDetailsPage", () => {
  it("renders product details including thumbnail", async () => {
    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Routes>,
      { route: "/products/1" },
    );

    expect(await screen.findByText("iPhone 9")).toBeInTheDocument();

    const img = screen.getByRole("img", { name: "iPhone 9" });
    expect(img).toHaveAttribute("src", "https://cdn.example.com/thumb.jpg");
  });

  it("shows error state when request fails", async () => {
    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Routes>,
      { route: "/products/999" },
    );

    expect(await screen.findByText("Error loading product")).toBeInTheDocument();
  });
});
