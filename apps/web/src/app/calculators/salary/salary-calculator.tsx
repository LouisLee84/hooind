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
  calculateSalary,
  type SalaryCalculation,
  type SalaryField,
} from "@hooind/utils";
import { type FormEvent, useState } from "react";

type FormState = Record<SalaryField, string>;

const initialForm: FormState = {
  annualSalaryManwon: "",
  monthlyNonTaxManwon: "",
  dependents: "1",
  childrenUnder20: "0",
};

export function SalaryCalculator() {
  const [form, setForm] = useState(initialForm);
  const [calculation, setCalculation] = useState<SalaryCalculation | null>(
    null,
  );
  const errors = calculation && !calculation.success ? calculation.errors : {};
  const result = calculation && calculation.success ? calculation.value : null;

  function updateField(field: SalaryField, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setCalculation(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nonTax = form.monthlyNonTaxManwon.trim();
    setCalculation(
      calculateSalary({
        annualSalaryManwon: parseMoneyInput(form.annualSalaryManwon),
        monthlyNonTaxManwon:
          nonTax === "" ? 0 : parseMoneyInput(form.monthlyNonTaxManwon),
        dependents: Number(form.dependents),
        childrenUnder20: Number(form.childrenUnder20),
      }),
    );
  }

  return (
    <section
      aria-labelledby="salary-calculator-title"
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
    >
      <div className="mb-7">
        <p className="text-sm font-semibold text-blue-600">2026년 기준</p>
        <h2 id="salary-calculator-title" className="mt-2 text-2xl font-bold">
          연봉 입력 정보
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          본인을 포함한 부양가족 수와 월 비과세 금액을 입력해 주세요.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit}>
        <div className="grid gap-5">
          <MoneyInput
            description="계약서상의 세전 연봉을 만원 단위로 입력하세요."
            error={errors.annualSalaryManwon}
            id="annualSalaryManwon"
            label="연봉"
            onChange={(value) => updateField("annualSalaryManwon", value)}
            unit="만원"
            value={form.annualSalaryManwon}
          />
          <MoneyInput
            description="식대 등 매월 지급되는 비과세 금액이며, 없으면 비워 두세요."
            error={errors.monthlyNonTaxManwon}
            id="monthlyNonTaxManwon"
            label="월 비과세 금액 (선택)"
            onChange={(value) => updateField("monthlyNonTaxManwon", value)}
            unit="만원"
            value={form.monthlyNonTaxManwon}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberInput
              description="본인을 포함한 기본공제 대상자 수"
              error={errors.dependents}
              id="dependents"
              label="부양가족 수"
              min={1}
              onChange={(value) => updateField("dependents", value)}
              value={form.dependents}
            />
            <NumberInput
              description="부양가족 중 20세 이하 자녀 수"
              error={errors.childrenUnder20}
              id="childrenUnder20"
              label="20세 이하 자녀 수"
              min={0}
              onChange={(value) => updateField("childrenUnder20", value)}
              value={form.childrenUnder20}
            />
          </div>
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
              { label: "국민연금", value: formatWon(result.nationalPension) },
              { label: "건강보험", value: formatWon(result.healthInsurance) },
              {
                label: "장기요양보험",
                value: formatWon(result.longTermCareInsurance),
              },
              {
                label: "고용보험",
                value: formatWon(result.employmentInsurance),
              },
              {
                label: "소득세 (간이 계산)",
                value: formatWon(result.incomeTax),
              },
              {
                label: "지방소득세",
                value: formatWon(result.localIncomeTax),
              },
              { label: "총 공제액", value: formatWon(result.totalDeduction) },
              {
                label: "연 실수령액",
                value: formatWon(result.annualNetSalary),
              },
            ]}
            notice="소득세는 간이 추정치입니다. 실제 공제액은 급여 구성, 공제 대상과 회사의 원천징수 방식에 따라 달라질 수 있습니다."
            primaryLabel="예상 월 실수령액"
            primaryTestId="monthly-net-salary"
            primaryValue={formatWon(result.monthlyNetSalary)}
          />
        )}
      </div>
    </section>
  );
}
