import * as React from "react";
import { cn } from "src/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export type ButtonVariant = "base" | "outlined" | "warning";

export type ButtonSize = "full" | "partial" | "fit";

const variants: Record<ButtonVariant, string> = {
  base: "bg-[var(--primary-color)] text-white",
  outlined:
    "bg-transparent border border-[var(--foreground-low)] text-[var(--foreground-hight)]",
  warning: "bg-[var(--error-color)] text-white",
};

const sizes: Record<ButtonSize, string> = {
  full: "w-full py-3 px-6 ",
  partial: "w-[50%] py-2 px-4 ",
  fit: "w-fit p-2",
};

export const Button = ({
  variant = "base",
  size = "full",
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(
        "flex items-center justify-center gap-2 m-0 bg-transparent border-0 shadow-none outline-none appearance-none rounded-2xl font-medium cursor-pointer hover:opacity-85",
        variants[variant],
        sizes[size],
        rest.disabled ? "opacity-50 hover:opacity-50 cursor-auto" : "",
        className
      )}
    >
      {children}
    </button>
  );
};
