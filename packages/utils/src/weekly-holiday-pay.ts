export type WeeklyHolidayPayField =
  "hourlyWage" | "scheduledWorkDays" | "dailyWorkHours" | "actualWorkDays";

export interface WeeklyHolidayPayInput {
  hourlyWage: number;
  scheduledWorkDays: number;
  dailyWorkHours: number;
  actualWorkDays: number;
}

export interface WeeklyHolidayPayResult {
  eligible: boolean;
  ineligibleReasons: string[];
  weeklyScheduledHours: number;
  holidayPayHours: number;
  estimatedHolidayPay: number;
  weeklyBasePay: number;
  weeklyTotalPay: number;
  monthlyReferencePay: number;
}

export type WeeklyHolidayPayCalculation =
  | { success: true; value: WeeklyHolidayPayResult }
  | {
      success: false;
      errors: Partial<Record<WeeklyHolidayPayField | "form", string>>;
    };

const MAX_HOURLY_WAGE = 10_000_000;
const MAX_DAILY_HOURS = 24;

function isFiniteNumber(value: number) {
  return Number.isFinite(value) && !Number.isNaN(value);
}

function validate(input: WeeklyHolidayPayInput) {
  const errors: Partial<Record<WeeklyHolidayPayField | "form", string>> = {};

  if (!isFiniteNumber(input.hourlyWage) || input.hourlyWage <= 0) {
    errors.hourlyWage = "시급은 0원보다 큰 금액으로 입력해 주세요.";
  } else if (
    !Number.isSafeInteger(input.hourlyWage) ||
    input.hourlyWage > MAX_HOURLY_WAGE
  ) {
    errors.hourlyWage = "시급은 1,000만원 이하의 원 단위 금액이어야 합니다.";
  }

  if (
    !Number.isInteger(input.scheduledWorkDays) ||
    input.scheduledWorkDays < 1 ||
    input.scheduledWorkDays > 7
  ) {
    errors.scheduledWorkDays = "소정근로일수는 1일에서 7일 사이여야 합니다.";
  }

  if (
    !isFiniteNumber(input.dailyWorkHours) ||
    input.dailyWorkHours <= 0 ||
    input.dailyWorkHours > MAX_DAILY_HOURS
  ) {
    errors.dailyWorkHours =
      "1일 소정근로시간은 0시간 초과 24시간 이하로 입력해 주세요.";
  }

  if (
    !Number.isInteger(input.actualWorkDays) ||
    input.actualWorkDays < 0 ||
    (Number.isInteger(input.scheduledWorkDays) &&
      input.actualWorkDays > input.scheduledWorkDays)
  ) {
    errors.actualWorkDays =
      "실제 근무일수는 0일부터 소정근로일수 사이여야 합니다.";
  }

  return errors;
}

/**
 * 사용자가 입력한 한 주의 소정근로시간과 개근 여부만으로 계산하는 MVP다.
 * 금액은 모든 산식을 수행한 뒤 표시 단위인 1원에서 Math.round로 반올림한다.
 */
export function calculateWeeklyHolidayPay(
  input: WeeklyHolidayPayInput,
): WeeklyHolidayPayCalculation {
  const errors = validate(input);
  if (Object.keys(errors).length > 0) return { success: false, errors };

  const weeklyScheduledHours = input.scheduledWorkDays * input.dailyWorkHours;
  const ineligibleReasons: string[] = [];

  if (weeklyScheduledHours < 15) {
    ineligibleReasons.push("1주 소정근로시간이 15시간 미만입니다.");
  }
  if (input.actualWorkDays < input.scheduledWorkDays) {
    ineligibleReasons.push("입력한 소정근로일을 모두 근무하지 않았습니다.");
  }

  const eligible = ineligibleReasons.length === 0;
  const holidayPayHours =
    weeklyScheduledHours >= 40 ? 8 : weeklyScheduledHours / 5;
  const estimatedHolidayPay = eligible
    ? Math.round(input.hourlyWage * holidayPayHours)
    : 0;
  const weeklyBasePay = Math.round(
    input.hourlyWage * input.actualWorkDays * input.dailyWorkHours,
  );
  const weeklyTotalPay = weeklyBasePay + estimatedHolidayPay;
  const monthlyReferencePay = Math.round((weeklyTotalPay * 365) / 7 / 12);

  return {
    success: true,
    value: {
      eligible,
      ineligibleReasons,
      weeklyScheduledHours,
      holidayPayHours,
      estimatedHolidayPay,
      weeklyBasePay,
      weeklyTotalPay,
      monthlyReferencePay,
    },
  };
}
