"use client";

import {
  Button,
  DateInput,
  formatWon,
  MoneyInput,
  parseMoneyInput,
  ResultCard,
} from "@hooind/ui";
import {
  calculateRetirementPay,
  type RetirementPayCalculation,
  type RetirementPayField,
} from "@hooind/utils";
import { type FormEvent, useState } from "react";

type FormState = Record<RetirementPayField, string>;

const initialForm: FormState = {
  employmentDate: "",
  retirementDate: "",
  threeMonthWages: "",
  annualBonus: "",
  annualLeaveAllowance: "",
};

const numberFormatter = new Intl.NumberFormat("ko-KR");

function formatServicePeriod(period: {
  years: number;
  months: number;
  days: number;
}) {
  const parts = [
    period.years > 0 ? `${period.years}년` : "",
    period.months > 0 ? `${period.months}개월` : "",
    period.days > 0 ? `${period.days}일` : "",
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" ") : "0일";
}

const moneyFields = [
  {
    field: "threeMonthWages" as const,
    label: "퇴직 전 3개월 임금 총액",
    description: "세전 기본급과 각종 수당을 합산해 주세요.",
  },
  {
    field: "annualBonus" as const,
    label: "퇴직 전 1년간 상여금 총액",
    description: "없다면 0원을 입력해 주세요.",
  },
  {
    field: "annualLeaveAllowance" as const,
    label: "퇴직 전 1년간 연차수당 총액",
    description: "없다면 0원을 입력해 주세요.",
  },
];

export function RetirementPayCalculator() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [calculation, setCalculation] =
    useState<RetirementPayCalculation | null>(null);
  const errors = calculation && !calculation.success ? calculation.errors : {};
  const result = calculation && calculation.success ? calculation.value : null;

  function updateField(field: RetirementPayField, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setCalculation(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCalculation(
      calculateRetirementPay({
        employmentDate: form.employmentDate,
        retirementDate: form.retirementDate,
        threeMonthWages: parseMoneyInput(form.threeMonthWages),
        annualBonus: parseMoneyInput(form.annualBonus),
        annualLeaveAllowance: parseMoneyInput(form.annualLeaveAllowance),
      }),
    );
  }

  return (
    <section
      aria-labelledby="calculator-title"
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
    >
      <div className="mb-7">
        <p className="text-sm font-semibold text-blue-600">간편 계산</p>
        <h2 id="calculator-title" className="mt-2 text-2xl font-bold">
          퇴직금 입력 정보
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          모든 금액은 세전 기준으로 입력해 주세요.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <DateInput
            description="근로계약을 시작한 날짜"
            error={errors.employmentDate}
            id="employmentDate"
            label="입사일"
            onChange={(value) => updateField("employmentDate", value)}
            value={form.employmentDate}
          />
          <DateInput
            description="마지막 근무일의 다음 날"
            error={errors.retirementDate}
            id="retirementDate"
            label="퇴직일"
            onChange={(value) => updateField("retirementDate", value)}
            value={form.retirementDate}
          />
        </div>

        <div className="mt-5 grid gap-5">
          {moneyFields.map(({ field, label, description }) => (
            <MoneyInput
              description={description}
              error={errors[field]}
              id={field}
              key={field}
              label={label}
              onChange={(value) => updateField(field, value)}
              value={form[field]}
            />
          ))}
        </div>

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
                label: "재직일수",
                value: `${numberFormatter.format(result.serviceDays)}일`,
              },
              {
                label: "계속근로기간",
                value: formatServicePeriod(result.servicePeriod),
              },
              {
                label: "1일 평균임금",
                value: formatWon(result.averageDailyWage),
              },
            ]}
            notice="실제 지급액은 회사 규정과 개별 근로조건에 따라 달라질 수 있습니다."
            primaryLabel="예상 퇴직금"
            primaryTestId="estimated-retirement-pay"
            primaryValue={formatWon(result.estimatedRetirementPay)}
          />
        )}
      </div>
    </section>
  );
}
