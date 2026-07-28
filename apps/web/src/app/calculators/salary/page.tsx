import { CalculatorLayout, type FAQItem } from "@hooind/ui";
import type { Metadata } from "next";
import { SalaryCalculator } from "./salary-calculator";

const canonical = "https://hooind.com/calculators/salary";
const title = "연봉 실수령액 계산기 | 2026 월급 공제액 계산";
const description =
  "연봉과 비과세 금액, 부양가족 수를 입력해 2026년 4대보험과 예상 세금, 월·연 실수령액을 간편하게 계산하세요.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    locale: "ko_KR",
    type: "website",
    url: canonical,
  },
};

const faqs: FAQItem[] = [
  {
    question: "연봉에는 퇴직금도 포함하나요?",
    answer:
      "일반적으로 근로계약서의 세전 연봉을 입력하며, 별도로 지급되는 퇴직금은 포함하지 않습니다.",
  },
  {
    question: "비과세 금액은 연간 금액인가요?",
    answer:
      "아니요. 매월 지급되는 식대 등 월 비과세 금액을 만원 단위로 입력합니다.",
  },
  {
    question: "부양가족 수에 본인을 포함하나요?",
    answer:
      "네. 소득세 간이 계산을 위해 본인을 포함한 기본공제 대상자 수를 입력합니다.",
  },
  {
    question: "실제 급여명세서와 결과가 다른 이유는 무엇인가요?",
    answer:
      "성과급과 각종 수당, 소득세 원천징수 방식, 보험료 정산 등 개인별 조건이 달라 추정 결과와 차이가 날 수 있습니다.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "연봉 실수령액 계산기",
      url: canonical,
      description,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "ko-KR",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function SalaryPage() {
  return (
    <CalculatorLayout
      calculator={<SalaryCalculator />}
      description={description}
      faqs={faqs}
      structuredData={structuredData}
      title="연봉 실수령액 계산기"
    >
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            연봉 실수령액 계산 기준
          </h2>
          <div className="mt-7 space-y-5 text-base leading-8 text-slate-700">
            <p>
              월 과세 급여를 기준으로 국민연금, 건강보험, 장기요양보험,
              고용보험을 계산하고 부양가족 정보를 반영한 소득세 추정액을
              공제합니다.
            </p>
            <div className="rounded-2xl bg-blue-50 p-5 font-semibold text-blue-950">
              월 실수령액 = 월 세전 급여 − 4대보험 근로자 부담액 − 예상 세금
            </div>
            <p>
              국민연금은 2026년 근로자 부담률 4.75%와 기준소득월액 상·하한을,
              건강보험은 3.595%, 고용보험은 0.9%를 적용했습니다.
            </p>
            <p className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
              소득세는 근로소득공제와 인적공제 등을 반영한 간이 추정치이며,
              국세청 간이세액표에 따른 실제 원천징수액과 다를 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </CalculatorLayout>
  );
}
