"use client";

import { FieldError } from "./validation";

const currencyFormatter = new Intl.NumberFormat("ko-KR");

export function formatMoneyInput(value: string) {
  const normalized = value.replaceAll(",", "").trim();

  if (normalized === "" || normalized === "-") {
    return normalized;
  }

  if (!/^-?\d+$/.test(normalized)) {
    return null;
  }

  const amount = Number(normalized);

  if (!Number.isSafeInteger(amount)) {
    return value;
  }

  return currencyFormatter.format(amount);
}

export function parseMoneyInput(value: string) {
  const normalized = value.replaceAll(",", "").trim();
  return normalized === "" ? Number.NaN : Number(normalized);
}

export function formatWon(value: number) {
  return `${currencyFormatter.format(value)}원`;
}

export function MoneyInput({
  description,
  error,
  id,
  label,
  onChange,
  placeholder = "0",
  unit = "원",
  value,
}: {
  description: string;
  error?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  unit?: string;
  value: string;
}) {
  function handleChange(nextValue: string) {
    const formatted = formatMoneyInput(nextValue);

    if (formatted !== null) {
      onChange(formatted);
    }
  }

  return (
    <div>
      <label
        className="block text-sm font-semibold text-slate-800"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative mt-2">
        <input
          aria-describedby={`${id}-description ${id}-error`}
          aria-invalid={Boolean(error)}
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 pr-14 text-right text-base text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          id={id}
          inputMode="numeric"
          name={id}
          onChange={(event) => handleChange(event.target.value)}
          placeholder={placeholder}
          required
          value={value}
        />
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-500">
          {unit}
        </span>
      </div>
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
