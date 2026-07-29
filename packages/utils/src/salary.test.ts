import { describe, expect, it } from "vitest";
import { calculateSalary } from "./salary";

describe("calculateSalary", () => {
  it("calculates monthly deductions and take-home pay", () => {
    const calculation = calculateSalary({
      annualSalaryManwon: 6_000,
      monthlyNonTaxManwon: 20,
      dependents: 1,
      childrenUnder20: 0,
    });

    expect(calculation.success).toBe(true);
    if (!calculation.success) return;

    expect(calculation.value).toMatchObject({
      monthlyGrossSalary: 5_000_000,
      nationalPension: 228_000,
      healthInsurance: 172_560,
      employmentInsurance: 43_200,
    });
    expect(calculation.value.totalDeduction).toBeGreaterThan(0);
    expect(calculation.value.monthlyNetSalary).toBeLessThan(5_000_000);
  });

  it("reduces estimated income tax for dependents and children", () => {
    const single = calculateSalary({
      annualSalaryManwon: 8_000,
      monthlyNonTaxManwon: 20,
      dependents: 1,
      childrenUnder20: 0,
    });
    const family = calculateSalary({
      annualSalaryManwon: 8_000,
      monthlyNonTaxManwon: 20,
      dependents: 4,
      childrenUnder20: 2,
    });

    expect(single.success && family.success).toBe(true);
    if (!single.success || !family.success) return;
    expect(family.value.incomeTax).toBeLessThan(single.value.incomeTax);
  });

  it("rejects negative amounts and invalid family counts", () => {
    const calculation = calculateSalary({
      annualSalaryManwon: -1,
      monthlyNonTaxManwon: -1,
      dependents: 1,
      childrenUnder20: 2,
    });

    expect(calculation.success).toBe(false);
    if (calculation.success) return;
    expect(calculation.errors.annualSalaryManwon).toBeDefined();
    expect(calculation.errors.monthlyNonTaxManwon).toBeDefined();
    expect(calculation.errors.childrenUnder20).toBeDefined();
  });
});
