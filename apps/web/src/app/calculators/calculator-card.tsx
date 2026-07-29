import type { CalculatorCatalogItem } from "./calculator-catalog";
import Link from "next/link";

export function CalculatorCard({
  available,
  description,
  href,
  title,
}: CalculatorCatalogItem) {
  return (
    <Link
      className="group flex min-h-56 flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm outline-none transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md focus-visible:ring-4 focus-visible:ring-blue-200"
      href={href}
    >
      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
          available
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {available ? "사용 가능" : "준비 중"}
      </span>
      <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-950">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
        {description}
      </p>
      <span className="mt-6 font-semibold text-blue-700 group-hover:text-blue-800">
        계산기 열기 <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
