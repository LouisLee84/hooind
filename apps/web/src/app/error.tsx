"use client";

import Link from "next/link";

export default function ErrorPage({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <main className="flex flex-1 items-center bg-slate-50 px-5 py-16 text-slate-950 sm:px-8">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="font-semibold text-red-600">일시적인 오류</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          페이지를 표시하지 못했습니다
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          잠시 후 다시 시도해 주세요. 오류의 세부정보는 화면에 표시하지
          않습니다.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white outline-none hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-200"
            onClick={() => unstable_retry()}
            type="button"
          >
            다시 시도
          </button>
          <Link
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 outline-none hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-slate-200"
            href="/"
          >
            홈으로
          </Link>
        </div>
      </div>
    </main>
  );
}
