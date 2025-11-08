import { cn } from "src/utils";

type SmallTextProps = {
  className?: string;
  children: string | number;
};

export const SmallText = ({ className, children = "" }: SmallTextProps) => {
  return <p className={cn("text-xs", className)}>{children}</p>;
};

export { EditableLabel } from "./EditableLabel";
