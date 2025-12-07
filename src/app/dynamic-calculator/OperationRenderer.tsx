"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "src/components/Button";
import { initOperationList, operationList, OperationType } from "./OperationCard";
import { OperationBlock, TreeType } from "./OperationBlock";
import { PlusCircleIcon } from "@phosphor-icons/react";
import { Tooltip } from "src/components/Tooltip";

type OperationRendererProps = {
  setOutput: Dispatch<number>;
  input?: number;
  setInput: Dispatch<SetStateAction<number>>;
  inputLabel?: string;
  setInputLabel: Dispatch<SetStateAction<string>>;
  operations: OperationInstance[];
  setOperations: Dispatch<SetStateAction<OperationInstance[]>>;
};

export type OperationInstance = {
  id: number;
  slug: OperationType;
  operand: number;
  label?: string;
  treeType?: TreeType;
  treeContent?: OperationInstance[];
  treeInput?: number;
  treeLabel?: string;
};

export const OperationRenderer = ({
  setOutput,
  input = 0,
  setInput,
  inputLabel,
  setInputLabel,
  operations = [],
  setOperations,
}: OperationRendererProps) => {
  const [initTreeType, setInitTreeType] = useState<TreeType>("none");
  const [initInputType, setInitInputType] = useState<OperationType>("pass");
  const onOperationChange = (newInstance: OperationInstance) => {
    setOperations((previous: OperationInstance[]) =>
      previous.map((operation) => {
        if (operation.id === newInstance.id) {
          const { id, label, operand, treeContent, treeType, treeInput, slug } =
            newInstance;
          return { id, label, operand, treeContent, treeType, treeInput, slug };
        }
        return operation;
      })
    );
  };

  const onRemoveOperation = (id: number) => {
    setOperations((previous) => previous.filter((op) => op.id !== id));
  };

  const onAddOperation = () => {
    setOperations((previous) => [
      ...previous,
      { id: Date.now(), slug: "pass", operand: 0 },
    ]);
  };

  const onInitInputChange = (newInstance: Partial<OperationInstance>) => {
    const func = initOperationList.find(
      (op) => op.slug === newInstance?.slug
    )?.function;
    const newOperand = func ? func(input, newInstance?.operand || 0) : newInstance?.operand || 0;
    
    setInput(newOperand);
    setInputLabel(newInstance.label || "");
    setInitTreeType(newInstance.treeType || "none");
    setInitInputType(newInstance.slug || "pass");
  };

  useEffect(() => {
    const result = operations.reduce((acc, operation) => {
      const opFunction = operationList.find(
        (op) => op.slug === operation.slug
      )?.function;

      if (opFunction) {
        return opFunction(acc, operation.operand);
      }

      return acc;
    }, input);

    setOutput(result);
  }, [input, operations, initInputType]);

  return (
    <div className="animate-fade-right animate-duration-300 animate-ease-in-out flex flex-col gap-4">
      <OperationBlock
        id={0}
        slug={initInputType}
        onChange={onInitInputChange}
        operand={input}
        label={inputLabel}
        onRemove={() => null}
        treeType={initTreeType}
      />
      {operations.map((operation, index) => (
        <OperationBlock
          key={operation.id}
          onChange={onOperationChange}
          onRemove={onRemoveOperation}
          label={`operation #${index + 1}`}
          {...operation}
        />
      ))}

      <Button
        onClick={onAddOperation}
        className="p-1"
        variant="icon"
        size="fit"
        icon={
          <Tooltip content="Add operation" className="w-fit">
            <PlusCircleIcon size={32} className="cursor-pointer" />
          </Tooltip>
        }
      ></Button>
    </div>
  );
};
