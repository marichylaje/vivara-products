import { useState, type ChangeEvent, type FormEvent } from "react";

import { useCreateProduct, useUpdateProduct, useProductCategories } from "@entities/product";
import { Button, Input, Modal } from "@shared";

import * as S from "./ProductFormModal.styles";

import type { Product, ProductCreateInput } from "@entities/product";

type Props = {
  open: boolean;
  onClose: () => void;
  initial?: Product | null;
};

function toCreateInput(p?: Product | null): ProductCreateInput {
  return {
    title: p?.title ?? "",
    description: p?.description ?? "",
    category: p?.category ?? "",
    price: p?.price ?? 0,
    thumbnail: p?.thumbnail ?? "",
  };
}

export function ProductFormModal({ open, onClose, initial }: Props) {
  const isEdit = !!initial;

  const categoriesQuery = useProductCategories();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const [form, setForm] = useState<ProductCreateInput>(() => toCreateInput(initial));
  const [error, setError] = useState<string | null>(null);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  function onChange<K extends keyof ProductCreateInput>(key: K) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };
  }

  function validate(): string | null {
    if (!form.title.trim()) return "Title is required";
    if (!form.category.trim()) return "Category is required";
    const price = Number(form.price);
    if (!Number.isFinite(price) || price < 0) return "Price must be a valid number";
    return null;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    void (async () => {
      const validationError = validate();
      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);

      const payload: ProductCreateInput = {
        ...form,
        price: Number(form.price),
        thumbnail: form.thumbnail?.trim() ? form.thumbnail.trim() : undefined,
      };

      try {
        if (isEdit && initial) {
          await updateMutation.mutateAsync({ id: initial.id, ...payload });
        } else {
          await createMutation.mutateAsync(payload);
        }

        onClose();
      } catch {
        setError("Something went wrong. Please try again.");
      }
    })();
  }

  return (
    <Modal open={open} title={isEdit ? "Edit product" : "New product"} onClose={onClose}>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        {error ? <S.ErrorText>{error}</S.ErrorText> : null}

        <S.Row>
          <S.Field>
            Title
            <Input value={form.title} onChange={onChange("title")} />
          </S.Field>

          <S.Field>
            Category
            <S.Select value={form.category} onChange={onChange("category")}>
              <option value="" disabled>
                Select…
              </option>
              {(categoriesQuery.data ?? []).map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </S.Select>
          </S.Field>
        </S.Row>

        <S.Field>
          Description
          <S.Textarea value={form.description} onChange={onChange("description")} />
        </S.Field>

        <S.Row>
          <S.Field>
            Price
            <Input type="number" value={String(form.price)} onChange={onChange("price")} />
          </S.Field>

          <S.Field>
            Thumbnail URL (optional)
            <Input value={form.thumbnail ?? ""} onChange={onChange("thumbnail")} />
          </S.Field>
        </S.Row>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <Button type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button $variant="primary" type="submit" disabled={isSubmitting}>
            {isEdit ? "Save" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
