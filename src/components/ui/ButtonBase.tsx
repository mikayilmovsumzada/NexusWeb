import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/* Button styles + plain <button>. No server imports, so safe for Client Components. */

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "lg";

const base =
  "group inline-flex max-w-full shrink-0 items-center justify-center gap-2 rounded-full text-center font-medium leading-snug transition-[background-color,border-color,color,box-shadow,transform] duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-pulse-500 text-white shadow-[0_0_0_1px_rgb(92_157_255/0.5),0_8px_30px_-8px_rgb(58_123_255/0.7)] hover:bg-pulse-400 hover:shadow-[0_0_0_1px_rgb(147_192_255/0.6),0_10px_36px_-8px_rgb(58_123_255/0.85)] light:shadow-[0_8px_24px_-10px_rgb(42_95_224/0.6)]",
  secondary: "border border-line-strong bg-ink-800/40 text-text hover:border-pulse-400/60 hover:bg-ink-800/80",
  ghost: "text-muted hover:text-text",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-10 px-4 py-2 text-sm",
  lg: "min-h-12 px-6 py-2.5 text-[0.95rem]",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}
