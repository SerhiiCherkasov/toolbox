import { BaseSelect } from "src/components/Select/BaseSelect";
import { OperationInstance } from "./CalculatorRenderer";
import { NumberInput } from "src/components/Input/NumberInput";
import { TrashIcon } from "@radix-ui/react-icons";

export type OperationType =
  | "add"
  | "multiply"
  | "subtraction"
  | "divide"
  | "percent"
  | "pass";

export type operationItem = {
  label?: string;
  type: OperationType;
  title: string;
  function: (input: number, operand?: number) => number;
};

export const operationList: operationItem[] = [
  {
    type: "pass",
    title: "Pass",
    function: (input) => input,
  },
  {
    type: "add",
    title: "Add",
    function: (input, operand = 0) => input + operand,
  },
  {
    type: "multiply",
    title: "Multiply",
    function: (input, operand = 0) => input * operand,
  },
  {
    type: "divide",
    title: "Divide",
    function: (input, operand = 0) => input / operand,
  },
  {
    type: "subtraction",
    title: "Subtraction",
    function: (input, operand = 0) => input - operand,
  },
  {
    type: "percent",
    title: "Percentage",
    function: (input, operand = 0) => input / 100 * operand,
  },
];

type OperationCardProps = OperationInstance & {
  onChange: (id: number, type: OperationType, operand: number, label?: string) => void;
  label?: string;
  onRemove: (id: number) => void;
};

const operationOptions = operationList.map((opt) => ({
  slug: opt.type,
  caption: opt.title,
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
      <BaseSelect
        value={type}
        setValue={(value?: string) => onTypeChange(value as OperationType)}
        options={operationOptions}
        label={label}
        editableLabel={true}
        onLabelEdit={onLabelEdit}
      />
      <NumberInput value={operand} onChange={(e) => onOperandChange(+e.target.value)} />
        <TrashIcon className="shrink-0 size-10 p-2 bg-[var(--background-low)] rounded-full cursor-pointer" onClick={() => onRemove(id)} />
    </div>
  );
};
