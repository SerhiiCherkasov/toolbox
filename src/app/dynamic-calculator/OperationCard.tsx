import { IconSelect } from "src/components/Select";
import { OperationInstance } from "./CalculatorRenderer";
import { NumberInput } from "src/components/Input/NumberInput";
import { TrashIcon } from "@radix-ui/react-icons";

import { MathOperationsIcon, PlusIcon, XIcon, DivideIcon, MinusIcon, PercentIcon } from "@phosphor-icons/react";

export type OperationType =
  | "add"
  | "multiply"
  | "subtraction"
  | "divide"
  | "percent"
  | "pass";

export type OperationItem = {
  label?: string;
  type: OperationType;
  title: string;
  function: (input: number, operand?: number) => number;
  icon: React.ReactNode;
};

export const operationList: OperationItem[] = [
  {
    type: "pass",
    title: "Pass",
    icon: <MathOperationsIcon size={24} />,
    function: (input) => input,
  },
  {
    type: "add",
    title: "Add",
    icon: <PlusIcon size={24} />,
    function: (input, operand = 0) => input + operand,
  },
  {
    type: "multiply",
    title: "Multiply",
    icon: <XIcon size={24} />,
    function: (input, operand = 0) => input * operand,
  },
  {
    type: "divide",
    title: "Divide",
    icon: <DivideIcon size={24} />,
    function: (input, operand = 0) => input / operand,
  },
  {
    type: "subtraction",
    title: "Subtraction",
    icon: <MinusIcon size={24} />,
    function: (input, operand = 0) => input - operand,
  },
  {
    type: "percent",
    title: "Percentage",
    icon: <PercentIcon size={24} />,
    function: (input, operand = 0) => (input / 100) * operand,
  },
];

type OperationCardProps = OperationInstance & {
  onChange: (
    id: number,
    type: OperationType,
    operand: number,
    label?: string
  ) => void;
  label?: string;
  onRemove: (id: number) => void;
};

const operationOptions = operationList.map((opt) => ({
  slug: opt.type,
  caption: opt.title,
  icon: opt.icon,
}));

export const OperationCard = ({
  id,
  label,
  type,
  operand,
  onChange,
  onRemove,
}: OperationCardProps) => {
  const onTypeChange = (newType: OperationType) => {
    onChange(id, newType, operand, label);
  };

  const onOperandChange = (newOperand: number) => {
    onChange(id, type, newOperand, label);
  };

  const onLabelEdit = (newLabel: string) => {
    onChange(id, type, operand, newLabel);
  };

  return (
    <div className="flex items-end gap-4">
      <IconSelect
        value={type}
        setValue={(value?: string) => onTypeChange(value as OperationType)}
        options={operationOptions}
      />
      <NumberInput
        value={operand}
        onChange={(e) => onOperandChange(+e.target.value)}
        label={label}
        editableLabel={true}
        onLabelEdit={onLabelEdit}
      />
      <TrashIcon
        className="shrink-0 size-10 p-2 bg-[var(--background-low)] rounded-full cursor-pointer"
        onClick={() => onRemove(id)}
      />
    </div>
  );
};
