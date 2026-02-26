import { type ChangeEvent, type KeyboardEvent, type MouseEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProductCategories, useProductsList } from "@entities/product";
import { useDeleteProduct, type Product } from "@entities/product";
import { ProductFormModal } from "@features/product-form";
import { Button, Input, useDebouncedValue, useLocalStorageState, ConfirmDialog } from "@shared";

import * as S from "./ProductsPage.styles";

const PAGE_SIZE = 5;
const STORAGE_KEY = "vivara:products:listState";

type ListState = {
  page: number;
  q: string;
  category: string | null;
};

export function ProductsPage() {
  const [listState, setListState] = useLocalStorageState<ListState>(STORAGE_KEY, {
    page: 0,
    q: "",
    category: null,
  });
  const navigate = useNavigate();
  const deleteMutation = useDeleteProduct();
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const page = listState.page;
  const q = listState.q;
  const category = listState.category;

  const debouncedQ = useDebouncedValue(q, 300);

  const categoriesQuery = useProductCategories();

  const skip = page * PAGE_SIZE;

  const { data, isLoading, isError, isFetching } = useProductsList({
    limit: PAGE_SIZE,
    skip,
    q: debouncedQ,
    category,
  });

  const totalPages = useMemo(() => {
    const total = data?.total ?? 0;
    return Math.max(1, Math.ceil(total / PAGE_SIZE));
  }, [data?.total]);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  return (
    <S.Page>
      <S.Header>
        <S.Title>Products</S.Title>
        {isFetching && !isLoading ? <S.Subtle>Updating…</S.Subtle> : null}

        <S.Tools>
          <label htmlFor="product-search">Search</label>
          <Input
            id="product-search"
            placeholder="Search products…"
            value={q}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setListState((prev) => ({
                ...prev,
                q: e.target.value,
                category: null,
                page: 0,
              }));
            }}
            style={{ width: 260 }}
          />

          <label htmlFor="category-filter">Category</label>
          <S.Select
            id="category-filter"
            value={category ?? ""}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              const next = e.target.value || null;
              setListState((prev) => ({
                ...prev,
                category: next,
                q: "",
                page: 0,
              }));
            }}
            aria-label="Category filter"
          >
            <option value="">All categories</option>
            {(categoriesQuery.data ?? []).map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </S.Select>
          <Button
            $variant="primary"
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
          >
            + New
          </Button>
        </S.Tools>
      </S.Header>

      {isLoading ? (
        <p style={{ marginTop: 12 }}>Loading...</p>
      ) : isError ? (
        <p style={{ marginTop: 12, color: "crimson" }}>Error loading products</p>
      ) : (
        <>
          <S.TableWrap>
            <S.Table>
              <thead>
                <tr>
                  <S.Th>Title</S.Th>
                  <S.Th>Category</S.Th>
                  <S.Th style={{ textAlign: "right" }}>Price</S.Th>
                  <S.Th style={{ textAlign: "right" }}>Stock</S.Th>
                  <S.Th style={{ textAlign: "center" }}>Actions</S.Th>
                </tr>
              </thead>
              <tbody>
                {(data?.products ?? []).map((p) => (
                  <S.Tr
                    key={p.id}
                    aria-label={`Open product ${p.title}`}
                    onClick={() => navigate(`/products/${p.id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e: KeyboardEvent<HTMLTableRowElement>) => {
                      if (e.key === "Enter") void navigate(`/products/${p.id}`);
                    }}
                  >
                    <S.Td data-label="Title">{p.title}</S.Td>
                    <S.Td data-label="Category">{p.category}</S.Td>
                    <S.Td data-label="Price">
                      <S.Right>${p.price}</S.Right>
                    </S.Td>
                    <S.Td data-label="Stock">
                      <S.Right>{p.stock ?? "-"}</S.Right>
                    </S.Td>
                    <S.Td style={{ textAlign: "center" }}>
                      <Button
                        data-label="Edit Row"
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          setEditingProduct(p);
                          setIsFormOpen(true);
                        }}
                        style={{ marginRight: "auto" }}
                      >
                        Edit
                      </Button>
                      <Button
                        data-label="Delete Row"
                        $variant="danger"
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          setProductToDelete(p);
                        }}
                      >
                        Delete
                      </Button>
                    </S.Td>
                  </S.Tr>
                ))}

                {(data?.products?.length ?? 0) === 0 && (
                  <tr>
                    <S.Td colSpan={4} style={{ color: "#94a3b8" }}>
                      No results
                    </S.Td>
                  </tr>
                )}
              </tbody>
            </S.Table>
          </S.TableWrap>

          <S.Footer>
            <Button
              onClick={() =>
                setListState((prev) => ({ ...prev, page: Math.max(0, prev.page - 1) }))
              }
              disabled={!canPrev}
            >
              Prev
            </Button>

            <S.Subtle aria-live="polite">
              Page {page + 1} / {totalPages}
            </S.Subtle>

            <Button
              onClick={() =>
                setListState((prev) => ({ ...prev, page: Math.min(totalPages - 1, prev.page + 1) }))
              }
              disabled={!canNext}
            >
              Next
            </Button>
          </S.Footer>
          <ProductFormModal
            key={editingProduct?.id ?? "new"}
            open={isFormOpen}
            initial={editingProduct}
            onClose={() => {
              setIsFormOpen(false);
              setEditingProduct(null);
            }}
          />
          <ConfirmDialog
            open={!!productToDelete}
            title="Delete product"
            description={`Are you sure you want to delete "${productToDelete?.title ?? ""}"? This action cannot be undone.`}
            confirmText="Delete"
            danger
            isConfirming={deleteMutation.isPending}
            onClose={() => setProductToDelete(null)}
            onConfirm={() => {
              if (!productToDelete) return;
              void deleteMutation.mutateAsync(productToDelete.id).then(() => {
                setProductToDelete(null);
              });
            }}
          />
        </>
      )}
    </S.Page>
  );
}
