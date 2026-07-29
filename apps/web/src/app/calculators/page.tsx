import { CalculatorCard } from "./calculator-card";
import { calculatorCatalog } from "./calculator-catalog";
import { createPageMetadata } from "@/config/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = createPageMetadata({
  title: "계산기 목록 | Hooind Tools",
  description:
    "퇴직금, 연봉 실수령액, 주휴수당을 간편하게 계산할 수 있는 Hooind 계산기 목록입니다.",
  path: "/calculators",
});

export default function CalculatorsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
          <Link
            className="rounded-md text-lg font-bold tracking-tight outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            href="/"
          >
            Hooind
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="font-semibold text-blue-600">Hooind Tools</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          계산기 목록
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          필요한 계산기를 선택해 설치나 회원가입 없이 바로 사용하세요.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {calculatorCatalog.map((calculator) => (
            <CalculatorCard key={calculator.href} {...calculator} />
          ))}
        </div>
      </section>
    </main>
  );
}
