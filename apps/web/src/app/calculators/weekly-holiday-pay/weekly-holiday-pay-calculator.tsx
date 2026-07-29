"use client";

import {
  Button,
  formatWon,
  MoneyInput,
  NumberInput,
  parseMoneyInput,
  ResultCard,
} from "@hooind/ui";
import {
  calculateWeeklyHolidayPay,
  type WeeklyHolidayPayCalculation,
  type WeeklyHolidayPayField,
} from "@hooind/utils";
import { type FormEvent, useState } from "react";

type FormState = Record<WeeklyHolidayPayField, string>;

const initialForm: FormState = {
  hourlyWage: "",
  scheduledWorkDays: "5",
  dailyWorkHours: "4",
  actualWorkDays: "5",
};

const hourFormatter = new Intl.NumberFormat("ko-KR", {
  maximumFractionDigits: 2,
});

export function WeeklyHolidayPayCalculator() {
  const [form, setForm] = useState(initialForm);
  const [calculation, setCalculation] =
    useState<WeeklyHolidayPayCalculation | null>(null);
  const errors = calculation && !calculation.success ? calculation.errors : {};
  const result = calculation && calculation.success ? calculation.value : null;
  const automaticWeeklyHours =
    Number(form.scheduledWorkDays) * Number(form.dailyWorkHours);

  function updateField(field: WeeklyHolidayPayField, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setCalculation(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCalculation(
      calculateWeeklyHolidayPay({
        hourlyWage: parseMoneyInput(form.hourlyWage),
        scheduledWorkDays: Number(form.scheduledWorkDays),
        dailyWorkHours: Number(form.dailyWorkHours),
        actualWorkDays: Number(form.actualWorkDays),
      }),
    );
  }

  const reason =
    result && !result.eligible
      ? result.ineligibleReasons.join(" ")
      : "입력 기준으로 주휴수당 지급 대상일 가능성이 있습니다.";

  return (
    <section
      aria-labelledby="weekly-holiday-pay-calculator-title"
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
    >
      <div className="mb-7">
        <p className="text-sm font-semibold text-blue-600">간편 예상 계산</p>
        <h2
          className="mt-2 text-2xl font-bold"
          id="weekly-holiday-pay-calculator-title"
        >
          주휴수당 입력 정보
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          근로계약에서 정한 한 주의 근로일과 시간을 입력해 주세요.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit}>
        <div className="grid gap-5">
          <MoneyInput
            description="근로계약에 따른 시간당 임금을 원 단위로 입력하세요."
            error={errors.hourlyWage}
            id="hourlyWage"
            label="시급"
            onChange={(value) => updateField("hourlyWage", value)}
            value={form.hourlyWage}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberInput
              description="한 주에 근무하기로 정한 일수"
              error={errors.scheduledWorkDays}
              id="scheduledWorkDays"
              label="1주 소정근로일수"
              max={7}
              min={1}
              onChange={(value) => updateField("scheduledWorkDays", value)}
              value={form.scheduledWorkDays}
            />
            <NumberInput
              description="휴게시간을 제외한 하루 근로시간"
              error={errors.dailyWorkHours}
              id="dailyWorkHours"
              label="1일 소정근로시간"
              max={24}
              min={0.01}
              onChange={(value) => updateField("dailyWorkHours", value)}
              step={0.25}
              value={form.dailyWorkHours}
            />
          </div>
          <NumberInput
            description="해당 주에 실제로 근무한 소정근로일수"
            error={errors.actualWorkDays}
            id="actualWorkDays"
            label="실제 근무일수"
            max={7}
            min={0}
            onChange={(value) => updateField("actualWorkDays", value)}
            value={form.actualWorkDays}
          />
        </div>

        <p
          aria-live="polite"
          className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-950"
        >
          자동 계산된 1주 소정근로시간:{" "}
          {Number.isFinite(automaticWeeklyHours)
            ? `${hourFormatter.format(automaticWeeklyHours)}시간`
            : "입력 확인 필요"}
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <Button
            onClick={() => {
              setForm(initialForm);
              setCalculation(null);
            }}
            type="button"
            variant="secondary"
          >
            초기화
          </Button>
          <Button type="submit">계산하기</Button>
        </div>
      </form>

      <div aria-live="polite">
        {result && (
          <ResultCard
            items={[
              {
                label: "주휴수당 지급 예상 여부",
                value: result.eligible ? "지급 대상 예상" : "지급 대상 아님",
              },
              {
                label: "1주 소정근로시간",
                value: `${hourFormatter.format(result.weeklyScheduledHours)}시간`,
              },
              {
                label: "예상 주휴수당",
                value: formatWon(result.estimatedHolidayPay),
              },
              {
                label: "주급 합계",
                value: formatWon(result.weeklyTotalPay),
              },
              {
                label: "월 환산 참고 금액",
                value: formatWon(result.monthlyReferencePay),
              },
              {
                label: "판정 사유",
                value: reason,
              },
            ]}
            notice="이 결과는 입력값을 바탕으로 한 예상값입니다. 실제 지급 여부와 금액은 근로계약, 4주 평균 근로시간, 결근 사유와 근무 형태 등에 따라 달라질 수 있습니다."
            primaryLabel="예상 주휴수당"
            primaryTestId="estimated-weekly-holiday-pay"
            primaryValue={formatWon(result.estimatedHolidayPay)}
          />
        )}
      </div>
    </section>
  );
}
