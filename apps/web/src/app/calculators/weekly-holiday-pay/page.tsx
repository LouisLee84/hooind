import { CalculatorLayout, type FAQItem } from "@hooind/ui";
import { createPageMetadata, getSiteUrl } from "@/config/site";
import type { Metadata } from "next";
import { WeeklyHolidayPayCalculator } from "./weekly-holiday-pay-calculator";

const canonical = getSiteUrl("/calculators/weekly-holiday-pay");
const title = "주휴수당 계산기 | 예상 주휴수당 간편 계산";
const description =
  "시급, 소정근로일수와 근로시간, 실제 근무일수를 입력해 주휴수당 지급 예상 여부와 주급·월 환산 참고 금액을 계산하세요.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/calculators/weekly-holiday-pay",
});

const faqs: FAQItem[] = [
  {
    question: "주휴수당 지급 조건은 무엇인가요?",
    answer:
      "일반적으로 4주 평균 1주 소정근로시간이 15시간 이상이고 한 주의 소정근로일을 개근한 경우를 기준으로 판단합니다.",
  },
  {
    question: "주 15시간은 어떻게 계산하나요?",
    answer:
      "근로계약에서 정한 한 주의 소정근로일수에 1일 소정근로시간을 곱해 확인합니다. 불규칙 근무는 4주 평균 등 별도 확인이 필요할 수 있습니다.",
  },
  {
    question: "결근하면 주휴수당을 받을 수 없나요?",
    answer:
      "이 계산기는 실제 근무일수가 소정근로일수보다 적으면 개근하지 않은 것으로 간주합니다. 휴일·휴가·결근 사유에 따른 실제 판단은 달라질 수 있습니다.",
  },
  {
    question: "단시간 근로자의 주휴수당은 어떻게 계산하나요?",
    answer:
      "MVP에서는 주 40시간 미만이면 시급에 1주 소정근로시간을 5로 나눈 시간을 곱해 예상합니다.",
  },
  {
    question: "계산 결과와 실제 지급액이 다른 이유는 무엇인가요?",
    answer:
      "근로계약, 4주 평균 소정근로시간, 근로관계 유지기간, 결근 사유와 사업장 운영 방식 등 개별 조건이 다르기 때문입니다.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "주휴수당 계산기",
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

export default function WeeklyHolidayPayPage() {
  return (
    <CalculatorLayout
      calculator={<WeeklyHolidayPayCalculator />}
      description={description}
      faqs={faqs}
      structuredData={structuredData}
      title="주휴수당 계산기"
    >
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            주휴수당 계산 기준
          </h2>
          <div className="mt-7 space-y-5 text-base leading-8 text-slate-700">
            <p>
              이 계산기는 1주 소정근로시간이 15시간 이상이고 입력한 소정근로일을
              모두 근무한 경우를 지급 대상으로 예상합니다.
            </p>
            <div className="space-y-2 rounded-2xl bg-blue-50 p-5 font-semibold text-blue-950">
              <p>주 40시간 미만: 시급 × (1주 소정근로시간 ÷ 5)</p>
              <p>주 40시간 이상: 시급 × 8시간</p>
            </div>
            <p>
              주급 합계는 실제 근무시간에 따른 기본 주급과 예상 주휴수당을
              더합니다. 월 환산 참고 금액은 주급 × 365 ÷ 7 ÷ 12로 계산해 원
              단위에서 반올림합니다.
            </p>
            <p className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
              복잡한 교대근무, 4주 미만 근무, 휴가·휴업, 퇴직 시점과 개별
              단체협약은 반영하지 않습니다. 실제 지급 여부는 고용노동부 또는
              노무 전문가에게 확인하세요.
            </p>
            <p className="text-sm text-slate-500">
              기준 참고:{" "}
              <a
                className="font-medium text-blue-700 underline underline-offset-4"
                href="https://1350.moel.go.kr/rtmview.do?id=1000059852"
                rel="noreferrer"
                target="_blank"
              >
                고용노동부 1350 상담
              </a>
              ,{" "}
              <a
                className="font-medium text-blue-700 underline underline-offset-4"
                href="https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=232199"
                rel="noreferrer"
                target="_blank"
              >
                근로기준법
              </a>
            </p>
          </div>
        </div>
      </section>
    </CalculatorLayout>
  );
}
