import { useProductsList } from "@entities/product";

const PAGE_SIZE = 10;

export function ProductsPage() {
  const { data, isLoading, isError } = useProductsList({ limit: PAGE_SIZE, skip: 0 });

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      <h1 style={{ margin: 0 }}>Products</h1>

      {isLoading ? (
        <p style={{ marginTop: 12 }}>Loading...</p>
      ) : isError ? (
        <p style={{ marginTop: 12, color: "crimson" }}>Error loading products</p>
      ) : (
        <div style={{ marginTop: 12, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "center", padding: 10, borderBottom: "1px solid #ddd" }}>
                  Title
                </th>
                <th style={{ textAlign: "center", padding: 10, borderBottom: "1px solid #ddd" }}>
                  Category
                </th>
                <th style={{ textAlign: "right", padding: 10, borderBottom: "1px solid #ddd" }}>
                  Price
                </th>
                <th style={{ textAlign: "right", padding: 10, borderBottom: "1px solid #ddd" }}>
                  Stock
                </th>
              </tr>
            </thead>
            <tbody>
              {(data?.products ?? []).map((p) => (
                <tr key={p.id}>
                  <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>{p.title}</td>
                  <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>{p.category}</td>
                  <td style={{ padding: 10, borderBottom: "1px solid #eee", textAlign: "right" }}>
                    ${p.price}
                  </td>
                  <td style={{ padding: 10, borderBottom: "1px solid #eee", textAlign: "right" }}>
                    {p.stock ?? "-"}
                  </td>
                </tr>
              ))}

              {(data?.products?.length ?? 0) === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: 12 }}>
                    No products
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
