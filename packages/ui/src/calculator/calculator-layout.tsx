import type { ReactNode } from "react";
import { FAQSection, type FAQItem } from "./faq-section";
import { StructuredData } from "./structured-data";

export function CalculatorLayout({
  calculator,
  calculatorBottomAd,
  children,
  description,
  eyebrow = "무료 간편 계산기",
  faqs,
  resultAd,
  structuredData,
  title,
  topAd,
}: {
  calculator: ReactNode;
  calculatorBottomAd?: ReactNode;
  children: ReactNode;
  description: string;
  eyebrow?: string;
  faqs: FAQItem[];
  resultAd?: ReactNode;
  structuredData: unknown;
  title: string;
  topAd?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <StructuredData data={structuredData} />

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            className="rounded-md text-lg font-bold tracking-tight outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            href="/"
          >
            Hooind
          </a>
          <a
            className="rounded-md text-sm font-semibold text-blue-700 outline-none hover:text-blue-800 focus-visible:ring-4 focus-visible:ring-blue-200"
            href="/calculators"
          >
            계산기 목록
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-16">
          <div className="max-w-3xl">
            <p className="font-semibold text-blue-600">{eyebrow}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {description}
            </p>
          </div>
        </section>

        {topAd && <div className="mx-auto max-w-6xl px-5 sm:px-8">{topAd}</div>}

        <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-12">
          <div className="space-y-8 sm:space-y-10">
            {calculator}
            {resultAd}
          </div>
        </div>

        {children}

        {calculatorBottomAd && (
          <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
            {calculatorBottomAd}
          </div>
        )}

        <FAQSection items={faqs} />
      </main>
    </div>
  );
}
