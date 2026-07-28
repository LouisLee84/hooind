"use client";

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

const currencyFormatter = new Intl.NumberFormat("ko-KR");

function formatMoneyInput(value: string) {
  const normalized = value.replaceAll(",", "").trim();

  if (normalized === "" || normalized === "-") {
    return normalized;
  }

  if (!/^-?\d+$/.test(normalized)) {
    return null;
  }

  const amount = Number(normalized);

  if (!Number.isSafeInteger(amount)) {
    return value;
  }

  return currencyFormatter.format(amount);
}

function parseMoneyInput(value: string) {
  const normalized = value.replaceAll(",", "").trim();

  if (normalized === "") {
    return Number.NaN;
  }

  return Number(normalized);
}

function formatWon(value: number) {
  return `${currencyFormatter.format(value)}원`;
}

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

const moneyFields: {
  field: Extract<
    RetirementPayField,
    "threeMonthWages" | "annualBonus" | "annualLeaveAllowance"
  >;
  label: string;
  description: string;
}[] = [
  {
    field: "threeMonthWages",
    label: "퇴직 전 3개월 임금 총액",
    description: "세전 기본급과 각종 수당을 합산해 주세요.",
  },
  {
    field: "annualBonus",
    label: "퇴직 전 1년간 상여금 총액",
    description: "없다면 0원을 입력해 주세요.",
  },
  {
    field: "annualLeaveAllowance",
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

  function updateMoneyField(field: RetirementPayField, value: string) {
    const formatted = formatMoneyInput(value);

    if (formatted !== null) {
      updateField(field, formatted);
    }
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

  function handleReset() {
    setForm(initialForm);
    setCalculation(null);
  }

  return (
    <section
      aria-labelledby="calculator-title"
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
    >
      <div className="mb-7">
        <p className="text-sm font-semibold text-blue-600">간편 계산</p>
        <h2
          id="calculator-title"
          className="mt-2 text-2xl font-bold tracking-tight text-slate-950"
        >
          퇴직금 입력 정보
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          모든 금액은 세전 기준으로 입력해 주세요.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <DateField
            description="근로계약을 시작한 날짜"
            error={errors.employmentDate}
            field="employmentDate"
            label="입사일"
            onChange={updateField}
            value={form.employmentDate}
          />
          <DateField
            description="마지막 근무일의 다음 날"
            error={errors.retirementDate}
            field="retirementDate"
            label="퇴직일"
            onChange={updateField}
            value={form.retirementDate}
          />
        </div>

        <div className="mt-5 grid gap-5">
          {moneyFields.map(({ field, label, description }) => (
            <div key={field}>
              <label
                className="block text-sm font-semibold text-slate-800"
                htmlFor={field}
              >
                {label}
              </label>
              <div className="relative mt-2">
                <input
                  aria-describedby={`${field}-description ${field}-error`}
                  aria-invalid={Boolean(errors[field])}
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 pr-12 text-right text-base text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  id={field}
                  inputMode="numeric"
                  name={field}
                  onChange={(event) =>
                    updateMoneyField(field, event.target.value)
                  }
                  placeholder="0"
                  required
                  value={form[field]}
                />
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-500">
                  원
                </span>
              </div>
              <p
                className="mt-1.5 text-xs leading-5 text-slate-500"
                id={`${field}-description`}
              >
                {description}
              </p>
              <FieldError id={`${field}-error`} message={errors[field]} />
            </div>
          ))}
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            className="h-12 rounded-xl border border-slate-300 bg-white font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
            onClick={handleReset}
            type="button"
          >
            초기화
          </button>
          <button
            className="h-12 rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
            type="submit"
          >
            계산하기
          </button>
        </div>
      </form>

      <div aria-live="polite">
        {result && (
          <section
            aria-labelledby="result-title"
            className="mt-8 rounded-2xl bg-slate-950 p-5 text-white sm:p-7"
          >
            <p className="text-sm font-semibold text-blue-300">계산 결과</p>
            <h3 id="result-title" className="mt-2 text-xl font-bold">
              예상 퇴직금
            </h3>
            <p
              className="mt-3 break-words text-3xl font-bold tracking-tight sm:text-4xl"
              data-testid="estimated-retirement-pay"
            >
              {formatWon(result.estimatedRetirementPay)}
            </p>

            <dl className="mt-6 grid gap-3 border-t border-slate-700 pt-5 sm:grid-cols-3">
              <ResultItem
                label="재직일수"
                value={`${currencyFormatter.format(result.serviceDays)}일`}
              />
              <ResultItem
                label="계속근로기간"
                value={formatServicePeriod(result.servicePeriod)}
              />
              <ResultItem
                label="1일 평균임금"
                value={formatWon(result.averageDailyWage)}
              />
            </dl>

            <p className="mt-5 rounded-xl bg-slate-800 p-4 text-sm leading-6 text-slate-200">
              실제 지급액은 회사 규정과 개별 근로조건에 따라 달라질 수 있습니다.
            </p>
          </section>
        )}
      </div>
    </section>
  );
}

function DateField({
  description,
  error,
  field,
  label,
  onChange,
  value,
}: {
  description: string;
  error?: string;
  field: Extract<RetirementPayField, "employmentDate" | "retirementDate">;
  label: string;
  onChange: (field: RetirementPayField, value: string) => void;
  value: string;
}) {
  return (
    <div>
      <label
        className="block text-sm font-semibold text-slate-800"
        htmlFor={field}
      >
        {label}
      </label>
      <input
        aria-describedby={`${field}-description ${field}-error`}
        aria-invalid={Boolean(error)}
        className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        id={field}
        name={field}
        onChange={(event) => onChange(field, event.target.value)}
        required
        type="date"
        value={value}
      />
      <p
        className="mt-1.5 text-xs leading-5 text-slate-500"
        id={`${field}-description`}
      >
        {description}
      </p>
      <FieldError id={`${field}-error`} message={error} />
    </div>
  );
}

function FieldError({
  id,
  message,
}: {
  id: string;
  message: string | undefined;
}) {
  return (
    <p className="mt-1.5 text-sm font-medium text-red-600" id={id}>
      {message}
    </p>
  );
}

function ResultItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-slate-400">{label}</dt>
      <dd className="mt-1 font-semibold text-white">{value}</dd>
    </div>
  );
}
