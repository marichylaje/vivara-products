import { test, expect } from "@playwright/test";

test("app loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/vivara/i);
});

test.describe("Vivara Products App", () => {
  test("creates a product and sees it in the table", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "+ New" }).click();

    const dialog = page.getByRole("dialog", { name: "New product" });

    await dialog.getByLabel("Title").fill("E2E Product");
    await dialog.getByLabel("Category").selectOption("smartphones");
    await dialog.getByLabel("Price").fill("999");

    await dialog.getByRole("button", { name: "Create" }).click();

    await expect(page.getByText("E2E Product")).toBeVisible();
  });
});
