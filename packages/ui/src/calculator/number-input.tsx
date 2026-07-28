import { FieldError } from "./validation";

export function NumberInput({
  description,
  error,
  id,
  label,
  max,
  min = 0,
  onChange,
  value,
}: {
  description: string;
  error?: string;
  id: string;
  label: string;
  max?: number;
  min?: number;
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
        className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-right text-base text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        id={id}
        inputMode="numeric"
        max={max}
        min={min}
        name={id}
        onChange={(event) => onChange(event.target.value)}
        required
        type="number"
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
