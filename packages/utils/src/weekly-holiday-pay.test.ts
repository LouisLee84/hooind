import { describe, expect, it } from "vitest";
import { calculateWeeklyHolidayPay } from "./weekly-holiday-pay";

function calculate(
  overrides: Partial<Parameters<typeof calculateWeeklyHolidayPay>[0]> = {},
) {
  return calculateWeeklyHolidayPay({
    hourlyWage: 10_000,
    scheduledWorkDays: 5,
    dailyWorkHours: 4,
    actualWorkDays: 5,
    ...overrides,
  });
}

describe("calculateWeeklyHolidayPay", () => {
  it("is not eligible below 15 weekly hours", () => {
    const result = calculate({ dailyWorkHours: 2 });
    expect(result.success && result.value.eligible).toBe(false);
    if (!result.success) return;
    expect(result.value.ineligibleReasons).toContain(
      "1주 소정근로시간이 15시간 미만입니다.",
    );
  });

  it("is not eligible when scheduled workdays were not completed", () => {
    const result = calculate({ actualWorkDays: 4 });
    expect(result.success && result.value.eligible).toBe(false);
    if (!result.success) return;
    expect(result.value.estimatedHolidayPay).toBe(0);
  });

  it("calculates pay below 40 weekly hours", () => {
    const result = calculate();
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value).toMatchObject({
      eligible: true,
      weeklyScheduledHours: 20,
      holidayPayHours: 4,
      estimatedHolidayPay: 40_000,
      weeklyTotalPay: 240_000,
    });
  });

  it("caps holiday hours at 8 for 40 or more weekly hours", () => {
    const result = calculate({ dailyWorkHours: 9 });
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value.holidayPayHours).toBe(8);
    expect(result.value.estimatedHolidayPay).toBe(80_000);
  });

  it.each([
    { hours: 3, expectedHolidayHours: 3 },
    { hours: 8, expectedHolidayHours: 8 },
  ])(
    "handles the $hours-hour daily boundary",
    ({ hours, expectedHolidayHours }) => {
      const result = calculate({ dailyWorkHours: hours });
      expect(result.success).toBe(true);
      if (!result.success) return;
      expect(result.value.weeklyScheduledHours).toBe(hours * 5);
      expect(result.value.holidayPayHours).toBe(expectedHolidayHours);
      expect(result.value.eligible).toBe(true);
    },
  );

  it("rejects invalid and unrealistic inputs", () => {
    const result = calculate({
      hourlyWage: Number.NaN,
      scheduledWorkDays: 8,
      dailyWorkHours: 25,
      actualWorkDays: -1,
    });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(Object.keys(result.errors)).toHaveLength(4);
  });

  it("calculates the monthly reference with 365 / 7 / 12", () => {
    const result = calculate();
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value.monthlyReferencePay).toBe(
      Math.round((240_000 * 365) / 7 / 12),
    );
  });
});
