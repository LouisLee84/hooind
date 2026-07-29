const MANWON = 10_000;

export type SalaryField =
  | "annualSalaryManwon"
  | "monthlyNonTaxManwon"
  | "dependents"
  | "childrenUnder20";

export interface SalaryInput {
  annualSalaryManwon: number;
  monthlyNonTaxManwon: number;
  dependents: number;
  childrenUnder20: number;
}

export interface SalaryResult {
  monthlyGrossSalary: number;
  nationalPension: number;
  healthInsurance: number;
  longTermCareInsurance: number;
  employmentInsurance: number;
  incomeTax: number;
  localIncomeTax: number;
  totalDeduction: number;
  annualNetSalary: number;
  monthlyNetSalary: number;
}

export type SalaryCalculation =
  | { success: true; value: SalaryResult }
  | {
      success: false;
      errors: Partial<Record<SalaryField | "form", string>>;
    };

function multiplyRate(amount: number, numerator: number, denominator: number) {
  return Number(
    (BigInt(amount) * BigInt(numerator) + BigInt(denominator / 2)) /
      BigInt(denominator),
  );
}

function calculateEarnedIncomeDeduction(annualSalary: number) {
  if (annualSalary <= 5_000_000) return annualSalary * 0.7;
  if (annualSalary <= 15_000_000)
    return 3_500_000 + (annualSalary - 5_000_000) * 0.4;
  if (annualSalary <= 45_000_000)
    return 7_500_000 + (annualSalary - 15_000_000) * 0.15;
  if (annualSalary <= 100_000_000)
    return 12_000_000 + (annualSalary - 45_000_000) * 0.05;

  return Math.min(20_000_000, 14_750_000 + (annualSalary - 100_000_000) * 0.02);
}

function calculateProgressiveTax(taxBase: number) {
  if (taxBase <= 14_000_000) return taxBase * 0.06;
  if (taxBase <= 50_000_000) return taxBase * 0.15 - 1_260_000;
  if (taxBase <= 88_000_000) return taxBase * 0.24 - 5_760_000;
  if (taxBase <= 150_000_000) return taxBase * 0.35 - 15_440_000;
  if (taxBase <= 300_000_000) return taxBase * 0.38 - 19_940_000;
  if (taxBase <= 500_000_000) return taxBase * 0.4 - 25_940_000;
  if (taxBase <= 1_000_000_000) return taxBase * 0.42 - 35_940_000;
  return taxBase * 0.45 - 65_940_000;
}

function getEarnedIncomeTaxCreditLimit(annualSalary: number) {
  if (annualSalary <= 33_000_000) return 740_000;
  if (annualSalary <= 70_000_000) {
    return Math.max(660_000, 740_000 - (annualSalary - 33_000_000) * 0.008);
  }
  if (annualSalary <= 120_000_000) {
    return Math.max(500_000, 660_000 - (annualSalary - 70_000_000) * 0.005);
  }
  return Math.max(200_000, 500_000 - (annualSalary - 120_000_000) * 0.005);
}

function calculateMonthlyIncomeTax({
  annualSalary,
  annualTaxFree,
  effectiveFamilyCount,
  annualPension,
}: {
  annualSalary: number;
  annualTaxFree: number;
  effectiveFamilyCount: number;
  annualPension: number;
}) {
  const taxableSalary = Math.max(0, annualSalary - annualTaxFree);
  const earnedIncome = Math.max(
    0,
    taxableSalary - calculateEarnedIncomeDeduction(taxableSalary),
  );
  const taxBase = Math.max(
    0,
    earnedIncome - effectiveFamilyCount * 1_500_000 - annualPension,
  );
  const calculatedTax = Math.max(0, calculateProgressiveTax(taxBase));
  const creditBeforeLimit =
    calculatedTax <= 1_300_000
      ? calculatedTax * 0.55
      : 715_000 + (calculatedTax - 1_300_000) * 0.3;
  const credit = Math.min(
    creditBeforeLimit,
    getEarnedIncomeTaxCreditLimit(taxableSalary),
  );

  return Math.round(Math.max(0, calculatedTax - credit) / 12);
}

function validate(input: SalaryInput) {
  const errors: Partial<Record<SalaryField | "form", string>> = {};

  if (
    !Number.isSafeInteger(input.annualSalaryManwon) ||
    input.annualSalaryManwon <= 0
  ) {
    errors.annualSalaryManwon = "연봉은 1만원 이상의 정수로 입력해 주세요.";
  }
  if (
    !Number.isSafeInteger(input.monthlyNonTaxManwon) ||
    input.monthlyNonTaxManwon < 0
  ) {
    errors.monthlyNonTaxManwon =
      "월 비과세 금액은 0만원 이상의 정수로 입력해 주세요.";
  }
  if (!Number.isInteger(input.dependents) || input.dependents < 1) {
    errors.dependents = "부양가족 수는 본인을 포함해 1명 이상이어야 합니다.";
  }
  if (!Number.isInteger(input.childrenUnder20) || input.childrenUnder20 < 0) {
    errors.childrenUnder20 =
      "20세 이하 자녀 수는 0명 이상의 정수로 입력해 주세요.";
  } else if (
    Number.isInteger(input.dependents) &&
    input.childrenUnder20 > Math.max(0, input.dependents - 1)
  ) {
    errors.childrenUnder20 =
      "20세 이하 자녀 수는 본인을 제외한 부양가족 수보다 많을 수 없습니다.";
  }

  const monthlyGross = Math.round((input.annualSalaryManwon * MANWON) / 12);
  if (
    Number.isSafeInteger(input.monthlyNonTaxManwon) &&
    input.monthlyNonTaxManwon * MANWON > monthlyGross
  ) {
    errors.monthlyNonTaxManwon = "월 비과세 금액은 월 급여보다 클 수 없습니다.";
  }

  return errors;
}

/**
 * 2026년 근로자 부담 보험료율을 적용한다. 소득세는 국세청 간이세액표를
 * 그대로 복제하지 않고 근로소득공제·인적공제·근로소득세액공제를 반영한
 * 연간 세액의 월 환산 추정치다.
 */
export function calculateSalary(input: SalaryInput): SalaryCalculation {
  const errors = validate(input);
  if (Object.keys(errors).length > 0) return { success: false, errors };

  const annualSalary = input.annualSalaryManwon * MANWON;
  const monthlyNonTax = input.monthlyNonTaxManwon * MANWON;
  const monthlyGrossSalary = Math.round(annualSalary / 12);
  const insuranceBase = Math.max(0, monthlyGrossSalary - monthlyNonTax);

  const pensionBase =
    insuranceBase === 0
      ? 0
      : Math.min(6_590_000, Math.max(410_000, insuranceBase));
  const nationalPension = multiplyRate(pensionBase, 475, 10_000);
  const healthInsurance = multiplyRate(insuranceBase, 3595, 100_000);
  const longTermCareInsurance = multiplyRate(healthInsurance, 9448, 71_900);
  const employmentInsurance = multiplyRate(insuranceBase, 9, 1_000);
  const incomeTax = calculateMonthlyIncomeTax({
    annualSalary,
    annualTaxFree: monthlyNonTax * 12,
    effectiveFamilyCount: input.dependents + input.childrenUnder20,
    annualPension: nationalPension * 12,
  });
  const localIncomeTax = multiplyRate(incomeTax, 1, 10);
  const totalDeduction =
    nationalPension +
    healthInsurance +
    longTermCareInsurance +
    employmentInsurance +
    incomeTax +
    localIncomeTax;
  const monthlyNetSalary = monthlyGrossSalary - totalDeduction;

  return {
    success: true,
    value: {
      monthlyGrossSalary,
      nationalPension,
      healthInsurance,
      longTermCareInsurance,
      employmentInsurance,
      incomeTax,
      localIncomeTax,
      totalDeduction,
      annualNetSalary: monthlyNetSalary * 12,
      monthlyNetSalary,
    },
  };
}
