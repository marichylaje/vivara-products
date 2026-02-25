import type { Product, ProductCreateInput, ProductUpdateInput } from "../model/types";

type LocalWrites = {
  created: Product[];
  updated: Record<number, Partial<Product>>;
};

const KEY = "vivara:products:writes:v1";

function read(): LocalWrites {
  const raw = localStorage.getItem(KEY);
  if (!raw) return { created: [], updated: {} };
  try {
    return JSON.parse(raw) as LocalWrites;
  } catch {
    return { created: [], updated: {} };
  }
}

function write(next: LocalWrites) {
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function getLocalWrites(): LocalWrites {
  return read();
}

export function nextLocalId(): number {
  const { created } = read();
  const min = created.reduce((acc, p) => Math.min(acc, p.id), 0);
  return min - 1; // -1, -2, -3...
}

export function addCreatedProduct(createdFromApi: Product, input: ProductCreateInput): Product {
  const state = read();
  const id = nextLocalId();

  const created: Product = {
    ...createdFromApi,
    id,
    title: input.title,
    description: input.description,
    category: input.category,
    price: input.price,
    thumbnail: input.thumbnail,
  };

  write({ ...state, created: [created, ...state.created] });
  return created;
}

export function addUpdatedProduct(input: ProductUpdateInput) {
  const state = read();

  const createdIndex = state.created.findIndex((p) => p.id === input.id);
  if (createdIndex >= 0) {
    const created = [...state.created];
    created[createdIndex] = { ...created[createdIndex], ...input };
    write({ ...state, created });
    return;
  }

  write({
    ...state,
    updated: {
      ...state.updated,
      [input.id]: { ...(state.updated[input.id] ?? {}), ...input },
    },
  });
}

export function applyWritesToProduct(product: Product): Product {
  const state = read();
  const patch = state.updated[product.id];
  return patch ? { ...product, ...patch } : product;
}

export function findCreatedById(id: number): Product | undefined {
  return read().created.find((p) => p.id === id);
}

export function applyWritesToList(products: Product[]): Product[] {
  const state = read();
  const patched = products.map((p) => applyWritesToProduct(p));
  return [...state.created, ...patched];
}

export function getCreatedCount(): number {
  return read().created.length;
}
