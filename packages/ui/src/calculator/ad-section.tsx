export function AdSection({
  label = "광고 영역",
  placement,
}: {
  label?: string;
  placement: "top" | "content" | "bottom";
}) {
  const heightClass = placement === "content" ? "h-64" : "h-32";

  return (
    <aside
      aria-label={label}
      className={`${heightClass} flex w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100 px-5 text-center`}
      data-ad-placement={placement}
    >
      <div>
        <p className="text-xs font-semibold tracking-widest text-slate-500">
          AD
        </p>
        <p className="mt-2 text-sm text-slate-500">{label}</p>
      </div>
    </aside>
  );
}
