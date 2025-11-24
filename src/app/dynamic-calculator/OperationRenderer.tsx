"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "src/components/Button";
import { OperationCard, operationList, OperationType } from "./OperationCard";
import { NumberInput } from "src/components/Input/NumberInput";

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
    id: number,
    type: OperationType,
    operand: number,
    label?: string
  ) => {
    setOperations((previous: OperationInstance[]) =>
      previous.map((operation) => {
        if (operation.id === id) {
          return { id, type, operand, label };
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

      if (opFunction && operation.operand) {
        return opFunction(acc, operation.operand);
      }

      return acc;
    }, input);
    setOutput(result);
  }, [input, operations]);

  return (
    <div className="flex flex-col gap-4">
      <NumberInput
        editableLabel={true}
        value={input}
        onChange={(e) => setInput(+e.target.value)}
        label={inputLabel}
        onLabelEdit={setInputLabel}
      />
      {operations.map((operation, index) => (
        <OperationCard
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
