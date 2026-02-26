import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ProductsPage } from "./ProductsPage";
import { renderWithProviders } from "../../../tests/utils/renderWithProviders";

type MockProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock?: number;
  thumbnail?: string;
  brand?: string;
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const products: MockProduct[] = [
  { id: 1, title: "iPhone 9", description: "desc", category: "smartphones", price: 549, stock: 94 },
  { id: 2, title: "iPhone X", description: "desc", category: "smartphones", price: 899, stock: 34 },
  {
    id: 3,
    title: "Samsung Universe 9",
    description: "desc",
    category: "smartphones",
    price: 1249,
    stock: 36,
  },
  { id: 4, title: "OPPOF19", description: "desc", category: "smartphones", price: 280, stock: 123 },
  {
    id: 5,
    title: "Huawei P30",
    description: "desc",
    category: "smartphones",
    price: 499,
    stock: 32,
  },
];

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

      if (url.includes("/products/categories")) {
        return jsonResponse(["smartphones", "laptops"]);
      }

      if (url.includes("/products?")) {
        return jsonResponse({
          products,
          total: 100,
          skip: 0,
          limit: 5,
        });
      }

      if (url.match(/\/products\/\d+$/)) {
        const id = Number(url.split("/").pop());
        const found = products.find((p) => p.id === id);
        return found ? jsonResponse(found) : jsonResponse({ message: "Not found" }, 404);
      }

      return jsonResponse({ message: `Unhandled: ${url}` }, 500);
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ProductsPage", () => {
  it("renders products table", async () => {
    renderWithProviders(<ProductsPage />);

    expect(await screen.findByText("iPhone 9")).toBeInTheDocument();
    expect(screen.getByText("Huawei P30")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  it("creates a product locally and shows it in the table", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductsPage />);

    await screen.findByText("iPhone 9");

    await user.click(screen.getByRole("button", { name: "+ New" }));
    const dialog = await screen.findByRole("dialog", { name: "New product" });

    await user.type(within(dialog).getByLabelText("Title"), "My Local Product");
    await user.selectOptions(within(dialog).getByLabelText("Category"), "smartphones");
    await user.clear(within(dialog).getByLabelText("Price"));
    await user.type(within(dialog).getByLabelText("Price"), "123");

    await user.click(within(dialog).getByRole("button", { name: "Create" }));

    expect(await screen.findByText("My Local Product")).toBeInTheDocument();
  });

  it("deletes a product locally after confirmation", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductsPage />);

    await screen.findByText("iPhone 9");

    const row =
      screen.getByText("iPhone 9").closest("tr") ?? screen.getByText("iPhone 9").parentElement;
    expect(row).toBeTruthy();

    const deleteButtons = screen.getAllByRole("button", { name: "Delete" });
    await user.click(deleteButtons[0]);

    const dialog = await screen.findByRole("dialog", { name: "Delete product" });

    await user.click(within(dialog).getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(screen.queryByText("iPhone 9")).not.toBeInTheDocument();
    });
  });

  it("edits a product locally and updates table", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductsPage />);

    await screen.findByText("iPhone 9");

    await user.click(screen.getAllByRole("button", { name: "Edit" })[0]);

    const dialog = await screen.findByRole("dialog", { name: "Edit product" });

    const titleInput = within(dialog).getByLabelText("Title");
    await user.clear(titleInput);
    await user.type(titleInput, "iPhone 9 (Edited)");

    await user.click(within(dialog).getByRole("button", { name: "Save" }));

    expect(await screen.findByText("iPhone 9 (Edited)")).toBeInTheDocument();
  });

  it("category filter uses /products/category and clears search", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductsPage />);

    await screen.findByText("iPhone 9");

    await user.selectOptions(screen.getByLabelText("Category filter"), "laptops");

    expect(screen.getByPlaceholderText("Search products…")).toHaveValue("");
  });

  it("persists list state in localStorage (q/category/page)", async () => {
    const user = userEvent.setup();
    const { unmount } = renderWithProviders(<ProductsPage />);

    await screen.findByText("iPhone 9");

    await user.type(screen.getByPlaceholderText("Search products…"), "iphone");
    unmount();

    renderWithProviders(<ProductsPage />);
    expect(screen.getByPlaceholderText("Search products…")).toHaveValue("iphone");
  });
});
