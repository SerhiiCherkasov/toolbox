import {
  Arrow,
  Tooltip as RadixTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ReactNode, MouseEvent } from "react";
import { cn } from "src/utils";

type Props = {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  childrenAsChild?: boolean;
  disabled?: boolean;
  triggerClassName?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const Tooltip = ({
  children,
  content,
  className,
  side = "top",
  childrenAsChild,
  disabled,
  onClick,
  triggerClassName,
}: Props) => {
  if (disabled) {
    return children;
  }

  return (
    <TooltipProvider delayDuration={500}>
      <RadixTooltip>
        <TooltipTrigger
          onClick={onClick}
          className={cn(triggerClassName)}
          asChild={childrenAsChild}
        >
          {children}
        </TooltipTrigger>

        <TooltipContent
          side={side}
          className={cn(
            `z-50 rounded-md border-0 bg-[var(--tooltip-background)] px-[12px] py-[4px] text-[var(--tooltip-foreground)] shadow-[var(--shadow-effect)]`,
            className
          )}
        >
          {content}
          <Arrow className="fill-[var(--tooltip-background)]" />
        </TooltipContent>
      </RadixTooltip>
    </TooltipProvider>
  );
};
