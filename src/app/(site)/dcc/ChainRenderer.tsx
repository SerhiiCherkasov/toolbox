import { Dispatch, SetStateAction, useEffect } from "react";
import { ChainItem } from "./page";
import { OperationBlock } from "./OperationBlock";
import { Button } from "src/components/Button";
import { Tooltip } from "src/components/Tooltip";
import { PlusCircleIcon } from "@phosphor-icons/react";
import { initOperationList, operationList } from "./OperationCard";

type ChainRendererProps = {
  chain: ChainItem[];
  setChain: Dispatch<SetStateAction<ChainItem[]>>;
  setOutput: Dispatch<number>;
};

export const ChainRenderer = ({
  chain,
  setChain,
  setOutput,
}: ChainRendererProps) => {
  const onOperationChange = (newInstance: ChainItem) => {
    setChain((previous: ChainItem[]) =>
      previous.map((operation) => {
        if (operation.id === newInstance.id) {
          return { ...newInstance };
        }
        return operation;
      })
    );
  };

  const onRemoveOperation = (id: number) => {
    setChain((previous) => previous.filter((op) => op.id !== id));
  };

  const onAddOperation = () => {
    setChain((previous) => [
      ...previous,
      { id: Date.now(), slug: "pass", operand: 0, input: 0, treeType: "none" },
    ]);
  };

  useEffect(() => {
    const result = chain.reduce((acc, operation) => {
      const opFunction = (
        operation.id ? operationList : initOperationList
      ).find((op) => op.slug === operation.slug)?.function;

      if (opFunction) {
        return opFunction(acc, operation.operand);
      }

      return acc;
    }, 0);

    setOutput(result);
  }, [chain]);

  return (
    <div className="animate-fade-right animate-duration-300 animate-ease-in-out flex flex-col gap-4">
      {chain.map((el, index) => (
        <OperationBlock
          key={el.id}
          onChange={onOperationChange}
          onRemove={onRemoveOperation}
          label={`operation #${index}`}
          {...el}
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
