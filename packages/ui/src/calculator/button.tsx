import type { ButtonHTMLAttributes } from "react";

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
}) {
  const variantClass =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-200"
      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-200";

  return (
    <button
      className={`h-12 rounded-xl font-semibold transition focus:outline-none focus:ring-4 ${variantClass} ${className}`}
      {...props}
    />
  );
}
