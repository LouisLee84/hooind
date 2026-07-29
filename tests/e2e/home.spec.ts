import { expect, test } from "@playwright/test";

test("shows the Hooind landing page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Hooind" }),
  ).toBeVisible();
});

for (const calculator of [
  {
    name: "퇴직금 계산기",
    path: "/calculators/retirement-pay",
  },
  {
    name: "연봉 실수령액 계산기",
    path: "/calculators/salary",
  },
  {
    name: "주휴수당 계산기",
    path: "/calculators/weekly-holiday-pay",
  },
]) {
  test(`navigates from home to ${calculator.name}`, async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: new RegExp(calculator.name) }).click();

    await expect(page).toHaveURL(calculator.path);
    await expect(
      page.getByRole("heading", { level: 1, name: calculator.name }),
    ).toBeVisible();
  });
}

test("shows all calculators on the catalog page", async ({ page }) => {
  await page.goto("/calculators");

  await expect(
    page.getByRole("heading", { level: 1, name: "계산기 목록" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /퇴직금 계산기/ })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /연봉 실수령액 계산기/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /주휴수당 계산기/ }),
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

test("calculates an estimated weekly holiday payment", async ({ page }) => {
  await page.goto("/calculators/weekly-holiday-pay");

  await page.getByLabel("시급", { exact: true }).fill("10000");
  await page.getByLabel("1주 소정근로일수", { exact: true }).fill("5");
  await page.getByLabel("1일 소정근로시간", { exact: true }).fill("4");
  await page.getByLabel("실제 근무일수", { exact: true }).fill("5");
  await page.getByRole("button", { name: "계산하기" }).click();

  await expect(page.getByTestId("estimated-weekly-holiday-pay")).toHaveText(
    "40,000원",
  );
  await expect(page.getByText("지급 대상 예상", { exact: true })).toBeVisible();
  await expect(page.getByText("240,000원", { exact: true })).toBeVisible();
});

test("explains why weekly holiday pay is not expected", async ({ page }) => {
  await page.goto("/calculators/weekly-holiday-pay");

  await page.getByLabel("시급", { exact: true }).fill("10000");
  await page.getByLabel("1주 소정근로일수", { exact: true }).fill("5");
  await page.getByLabel("1일 소정근로시간", { exact: true }).fill("2");
  await page.getByLabel("실제 근무일수", { exact: true }).fill("5");
  await page.getByRole("button", { name: "계산하기" }).click();

  await expect(page.getByText("지급 대상 아님", { exact: true })).toBeVisible();
  await expect(
    page.getByText("1주 소정근로시간이 15시간 미만입니다.", {
      exact: true,
    }),
  ).toBeVisible();
});

test("fits the weekly holiday calculator on a 390px viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/calculators/weekly-holiday-pay");

  await expect(
    page.getByRole("heading", { level: 1, name: "주휴수당 계산기" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
