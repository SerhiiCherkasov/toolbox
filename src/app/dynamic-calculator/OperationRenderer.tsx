"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "src/components/Button";
import { operationList, OperationType } from "./OperationCard";
import { NumberInput } from "src/components/Input/NumberInput";
import { OperationBlock, TreeType } from "./OperationBlock";

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
  type: OperationType;
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
  const onOperationChange = (
    newInstance: OperationInstance) => {
      
    setOperations((previous: OperationInstance[]) =>
      previous.map((operation) => {
        if (operation.id === newInstance.id) {
          const {id, label, operand, treeContent, treeType, treeInput, type} = newInstance;
          return { id, label, operand, treeContent, treeType, treeInput, type };
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
      { id: Date.now(), type: "pass", operand: 0 },
    ]);
  };

  useEffect(() => {
    const result = operations.reduce((acc, operation) => {
      const opFunction = operationList.find(
        (op) => op.type === operation.type
      )?.function;

      if (opFunction) {
        return opFunction(acc, operation.operand);
      }

      return acc;
    }, input);

    setOutput(result);
  }, [input, operations]);

  return (
    <div className="animate-fade-right animate-duration-300 animate-ease-in-out flex flex-col gap-4">
      <NumberInput
        editableLabel={true}
        value={input}
        onChange={(e) => setInput(+e.target.value)}
        label={inputLabel}
        onLabelEdit={setInputLabel}
      />
      {operations.map((operation, index) => (
        <OperationBlock
          key={operation.id}
          onChange={onOperationChange}
          onRemove={onRemoveOperation}
          label={`operation #${index + 1}`} // initial default value
          {...operation}
        />
      ))}
      <Button onClick={onAddOperation} disabled={!input}>
        Add operation
      </Button>
    </div>
  );
};
