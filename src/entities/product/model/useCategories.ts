import { useQuery } from "@tanstack/react-query";

import { productKeys } from "./queryKeys";
import { productsApi } from "../api/productsApi";

type CategoryObj = { slug: string; name: string; url?: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isCategoryObj(value: unknown): value is CategoryObj {
  if (!isRecord(value)) return false;
  return typeof value.slug === "string" && typeof value.name === "string";
}

export type CategoryOption = { value: string; label: string };

function normalizeCategories(input: unknown): CategoryOption[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((c): CategoryOption | null => {
      if (typeof c === "string") return { value: c, label: c };
      if (isCategoryObj(c)) return { value: c.slug, label: c.name };
      return null;
    })
    .filter((x): x is CategoryOption => x !== null);
}

export function useProductCategories() {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: productsApi.categories,
    staleTime: 5 * 60 * 1000,
    select: normalizeCategories,
  });
}
