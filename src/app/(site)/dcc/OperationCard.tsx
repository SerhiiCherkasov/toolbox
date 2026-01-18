import { IconSelect } from "src/components/Select";
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
import { ChainItem, initialChainItem } from "./page";

export type OperationType =
  | "add"
  | "multiply"
  | "subtraction"
  | "divide"
  | "percent"
  | "radical"
  | "power"
  | "sin"
  | "cos"
  | "tan"
  | "pass";

export type OperationItem = {
  label?: string;
  slug: OperationType;
  caption: string;
  function: (input: number, operand?: number) => number;
  icon: React.ReactNode;
};

export const operationList: OperationItem[] = [
  {
    slug: "pass",
    caption: "Pass",
    icon: <MathOperationsIcon size={24} />,
    function: (input) => input,
  },
  {
    slug: "add",
    caption: "Add",
    icon: <PlusIcon size={24} />,
    function: (input, operand = 0) => input + operand,
  },
  {
    slug: "multiply",
    caption: "Multiply",
    icon: <XIcon size={24} />,
    function: (input, operand = 0) => input * operand,
  },
  {
    slug: "divide",
    caption: "Divide",
    icon: <DivideIcon size={24} />,
    function: (input, operand = 0) => input / operand,
  },
  {
    slug: "subtraction",
    caption: "Subtraction",
    icon: <MinusIcon size={24} />,
    function: (input, operand = 0) => input - operand,
  },
  {
    slug: "percent",
    caption: "Percentage",
    icon: <PercentIcon size={24} />,
    function: (input, operand = 0) => (input / 100) * operand,
  },
  {
    slug: "radical",
    caption: "Radical",
    icon: <RadicalIcon size={24} />,
    function: (input, operand = 2) => Math.pow(input, 1 / operand),
  },
  {
    slug: "power",
    caption: "Power",
    icon: <TextSuperscriptIcon size={24} />,
    function: (input, operand = 2) => Math.pow(input, operand),
  },
];

export const initOperationList: OperationItem[] = [
  {
    slug: "pass",
    caption: "Pass",
    icon: <div className="w-6 h-6"></div>,
    function: (_, operand) => operand || 0,
  },
  {
    slug: "sin",
    caption: "Sine",
    icon: (
      <div className="w-6 h-6">
        <p>
          <i>sin</i>
        </p>
      </div>
    ),
    function: (_, operand = 2) => Math.sin(operand * (Math.PI / 180)),
  },
  {
    slug: "cos",
    caption: "Cosine",
    icon: (
      <div className="w-6 h-6">
        <p>
          <i>cos</i>
        </p>
      </div>
    ),
    function: (_, operand = 2) => Math.cos(operand * (Math.PI / 180)),
  },
  {
    slug: "tan",
    caption: "Tangent ",
    icon: (
      <div className="w-6 h-6">
        <p>
          <i>tan</i>
        </p>
      </div>
    ),
    function: (_, operand = 2) => Math.tan(operand * (Math.PI / 180)),
  },
];

export type OperationCardProps = ChainItem & {
  onChange: (newInstance: ChainItem) => void;
  onRemove: (id: number) => void;
};

export const OperationCard = ({
  id,
  label,
  slug,
  operand,
  onChange,
  onRemove,
  treeType,
  operations,
  treeInput,
  treeLabel,
}: OperationCardProps) => {
  const [currentValue, setCurrentValue] = useState(operand);

  const onTypeChange = (newSlug: OperationType) => {
    onChange({
      id,
      slug: newSlug,
      operand: currentValue,
      label,
      treeType,
      operations,
      treeInput,
      treeLabel,
    });
  };

  const onOperandChange = (newOperand: number) => {
    onChange({
      id,
      slug,
      operand: newOperand,
      label,
      treeType,
      operations,
      treeInput,
      treeLabel,
    });
  };

  const onLabelChange = (newLabel: string) => {
    onChange({
      id,
      slug,
      operand: currentValue,
      label: newLabel,
      treeType,
      operations,
      treeInput,
      treeLabel,
    });
  };

  const onTreeTypeChange = (newType: TreeType) => {
    onChange({
      id,
      slug,
      operand: currentValue,
      label,
      treeType: newType,
      operations: [initialChainItem],
      treeInput,
      treeLabel,
    });
  };

  const error = slug === "divide" && currentValue === 0;

  useEffect(() => {
    setCurrentValue(operand);
    onOperandChange(operand);

    onChange({
      id,
      slug,
      operand,
      label,
      treeType,
      operations,
      treeInput,
      treeLabel,
    });
  }, [operand]);

  useEffect(() => {
    onOperandChange(currentValue);
  }, [currentValue]);

  return (
    <div className={classNames("flex items-end gap-4")}>
      <IconSelect
        value={slug}
        setValue={(value?: string) => onTypeChange(value as OperationType)}
        options={id ? operationList : initOperationList}
      />

      <NumberInput
        value={currentValue}
        onChange={(e) => setCurrentValue(+e.target.value)}
        label={label}
        editableLabel={true}
        onLabelEdit={onLabelChange}
        wrapperClassName={classNames({ "bg-[var(--error-dark)]": error })}
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
        <Tooltip content="Make operation as result of subchain">
          <TreeStructureIcon
            className="shrink-0 size-10 p-2 bg-[var(--background-low)] rounded-full cursor-pointer"
            onClick={() => onTreeTypeChange("upper")}
          />
        </Tooltip>
      )}
      {treeType === "upper" && (
        <Tooltip content="Make operation as direct input">
          <DownloadSimpleIcon
            className="shrink-0 size-10 p-2 bg-[var(--background-low)] rounded-full cursor-pointer"
            onClick={() => onTreeTypeChange("none")}
          />
        </Tooltip>
      )}
    </div>
  );
};
