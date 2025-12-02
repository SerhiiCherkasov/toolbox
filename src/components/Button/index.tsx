import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "src/utils";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
};

export type ButtonVariant = "base" | "outlined" | "warning" | "icon";

export type ButtonSize = "full" | "partial" | "fit";

const variants: Record<ButtonVariant, string> = {
  base: "bg-[var(--primary-color)] text-white",
  outlined:
    "bg-transparent border border-[var(--foreground-low)] text-[var(--foreground-hight)]",
  warning: "bg-[var(--error-color)] text-white",
  icon: "p-2 bg-[var(--primary-color)] text-white rounded-full",
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
  icon,
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
      {icon}
      {children}
    </button>
  );
};
