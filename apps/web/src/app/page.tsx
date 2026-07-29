import { CalculatorCard } from "./calculators/calculator-card";
import { calculatorCatalog } from "./calculators/calculator-catalog";
import { getSiteUrl } from "@/config/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: getSiteUrl("/") },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
        <p className="font-semibold text-blue-600">Hooind Interactive</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
          Hooind
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          설치 없이 바로 사용할 수 있는 생활 계산기와 인터랙티브 도구를
          제공합니다.
        </p>
      </section>

      <section
        aria-labelledby="calculator-navigation-title"
        className="mx-auto max-w-6xl px-5 pb-20 sm:px-8"
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-600">Hooind Tools</p>
            <h2
              className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
              id="calculator-navigation-title"
            >
              바로 쓰는 계산기
            </h2>
          </div>
          <Link
            className="shrink-0 rounded-md text-sm font-semibold text-blue-700 outline-none hover:text-blue-800 focus-visible:ring-4 focus-visible:ring-blue-200"
            href="/calculators"
          >
            전체 보기
          </Link>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {calculatorCatalog.map((calculator) => (
            <CalculatorCard key={calculator.href} {...calculator} />
          ))}
        </div>
      </section>
    </main>
  );
}
