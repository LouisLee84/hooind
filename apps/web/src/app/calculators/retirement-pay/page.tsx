import type { Metadata } from "next";
import Link from "next/link";
import { RetirementPayCalculator } from "./retirement-pay-calculator";

const title = "퇴직금 계산기 | 예상 퇴직금 간편 계산";
const description =
  "입사일, 퇴직일, 최근 3개월 임금과 상여금·연차수당을 입력해 재직일수, 1일 평균임금과 예상 퇴직금을 계산하세요.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://hooind.com/calculators/retirement-pay",
  },
  openGraph: {
    title,
    description,
    locale: "ko_KR",
    type: "website",
    url: "https://hooind.com/calculators/retirement-pay",
  },
};

const faqs = [
  {
    question: "퇴직일에는 어떤 날짜를 입력하나요?",
    answer:
      "마지막으로 근무한 날의 다음 날을 입력합니다. 예를 들어 12월 31일까지 근무했다면 퇴직일은 다음 해 1월 1일입니다.",
  },
  {
    question: "상여금과 연차수당은 어떻게 반영되나요?",
    answer:
      "퇴직 전 1년간 지급된 상여금과 연차수당 총액의 3/12을 최근 3개월 임금 총액에 더해 1일 평균임금을 계산합니다.",
  },
  {
    question: "계산 결과가 실제 퇴직금과 달라질 수 있나요?",
    answer:
      "네. 통상임금과의 비교, 평균임금 산정 제외기간, 퇴직금 중간정산, 근로시간, 회사 규정과 세금 등에 따라 실제 지급액이 달라질 수 있습니다.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "퇴직금 계산기",
      url: "https://hooind.com/calculators/retirement-pay",
      description,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "ko-KR",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "KRW",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ],
};

export default function RetirementPayPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link className="text-lg font-bold tracking-tight" href="/">
            Hooind
          </Link>
          <span className="text-sm font-medium text-slate-500">
            Hooind Tools
          </span>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-5 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-16">
          <div className="max-w-3xl">
            <p className="font-semibold text-blue-600">무료 간편 계산기</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              퇴직금 계산기
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              입사일과 퇴직일, 임금 정보를 입력하면 재직일수와 1일 평균임금을
              반영한 예상 퇴직금을 확인할 수 있습니다.
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:items-start">
          <RetirementPayCalculator />

          <aside className="rounded-3xl border border-dashed border-slate-300 bg-slate-100 p-5 text-center lg:sticky lg:top-5">
            <p className="text-xs font-semibold tracking-widest text-slate-500">
              AD
            </p>
            <p className="mt-2 text-sm text-slate-500">
              광고 영역이 여기에 배치됩니다.
            </p>
          </aside>
        </div>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              퇴직금 계산 방법
            </h2>
            <div className="mt-7 space-y-5 text-base leading-8 text-slate-700">
              <p>
                1일 평균임금은 퇴직일 이전 3개월의 임금 총액에 연간 상여금과
                연차수당의 3/12을 더한 뒤, 해당 3개월의 실제 총일수로 나눠
                계산합니다.
              </p>
              <div className="overflow-x-auto rounded-2xl bg-blue-50 p-5 font-semibold text-blue-950">
                퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365)
              </div>
              <p>
                이 계산기는 입력한 퇴직일을 마지막 근무일의 다음 날로 봅니다.
                계산 과정의 금액은 분수 단위로 유지하고 최종 표시 시 원 단위로
                반올림합니다.
              </p>
              <p className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
                이 결과는 간편 추정치입니다. 1일 통상임금이 평균임금보다 큰
                경우, 평균임금 산정 제외기간이 있는 경우 등은 반영하지 않습니다.
              </p>
              <p className="text-sm text-slate-500">
                기준 참고:{" "}
                <a
                  className="font-medium text-blue-700 underline underline-offset-4"
                  href="https://www.moel.go.kr/retirementpayCal.do"
                  rel="noreferrer"
                  target="_blank"
                >
                  고용노동부 퇴직금 계산기
                </a>
                ,{" "}
                <a
                  className="font-medium text-blue-700 underline underline-offset-4"
                  href="https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=JO&joNo=001200000&languageType=KO&lsNm=%EA%B7%BC%EB%A1%9C%EC%9E%90%ED%87%B4%EC%A7%81%EA%B8%89%EC%97%AC+%EB%B3%B4%EC%9E%A5%EB%B2%95&paras=1"
                  rel="noreferrer"
                  target="_blank"
                >
                  근로자퇴직급여 보장법
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            자주 묻는 질문
          </h2>
          <div className="mt-7 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-5 sm:px-7">
            {faqs.map(({ question, answer }) => (
              <details className="group py-5" key={question}>
                <summary className="cursor-pointer list-none pr-7 font-semibold text-slate-900 marker:content-none">
                  {question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-slate-500 sm:px-8">
          by Hooind
        </div>
      </footer>
    </div>
  );
}
