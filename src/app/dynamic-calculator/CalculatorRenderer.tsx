"use client";

import { useEffect, useState } from "react";
import { Button } from "src/components/Button";
import { OperationCard, operationList, OperationType } from "./OperationCard";
import { NumberInput } from "src/components/Input/NumberInput";
import { Divider } from "src/components/Divider";
import { getJsonFromStore, saveAsJsonToStore } from "src/utils/localstore";
import { CALC_STORE_SEQUENCE_KEY } from "../settings";
import { BaseDialog } from "src/components/Dialog/BaseDialog";
import { Input } from "src/components/Input";
import { BaseSelect } from "src/components/Select/BaseSelect";

type CalculatorRendererProps = object;

export type OperationInstance = {
  id: number;
  type: OperationType;
  operand: number;
  label?: string;
};

export type StoredOperationSequence = {
  inputLabel?: string;
  input: number;
  operations: OperationInstance[];
};

export const CalculatorRenderer = ({}: CalculatorRendererProps) => {
  const [input, setInput] = useState<number>(0);
  const [inputLabel, setInputLabel] = useState<string>("Input");
  const [operations, setOperations] = useState<OperationInstance[]>([]);
  const [storedOperations, setStoredOperations] = useState<
    Record<string, StoredOperationSequence>
  >({});
  const [output, setOutput] = useState(0);
  const [sequenceName, setSequenceName] = useState("");
  const [loadedSequenceName, setLoadedSequenceName] = useState("");

  const onOperationChange = (
    id: number,
    type: OperationType,
    operand: number,
    label?: string
  ) => {
    setOperations((previous) =>
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

  const onSaveSequence = () => {
    const storedSequences = getJsonFromStore(CALC_STORE_SEQUENCE_KEY) || {};

    saveAsJsonToStore(CALC_STORE_SEQUENCE_KEY, {
      ...storedSequences,
      [sequenceName]: {
        inputLabel,
        input,
        operations,
      },
    });
    setSequenceName("");
  };

  

  const onLoadSequence = (name: string) => {
    setLoadedSequenceName(name);
    setOperations(storedOperations[name].operations || []);
    setInput(storedOperations[name].input || 0);
    setInputLabel(storedOperations[name].inputLabel || "Input");
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

  useEffect(() => {
    const storedSequences = getJsonFromStore(CALC_STORE_SEQUENCE_KEY) || {};
    setStoredOperations(storedSequences);
  }, [operations, sequenceName]);

  return (
    <div className="flex flex-col gap-4">
      {!!Object.keys(storedOperations).length && (
        <>
          <BaseSelect
            value={loadedSequenceName}
            setValue={(value?: string) => onLoadSequence(value || "")}
            options={Object.keys(storedOperations).map((key) => ({
              slug: key,
              caption: key,
            }))}
          />
          <Divider />
        </>
      )}
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
      <Divider />
      {output}
      <Divider />
      <div className="flex gap-4">
        <Button onClick={onAddOperation} disabled={!input}>
          Add operation
        </Button>
        <BaseDialog
          trigger={
            <Button
              onClick={() => setSequenceName("")}
              disabled={!operations.length}
              variant="outlined"
            >
              Save sequence
            </Button>
          }
          title="Save sequence"
          description="You can save current sequence locally in your browser to reuse it in future. Please, enter a name for it."
          action={() => onSaveSequence()}
          actionName="Save"
          actionDisabled={!sequenceName}
        >
          <Input
            className="px-2"
            placeholder="Enter sequence name"
            value={sequenceName}
            onChange={(e) => setSequenceName(e.target.value)}
          />
        </BaseDialog>
      </div>
    </div>
  );
};
