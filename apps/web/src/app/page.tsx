export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-slate-50 px-6">
      <main className="w-full max-w-3xl rounded-3xl bg-white p-10 shadow-sm sm:p-16">
        <p className="mb-4 font-semibold text-blue-600">Hooind Interactive</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
          Hooind
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          설치 없이 바로 즐기고 사용할 수 있는 게임, 계산기, 테스트와 생성기를
          준비하고 있습니다.
        </p>
      </main>
    </div>
  );
}
