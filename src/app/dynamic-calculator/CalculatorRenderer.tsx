"use client";

import { useEffect, useState } from "react";
import { Button } from "src/components/Button";
import { Divider } from "src/components/Divider";
import { getJsonFromStore, saveAsJsonToStore } from "src/utils/localstore";
import { CALC_STORE_SEQUENCE_KEY } from "../settings";
import { BaseDialog } from "src/components/Dialog/BaseDialog";
import { Input } from "src/components/Input";
import { BaseSelect } from "src/components/Select";
import { OperationInstance, OperationRenderer } from "./OperationRenderer";

type CalculatorRendererProps = object;

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
    const storedSequences = getJsonFromStore(CALC_STORE_SEQUENCE_KEY) || {};
    setStoredOperations(storedSequences);
  }, [operations, sequenceName]);

  return (
    <div className="flex flex-col gap-4">
      {!!Object.keys(storedOperations).length && (
        <>
          <BaseSelect
            label="Saved sequences"
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

      <OperationRenderer
        operations={operations}
        setOperations={setOperations}
        setOutput={setOutput}
        input={input}
        setInput={setInput}
        inputLabel={inputLabel}
        setInputLabel={setInputLabel}
      />

      <Divider />
      {output}
      <Divider />
      <div className="flex gap-4">
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
