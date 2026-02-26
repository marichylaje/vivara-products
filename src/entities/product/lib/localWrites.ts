import type { Product, ProductCreateInput, ProductUpdateInput } from "../model/types";

type LocalWrites = {
  created: Product[];
  updated: Record<number, Partial<Product>>;
  deleted: number[];
};

const KEY = "vivara:products:writes:v1";

function read(): LocalWrites {
  const raw = localStorage.getItem(KEY);

  if (!raw) return { created: [], updated: {}, deleted: [] };

  try {
    const parsed = JSON.parse(raw) as Partial<LocalWrites>;

    return {
      created: parsed.created ?? [],
      updated: parsed.updated ?? {},
      deleted: parsed.deleted ?? [],
    };
  } catch {
    return { created: [], updated: {}, deleted: [] };
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
  return min - 1;
}

export function createLocalProduct(input: ProductCreateInput): Product {
  const state = read();
  const id = nextLocalId();

  const created: Product = {
    id,
    title: input.title,
    description: input.description,
    category: input.category,
    price: input.price,
    thumbnail: input.thumbnail,
    stock: 0,
    brand: undefined,
    rating: undefined,
    discountPercentage: undefined,
    images: input.thumbnail ? [input.thumbnail] : [],
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

export function applyWritesToProduct(product: Product): Product | null {
  const state = read();

  if (state.deleted.includes(product.id)) return null;

  const patch = state.updated[product.id];
  return patch ? { ...product, ...patch } : product;
}

export function findCreatedById(id: number): Product | undefined {
  return read().created.find((p) => p.id === id);
}

export function applyWritesToList(products: Product[]): Product[] {
  const state = read();

  const patched = products
    .filter((p) => !state.deleted.includes(p.id))
    .map((p) => applyWritesToProduct(p))
    .filter((p): p is Product => p !== null);

  return [...state.created, ...patched];
}

export function getCreatedCount(): number {
  return read().created.length;
}

export function isDeleted(id: number): boolean {
  return read().deleted.includes(id);
}

export function addDeletedProduct(id: number) {
  const state = read();

  const created = state.created.filter((p) => p.id !== id);

  const deleted = id > 0 ? Array.from(new Set([...state.deleted, id])) : state.deleted;

  const updated = { ...state.updated };
  delete updated[id];

  write({ created, updated, deleted });
}

export function applyDeletesToList(products: Product[]): Product[] {
  const state = read();
  return products.filter((p) => !state.deleted.includes(p.id));
}

export function getDeletedCount(): number {
  return read().deleted.length;
}
