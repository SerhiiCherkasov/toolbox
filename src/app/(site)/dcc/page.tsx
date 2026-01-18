// import { CalculatorRenderer } from "./CalculatorRenderer";
"use client";

import { useEffect, useState } from "react";
import { ChainRenderer } from "./ChainRenderer";
import { Divider } from "src/components/Divider";
import { getParsedJsonFromStore, saveAsJsonToStore } from "src/utils";
import { CALC_STORE_CHAIN_KEY } from "src/settings";
import { BaseDialog } from "src/components/Dialog/BaseDialog";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";
import { DialogClose } from "src/components/Dialog";
import { UploadIcon, TrashIcon } from "@phosphor-icons/react";

export type TreeType = "none" | "upper" | "lower";

export type ChainItem = {
  id: number;
  label?: string;
  slug: OperationType;
  operand: number;
  treeType: TreeType;
  treeInput?: number;
  treeLabel?: string;
  operations?: ChainItem[];
};

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

export const initialChainItem: ChainItem = {
  id: 0,
  label: "Input",
  slug: "pass",
  operand: 0,
  treeType: "none",
};

export type StoredChains = Record<string, ChainItem[]>;

export default function DynamicCalculator() {
  const [chain, setChain] = useState<ChainItem[]>([initialChainItem]);
  const [output, setOutput] = useState(0);
  const [chainName, setChainName] = useState("My calculations");
  const [storedChainsState, setStoredChainsState] = useState<StoredChains>({});
  console.log(">>>>> chain ", chain);

  const onSaveChain = () => {
    const storedChains = getParsedJsonFromStore(CALC_STORE_CHAIN_KEY) || {};

    saveAsJsonToStore(CALC_STORE_CHAIN_KEY, {
      ...storedChains,
      [chainName]: chain,
    });
  };

  const onLoadChain = (name: string) => {
    setChain(storedChainsState[name] || []);
  };

  const onChainRemove = (key: string) => {
    const { [key]: _, ...rest } = storedChainsState;
    console.log(_);
    setStoredChainsState(rest);
    saveAsJsonToStore(CALC_STORE_CHAIN_KEY, rest);
  };

  useEffect(() => {
    const storedChains = getParsedJsonFromStore(CALC_STORE_CHAIN_KEY) || {};
    setStoredChainsState(storedChains);
  }, []);

  return (
    <main className="flex flex-col p-8 gap-8">
      <section>
        <header>
          <h1>Dynamic Chain Calculator</h1>
        </header>
        <div className="flex flex-col gap-4 max-w-[550px]">
          <p>
            Use this calculator to create and manage dynamic calculation chains.
            It starts with some input value, and then you can add math
            operations to change it.{" "}
          </p>
          <p>
            Each operation can be as a result of separate subchain of
            calculations or as direct input.
          </p>{" "}
          <p>
            If you want to try the same calculations but with a different input
            or change one or more values in the chain - you can do it without
            necessity to repeat all other operations.
          </p>
          <p>Any chain can be saved to use it in the future.</p>
          <p>
            IMPORTANT! All data are stored locally in your browser. We are not
            collecting any user information.
          </p>
        </div>
      </section>
      <section>
        <header className="mb-4">
          <h2>{chainName}</h2>
        </header>
        <ChainRenderer
          chain={chain}
          setChain={setChain}
          setOutput={setOutput}
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
                disabled={!chain.length}
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
                disabled={!Object.keys(storedChainsState).length}
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
              {!!Object.keys(storedChainsState).length &&
                Object.keys(storedChainsState).map((key) => (
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
      </section>
    </main>
  );
}
