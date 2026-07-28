import { expect, test } from "@playwright/test";

test("shows the Hooind landing page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Hooind" }),
  ).toBeVisible();
});
