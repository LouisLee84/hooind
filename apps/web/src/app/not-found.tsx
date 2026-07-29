import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center bg-slate-50 px-5 py-16 text-slate-950 sm:px-8">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="font-semibold text-blue-600">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          주소가 변경되었거나 존재하지 않는 페이지입니다. 홈 또는 계산기
          목록에서 필요한 콘텐츠를 찾아보세요.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white outline-none hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-200"
            href="/"
          >
            홈으로
          </Link>
          <Link
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 outline-none hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-slate-200"
            href="/calculators"
          >
            계산기 목록
          </Link>
        </div>
      </div>
    </main>
  );
}
