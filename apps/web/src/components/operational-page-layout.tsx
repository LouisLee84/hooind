import Link from "next/link";
import type { ReactNode } from "react";

export function OperationalPageLayout({
  children,
  description,
  title,
  updatedAt,
}: {
  children: ReactNode;
  description: string;
  title: string;
  updatedAt: string;
}) {
  return (
    <main className="flex-1 bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            className="rounded-md text-lg font-bold tracking-tight outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            href="/"
          >
            Hooind
          </Link>
          <Link
            className="rounded-md text-sm font-semibold text-blue-700 outline-none hover:text-blue-800 focus-visible:ring-4 focus-visible:ring-blue-200"
            href="/calculators"
          >
            계산기 목록
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="font-semibold text-blue-600">운영 안내</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>
        <p className="mt-3 text-sm text-slate-500">최종 수정일: {updatedAt}</p>

        <div className="mt-10 space-y-10 rounded-3xl border border-slate-200 bg-white p-6 text-base leading-8 text-slate-700 shadow-sm sm:p-10">
          {children}
        </div>
      </article>
    </main>
  );
}
