import { FieldError } from "./validation";

export function DateInput({
  description,
  error,
  id,
  label,
  onChange,
  value,
}: {
  description: string;
  error?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div>
      <label
        className="block text-sm font-semibold text-slate-800"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        aria-describedby={`${id}-description ${id}-error`}
        aria-invalid={Boolean(error)}
        className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        id={id}
        name={id}
        onChange={(event) => onChange(event.target.value)}
        required
        type="date"
        value={value}
      />
      <p
        className="mt-1.5 text-xs leading-5 text-slate-500"
        id={`${id}-description`}
      >
        {description}
      </p>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
