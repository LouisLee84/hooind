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

test("calculates an estimated monthly take-home salary", async ({ page }) => {
  await page.goto("/calculators/salary");

  await page.getByLabel("연봉", { exact: true }).fill("6000");
  await page.getByLabel("월 비과세 금액 (선택)", { exact: true }).fill("20");
  await page.getByLabel("부양가족 수", { exact: true }).fill("1");
  await page.getByLabel("20세 이하 자녀 수", { exact: true }).fill("0");
  await page.getByRole("button", { name: "계산하기" }).click();

  await expect(page.getByTestId("monthly-net-salary")).toContainText("원");
  await expect(page.getByText("국민연금", { exact: true })).toBeVisible();
  await expect(page.getByText("연 실수령액", { exact: true })).toBeVisible();
});
