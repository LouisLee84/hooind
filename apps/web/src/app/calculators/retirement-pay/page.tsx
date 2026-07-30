import type { FAQItem } from "@hooind/ui";
import { CalculatorLayout } from "@/components/calculator-layout";
import { createPageMetadata, getSiteUrl } from "@/config/site";
import type { Metadata } from "next";
import { RetirementPayCalculator } from "./retirement-pay-calculator";

const title = "퇴직금 계산기 | 예상 퇴직금 간편 계산";
const description =
  "입사일, 퇴직일, 최근 3개월 임금과 상여금·연차수당을 입력해 재직일수와 예상 퇴직금을 계산하세요.";
const canonical = getSiteUrl("/calculators/retirement-pay");

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/calculators/retirement-pay",
});

const faqs: FAQItem[] = [
  {
    question: "퇴직일에는 어떤 날짜를 입력하나요?",
    answer: "마지막으로 근무한 날의 다음 날을 입력합니다.",
  },
  {
    question: "상여금과 연차수당은 어떻게 반영하나요?",
    answer:
      "퇴직 전 1년간 지급된 총액의 3/12을 최근 3개월 임금에 더해 평균임금을 계산합니다.",
  },
  {
    question: "계산 결과가 실제 퇴직금과 달라질 수 있나요?",
    answer:
      "통상임금과의 비교, 평균임금 산정 제외기간, 회사 규정 등에 따라 실제 지급액은 달라질 수 있습니다.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "퇴직금 계산기",
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

export default function RetirementPayPage() {
  return (
    <CalculatorLayout
      calculator={<RetirementPayCalculator />}
      description={description}
      faqs={faqs}
      structuredData={structuredData}
      title="퇴직금 계산기"
    >
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            퇴직금 계산 방법
          </h2>
          <div className="mt-7 space-y-5 text-base leading-8 text-slate-700">
            <p>
              1일 평균임금은 퇴직 전 3개월 임금에 연간 상여금과 연차수당의
              3/12을 더한 뒤, 해당 3개월의 실제 총 일수로 나누어 계산합니다.
            </p>
            <div className="rounded-2xl bg-blue-50 p-5 font-semibold text-blue-950">
              퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365)
            </div>
            <p className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
              이 결과는 간편 추정치이며 평균임금 산정 제외기간 등은 반영하지
              않습니다.
            </p>
          </div>
        </div>
      </section>
    </CalculatorLayout>
  );
}
