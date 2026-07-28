export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection({ items }: { items: FAQItem[] }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        자주 묻는 질문
      </h2>
      <div className="mt-7 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-5 sm:px-7">
        {items.map(({ question, answer }) => (
          <details className="group py-5" key={question}>
            <summary className="cursor-pointer list-none pr-7 font-semibold text-slate-900 marker:content-none">
              {question}
            </summary>
            <p className="mt-3 text-sm leading-7 text-slate-600">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
