import { beforeEach, describe, expect, it } from "vitest";

import {
  createLocalProduct,
  addUpdatedProduct,
  addDeletedProduct,
  getLocalWrites,
} from "./localWrites";

beforeEach(() => {
  localStorage.clear();
});

describe("localWrites", () => {
  it("creates product with negative id and stores in created", () => {
    const p = createLocalProduct({
      title: "Local",
      description: "d",
      category: "smartphones",
      price: 10,
      thumbnail: "x",
    });

    expect(p.id).toBeLessThan(0);

    const state = getLocalWrites();
    expect(state.created[0]?.title).toBe("Local");
  });

  it("updates created product in place", () => {
    const p = createLocalProduct({
      title: "Local",
      description: "d",
      category: "smartphones",
      price: 10,
    });

    addUpdatedProduct({ id: p.id, title: "Local edited" });

    const state = getLocalWrites();
    expect(state.created.find((x) => x.id === p.id)?.title).toBe("Local edited");
  });

  it("marks server product as deleted and removes patch", () => {
    addUpdatedProduct({ id: 1, title: "patched" });
    addDeletedProduct(1);

    const state = getLocalWrites();
    expect(state.deleted).toContain(1);
    expect(state.updated[1]).toBeUndefined();
  });
});
