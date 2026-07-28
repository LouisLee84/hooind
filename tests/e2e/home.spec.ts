import { expect, test } from "@playwright/test";

test("shows the Hooind landing page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Hooind" }),
  ).toBeVisible();
});

test("calculates an estimated retirement payment", async ({ page }) => {
  await page.goto("/calculators/retirement-pay");

  await page.getByLabel("입사일").fill("2020-01-01");
  await page.getByLabel("퇴직일").fill("2023-01-01");
  await page.getByLabel("퇴직 전 3개월 임금 총액").fill("9200000");
  await page.getByLabel("퇴직 전 1년간 상여금 총액").fill("0");
  await page.getByLabel("퇴직 전 1년간 연차수당 총액").fill("0");
  await page.getByRole("button", { name: "계산하기" }).click();

  await expect(page.getByTestId("estimated-retirement-pay")).toHaveText(
    "9,008,219원",
  );
  await expect(page.getByText("1,096일", { exact: true })).toBeVisible();
  await expect(page.getByText("100,000원", { exact: true })).toBeVisible();
});
