import { cn } from "src/utils";

type DividerProps = {
  className?: string;
};

export const Divider = ({ className }: DividerProps) => {
  return (
    <div
      className={cn(
        "w-full h-[1px] my-4 bg-[var(--foreground-low)]",
        className
      )}
    />
  );
};
