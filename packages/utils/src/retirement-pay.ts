const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export type RetirementPayField =
  | "employmentDate"
  | "retirementDate"
  | "threeMonthWages"
  | "annualBonus"
  | "annualLeaveAllowance";

export interface RetirementPayInput {
  employmentDate: string;
  retirementDate: string;
  threeMonthWages: number;
  annualBonus: number;
  annualLeaveAllowance: number;
}

export interface RetirementPayResult {
  serviceDays: number;
  servicePeriod: {
    years: number;
    months: number;
    days: number;
  };
  averageWagePeriodDays: number;
  averageDailyWage: number;
  estimatedRetirementPay: number;
}

export type RetirementPayCalculation =
  | {
      success: true;
      value: RetirementPayResult;
    }
  | {
      success: false;
      errors: Partial<Record<RetirementPayField | "form", string>>;
    };

function parseDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

function daysInMonth(year: number, monthIndex: number) {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

function addCalendarMonths(date: Date, months: number) {
  const absoluteMonth =
    date.getUTCFullYear() * 12 + date.getUTCMonth() + months;
  const targetYear = Math.floor(absoluteMonth / 12);
  const targetMonth = ((absoluteMonth % 12) + 12) % 12;
  const targetDay = Math.min(
    date.getUTCDate(),
    daysInMonth(targetYear, targetMonth),
  );

  return new Date(Date.UTC(targetYear, targetMonth, targetDay));
}

function addCalendarYears(date: Date, years: number) {
  const targetYear = date.getUTCFullYear() + years;
  const targetMonth = date.getUTCMonth();
  const targetDay = Math.min(
    date.getUTCDate(),
    daysInMonth(targetYear, targetMonth),
  );

  return new Date(Date.UTC(targetYear, targetMonth, targetDay));
}

function differenceInDays(start: Date, end: Date) {
  return Math.round((end.getTime() - start.getTime()) / MILLISECONDS_PER_DAY);
}

function getServicePeriod(start: Date, end: Date) {
  let years = end.getUTCFullYear() - start.getUTCFullYear();
  let cursor = addCalendarYears(start, years);

  if (cursor > end) {
    years -= 1;
    cursor = addCalendarYears(start, years);
  }

  let months =
    (end.getUTCFullYear() - cursor.getUTCFullYear()) * 12 +
    end.getUTCMonth() -
    cursor.getUTCMonth();
  let monthCursor = addCalendarMonths(cursor, months);

  if (monthCursor > end) {
    months -= 1;
    monthCursor = addCalendarMonths(cursor, months);
  }

  return {
    years,
    months,
    days: differenceInDays(monthCursor, end),
  };
}

function divideAndRound(numerator: bigint, denominator: bigint) {
  return Number((numerator + denominator / BigInt(2)) / denominator);
}

function validateMoney(
  value: number,
  field: RetirementPayField,
  label: string,
  errors: Partial<Record<RetirementPayField | "form", string>>,
) {
  if (!Number.isFinite(value) || !Number.isSafeInteger(value)) {
    errors[field] = `${label}은 원 단위의 올바른 금액으로 입력해 주세요.`;
  } else if (value < 0) {
    errors[field] = `${label}은 0원 이상이어야 합니다.`;
  }
}

/**
 * 퇴직일은 마지막 근무일의 다음 날로 보고 재직일수와 직전 3개월의
 * 역일수를 계산한다. 금액 산식은 BigInt 분수로 처리한 뒤 원 단위에서
 * 반올림해 중간 부동소수점 오차를 만들지 않는다.
 */
export function calculateRetirementPay(
  input: RetirementPayInput,
): RetirementPayCalculation {
  const errors: Partial<Record<RetirementPayField | "form", string>> = {};
  const employmentDate = parseDate(input.employmentDate);
  const retirementDate = parseDate(input.retirementDate);

  if (!employmentDate) {
    errors.employmentDate = "올바른 입사일을 입력해 주세요.";
  }

  if (!retirementDate) {
    errors.retirementDate = "올바른 퇴직일을 입력해 주세요.";
  }

  validateMoney(
    input.threeMonthWages,
    "threeMonthWages",
    "퇴직 전 3개월 임금 총액",
    errors,
  );
  validateMoney(input.annualBonus, "annualBonus", "연간 상여금 총액", errors);
  validateMoney(
    input.annualLeaveAllowance,
    "annualLeaveAllowance",
    "연간 연차수당 총액",
    errors,
  );

  if (employmentDate && retirementDate && employmentDate >= retirementDate) {
    errors.retirementDate = "퇴직일은 입사일보다 늦어야 합니다.";
  }

  if (Object.keys(errors).length > 0 || !employmentDate || !retirementDate) {
    return { success: false, errors };
  }

  const serviceDays = differenceInDays(employmentDate, retirementDate);
  const averageWagePeriodStart = addCalendarMonths(retirementDate, -3);
  const averageWagePeriodDays = differenceInDays(
    averageWagePeriodStart,
    retirementDate,
  );

  const adjustedWagesInQuarterWon =
    BigInt(input.threeMonthWages) * BigInt(4) +
    BigInt(input.annualBonus) +
    BigInt(input.annualLeaveAllowance);
  const averageWageDenominator = BigInt(averageWagePeriodDays) * BigInt(4);
  const averageDailyWage = divideAndRound(
    adjustedWagesInQuarterWon,
    averageWageDenominator,
  );
  const estimatedRetirementPay = divideAndRound(
    adjustedWagesInQuarterWon * BigInt(30) * BigInt(serviceDays),
    averageWageDenominator * BigInt(365),
  );

  return {
    success: true,
    value: {
      serviceDays,
      servicePeriod: getServicePeriod(employmentDate, retirementDate),
      averageWagePeriodDays,
      averageDailyWage,
      estimatedRetirementPay,
    },
  };
}
