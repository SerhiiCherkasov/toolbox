"use client";

import { useEffect, useState } from "react";
import { Button } from "src/components/Button";
import { Divider } from "src/components/Divider";
import { getJsonFromStore, saveAsJsonToStore } from "src/utils/localstore";
import { CALC_STORE_CHAIN_KEY } from "src/settings";
import { BaseDialog } from "src/components/Dialog/BaseDialog";
import { Input } from "src/components/Input";
import { OperationInstance, OperationRenderer } from "./OperationRenderer";
import { UploadIcon, TrashIcon } from "@phosphor-icons/react";
import { DialogClose } from "src/components/Dialog";

type CalculatorRendererProps = object;

export type StoredOperationChain = {
  inputLabel?: string;
  input: number;
  operations: OperationInstance[];
};

export const CalculatorRenderer = ({}: CalculatorRendererProps) => {
  const [input, setInput] = useState<number>(0);
  const [inputLabel, setInputLabel] = useState<string>("Input");
  const [operations, setOperations] = useState<OperationInstance[]>([]);
  const [storedOperations, setStoredOperations] = useState<
    Record<string, StoredOperationChain>
  >({});
  const [output, setOutput] = useState(0);
  const [chainName, setChainName] = useState("");

  const onSaveChain = () => {
    const storedChains = getJsonFromStore(CALC_STORE_CHAIN_KEY) || {};

    saveAsJsonToStore(CALC_STORE_CHAIN_KEY, {
      ...storedChains,
      [chainName]: {
        inputLabel,
        input,
        operations,
      },
    });
    setChainName("");
  };

  const onLoadChain = (name: string) => {
    setOperations(storedOperations[name].operations || []);
    setInput(storedOperations[name].input || 0);
    setInputLabel(storedOperations[name].inputLabel || "Input");
  };

  useEffect(() => {
    const storedChains = getJsonFromStore(CALC_STORE_CHAIN_KEY) || {};
    setStoredOperations(storedChains);
  }, [operations, chainName]);

  const onChainRemove = (key: string) => {
    const { [key]: _, ...rest } = storedOperations;
    console.log(_);
    setStoredOperations(rest);
    saveAsJsonToStore(CALC_STORE_CHAIN_KEY, rest);
  };

  return (
    <div className="flex flex-col gap-4">
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
      <div>
        <p className="text-xs leading-2">result:</p>
        <h2 className="leading-0.5">{output}</h2>
      </div>
      <Divider />
      <div className="flex gap-4">
        <BaseDialog
          trigger={
            <Button
              onClick={() => setChainName("")}
              disabled={!operations.length}
              variant="outlined"
              className="max-w-[370px]"
            >
              Save Chain
            </Button>
          }
          title="Save Chain"
          description="You can save current Chain locally in your browser to reuse it in future. Please, enter a name for it."
          action={() => onSaveChain()}
          actionName="Save"
          actionDisabled={!chainName}
        >
          <Input
            className="px-2"
            placeholder="Enter Chain name"
            value={chainName}
            onChange={(e) => setChainName(e.target.value)}
          />
        </BaseDialog>
        <BaseDialog
          trigger={
            <Button
              disabled={!Object.keys(storedOperations).length}
              variant="outlined"
              className="max-w-[370px]"
            >
              Manage Chains
            </Button>
          }
          title="Manage Chains"
          actionDisabled={!chainName}
          closeCaption="Done"
        >
          <div className="bg-[var(--background-hight)] rounded-2xl overflow-hidden">
            {!!Object.keys(storedOperations).length &&
              Object.keys(storedOperations).map((key) => (
                <div
                  className="bg-[var(--background-hight)] rounded-2xl"
                  key={key}
                >
                  <div className="flex w-full justify-between items-center p-4 hover:bg-[var(--background-low)]">
                    <p>{key}</p>
                    <div className="flex gap-1">
                      <DialogClose>
                        <UploadIcon
                          className="shrink-0 size-6 rounded-full cursor-pointer mr-2"
                          onClick={() => onLoadChain(key)}
                        />
                      </DialogClose>

                      <BaseDialog
                        title="Delete Chain"
                        trigger={
                          <TrashIcon className="shrink-0 size-6 rounded-full cursor-pointer" />
                        }
                        description="Are you sure you want to delete this chain from local store? This operation cannot be undone."
                        action={() => onChainRemove(key)}
                        actionName="Delete"
                        actionButtonVariant="warning"
                      ></BaseDialog>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </BaseDialog>
      </div>
    </div>
  );
};
