import type { ReactNode } from "react";
import { AdSection } from "./ad-section";
import { FAQSection, type FAQItem } from "./faq-section";
import { StructuredData } from "./structured-data";

export function CalculatorLayout({
  calculator,
  children,
  description,
  eyebrow = "무료 간편 계산기",
  faqs,
  structuredData,
  title,
}: {
  calculator: ReactNode;
  children: ReactNode;
  description: string;
  eyebrow?: string;
  faqs: FAQItem[];
  structuredData: unknown;
  title: string;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <StructuredData data={structuredData} />

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a className="text-lg font-bold tracking-tight" href="/">
            Hooind
          </a>
          <span className="text-sm font-medium text-slate-500">
            Hooind Tools
          </span>
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

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <AdSection label="상단 광고 영역" placement="top" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:items-start">
          {calculator}
          <div className="lg:sticky lg:top-5">
            <AdSection label="본문 광고 영역" placement="content" />
          </div>
        </div>

        {children}

        <FAQSection items={faqs} />

        <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <AdSection label="하단 광고 영역" placement="bottom" />
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-slate-500 sm:px-8">
          by Hooind
        </div>
      </footer>
    </div>
  );
}
