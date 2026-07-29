export interface ResultItem {
  label: string;
  value: string;
}

export function ResultCard({
  items,
  notice,
  primaryLabel,
  primaryTestId = "primary-result",
  primaryValue,
  title = "계산 결과",
}: {
  items: ResultItem[];
  notice: string;
  primaryLabel: string;
  primaryTestId?: string;
  primaryValue: string;
  title?: string;
}) {
  return (
    <section
      aria-labelledby="result-title"
      className="mt-8 rounded-2xl bg-slate-950 p-5 text-white sm:p-7"
    >
      <p className="text-sm font-semibold text-blue-300">{title}</p>
      <h3 id="result-title" className="mt-2 text-xl font-bold">
        {primaryLabel}
      </h3>
      <p
        className="mt-3 break-words text-3xl font-bold tracking-tight sm:text-4xl"
        data-testid={primaryTestId}
      >
        {primaryValue}
      </p>

      <dl className="mt-6 grid gap-3 border-t border-slate-700 pt-5 sm:grid-cols-2">
        {items.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-xs text-slate-400">{label}</dt>
            <dd className="mt-1 font-semibold text-white">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 rounded-xl bg-slate-800 p-4 text-sm leading-6 text-slate-200">
        {notice}
      </p>
    </section>
  );
}
