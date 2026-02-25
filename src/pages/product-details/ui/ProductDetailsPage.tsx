import { Link, useParams } from "react-router-dom";

import { useProductDetail } from "@entities/product";

import * as S from "./ProductDetailsPage.styles";

export function ProductDetailsPage() {
  const params = useParams();
  const id = Number(params.id);
  const detail = useProductDetail(Number.isFinite(id) ? id : null);

  return (
    <S.Page>
      <Link to="/" style={{ color: "inherit" }}>
        ← Back
      </Link>

      {detail.isLoading ? (
        <p style={{ marginTop: 12 }}>Loading...</p>
      ) : detail.isError ? (
        <p style={{ marginTop: 12, color: "crimson" }}>Error loading product</p>
      ) : !detail.data ? null : (
        <S.Card>
          <S.Title>{detail.data.title}</S.Title>
          <S.Muted>{detail.data.description}</S.Muted>

          <S.Grid>
            <div>
              <strong>Category:</strong> {detail.data.category}
            </div>
            <div style={{ textAlign: "right" }}>
              <strong>Price:</strong> ${detail.data.price}
            </div>
            <div>
              <strong>Brand:</strong> {detail.data.brand ?? "-"}
            </div>
            <div style={{ textAlign: "right" }}>
              <strong>Stock:</strong> {detail.data.stock ?? "-"}
            </div>
          </S.Grid>
        </S.Card>
      )}
    </S.Page>
  );
}
