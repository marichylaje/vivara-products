import { type ChangeEvent, useMemo, useState } from "react";

import { useProductsList } from "@entities/product";
import { Button, Input, useDebouncedValue } from "@shared";

import * as S from "./ProductsPage.styles";

const PAGE_SIZE = 10;

export function ProductsPage() {
  const [page, setPage] = useState(0);
  const [q, setQ] = useState("");

  const debouncedQ = useDebouncedValue(q, 300);

  const skip = page * PAGE_SIZE;

  const { data, isLoading, isError, isFetching } = useProductsList({
    limit: PAGE_SIZE,
    skip,
    q: debouncedQ,
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
          <Input
            placeholder="Search products…"
            value={q}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setQ(e.currentTarget.value);
              setPage(0);
            }}
            style={{ width: 260 }}
          />
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
                </tr>
              </thead>
              <tbody>
                {(data?.products ?? []).map((p) => (
                  <tr key={p.id}>
                    <S.Td>{p.title}</S.Td>
                    <S.Td>{p.category}</S.Td>
                    <S.Td>
                      <S.Right>${p.price}</S.Right>
                    </S.Td>
                    <S.Td>
                      <S.Right>{p.stock ?? "-"}</S.Right>
                    </S.Td>
                  </tr>
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
            <Button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={!canPrev}>
              Prev
            </Button>

            <S.Subtle>
              Page {page + 1} / {totalPages}
            </S.Subtle>

            <Button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={!canNext}
            >
              Next
            </Button>
          </S.Footer>
        </>
      )}
    </S.Page>
  );
}
