import { IconSelect } from "src/components/Select";
import { OperationInstance } from "./OperationRenderer";
import { NumberInput } from "src/components/Input/NumberInput";

import {
  TrashIcon,
  MathOperationsIcon,
  PlusIcon,
  XIcon,
  DivideIcon,
  MinusIcon,
  PercentIcon,
  TreeStructureIcon,
  DownloadSimpleIcon,
  RadicalIcon,
  TextSuperscriptIcon,
} from "@phosphor-icons/react";
import { BaseDialog } from "src/components/Dialog/BaseDialog";
import { Tooltip } from "src/components/Tooltip";
import classNames from "classnames";
import { TreeType } from "./OperationBlock";
import { useEffect, useState } from "react";

export type OperationType =
  | "add"
  | "multiply"
  | "subtraction"
  | "divide"
  | "percent"
  | "radical"
  | "power"
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
  {
    type: "radical",
    title: "Radical",
    icon: <RadicalIcon size={24} />,
    function: (input, operand = 2) => Math.pow(input, 1 / operand),
  },
  {
    type: "power",
    title: "Power",
    icon: <TextSuperscriptIcon size={24} />,
    function: (input, operand = 2) => Math.pow(input, operand),
  },
];

export type OperationCardProps = OperationInstance & {
  onChange: (newInstance: OperationInstance) => void;
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
  treeType,
  treeContent,
  treeInput,
  treeLabel,
}: OperationCardProps) => {
  const [currentValue, setCurrentValue] = useState(operand);
  const onTypeChange = (newType: OperationType) => {
    onChange({
      id,
      type: newType,
      operand: currentValue,
      label,
      treeType,
      treeContent,
      treeInput,
      treeLabel,
    });
  };

  const onOperandChange = (newOperand: number) => {
    onChange({
      id,
      type,
      operand: newOperand,
      label,
      treeType,
      treeContent,
      treeInput,
      treeLabel,
    });
  };

  const onLabelChange = (newLabel: string) => {
    onChange({
      id,
      type,
      operand: currentValue,
      label: newLabel,
      treeType,
      treeContent,
      treeInput,
      treeLabel,
    });
  };

  const onTreeTypeChange = (newType: TreeType) => {
    onChange({
      id,
      type,
      operand: currentValue,
      label,
      treeType: newType,
      treeContent,
      treeInput,
      treeLabel,
    });
  };

  const error = type === "divide" && currentValue === 0;

  useEffect(() => {
    setCurrentValue(operand);
    onOperandChange(operand);

    onChange({
      id,
      type,
      operand,
      label,
      treeType,
      treeContent,
      treeInput,
      treeLabel,
    });
  }, [operand]);

  useEffect(() => {
    setCurrentValue(currentValue);
    onOperandChange(currentValue);
  }, [currentValue]);

  return (
    <div className={classNames({ "pl-13.5": !id }, "flex items-end gap-4")}>
      {!!id && (
        <IconSelect
          value={type}
          setValue={(value?: string) => onTypeChange(value as OperationType)}
          options={operationOptions}
        />
      )}
      <NumberInput
        value={currentValue}
        onChange={(e) => setCurrentValue(+e.target.value)}
        label={label}
        editableLabel={true}
        onLabelEdit={onLabelChange}
        wrapperClassName={classNames({ "bg-[var(--error-dark)]": error})}
        disabled={treeType && treeType !== "none"}
      />
      {!!id && (
        <BaseDialog
          title="Delete Operation"
          trigger={
            <Tooltip content="Remove this operation from chain">
              <TrashIcon className="shrink-0 size-10 p-2 bg-[var(--background-low)] rounded-full cursor-pointer" />
            </Tooltip>
          }
          description="Are you sure you want to delete this operation?"
          action={() => onRemove(id)}
          actionName="Delete"
          actionButtonVariant="warning"
        ></BaseDialog>
      )}
      {(!treeType || treeType === "none") && (
        <Tooltip content="Make operations as result of subchain">
          <TreeStructureIcon
            className="shrink-0 size-10 p-2 bg-[var(--background-low)] rounded-full cursor-pointer"
            onClick={() => onTreeTypeChange("upper")}
          />
        </Tooltip>
      )}
      {treeType === "upper" && (
        <Tooltip content="Make operations as direct input">
          <DownloadSimpleIcon
            className="shrink-0 size-10 p-2 bg-[var(--background-low)] rounded-full cursor-pointer"
            onClick={() => onTreeTypeChange("none")}
          />
        </Tooltip>
      )}
    </div>
  );
};
