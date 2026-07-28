import { describe, expect, it } from "vitest";
import { calculateRetirementPay } from "./retirement-pay";

const baseInput = {
  employmentDate: "2020-01-01",
  retirementDate: "2023-01-01",
  threeMonthWages: 9_200_000,
  annualBonus: 0,
  annualLeaveAllowance: 0,
};

describe("calculateRetirementPay", () => {
  it("calculates retirement pay using actual days in the prior three months", () => {
    const calculation = calculateRetirementPay(baseInput);

    expect(calculation).toEqual({
      success: true,
      value: {
        serviceDays: 1_096,
        servicePeriod: { years: 3, months: 0, days: 0 },
        averageWagePeriodDays: 92,
        averageDailyWage: 100_000,
        estimatedRetirementPay: 9_008_219,
      },
    });
  });

  it("adds three twelfths of annual bonus and leave allowance", () => {
    const calculation = calculateRetirementPay({
      ...baseInput,
      annualBonus: 4_000_000,
      annualLeaveAllowance: 300_000,
    });

    expect(calculation.success).toBe(true);

    if (calculation.success) {
      expect(calculation.value.averageDailyWage).toBe(111_685);
      expect(calculation.value.estimatedRetirementPay).toBe(10_060_810);
    }
  });

  it("rejects a retirement date that is not after the employment date", () => {
    const calculation = calculateRetirementPay({
      ...baseInput,
      employmentDate: "2023-01-01",
      retirementDate: "2023-01-01",
    });

    expect(calculation).toEqual({
      success: false,
      errors: {
        retirementDate: "퇴직일은 입사일보다 늦어야 합니다.",
      },
    });
  });

  it("rejects negative money inputs", () => {
    const calculation = calculateRetirementPay({
      ...baseInput,
      annualBonus: -1,
    });

    expect(calculation).toEqual({
      success: false,
      errors: {
        annualBonus: "연간 상여금 총액은 0원 이상이어야 합니다.",
      },
    });
  });
});
