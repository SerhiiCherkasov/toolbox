import { useEffect, useState } from "react";
import { OperationCardProps } from "./OperationCard";
import { ChainRenderer } from "./ChainRenderer";

type OperationTreeProps = OperationCardProps & {
  setOutput: (output: number) => void;
};

export const OperationTree = (props: OperationTreeProps) => {
  const { operations: treeContent, operand, setOutput, onChange } =
    props;
  const [operations, setOperations] = useState(treeContent || []);

  useEffect(() => {
    onChange({
      ...props,
      operations: operations,
    });
  }, [operations]);

  return (
    <div className="p-4 border border-[var(--border-base)] rounded-t-xl rounded-r-xl">
      <ChainRenderer
        chain={operations}
        setChain={setOperations}
        setOutput={setOutput}
      />
    </div>
  );
};
