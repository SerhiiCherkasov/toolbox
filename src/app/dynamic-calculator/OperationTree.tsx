import { useEffect, useState } from "react";
import { OperationCardProps } from "./OperationCard";
import { OperationRenderer } from "./OperationRenderer";

type OperationTreeProps = OperationCardProps & {
  setOutput: (output: number) => void;
};

export const OperationTree = (props: OperationTreeProps) => {
  const { treeInput, treeContent, operand, setOutput, treeLabel, onChange } =
    props;
  const [input, setInput] = useState(treeInput || operand || 0);
  const [inputLabel, setInputLabel] = useState<string>(treeLabel || "Input");
  const [operations, setOperations] = useState(treeContent || []);

  useEffect(() => {
    onChange({
      ...props,
      treeContent: operations,
      treeInput: input,
      treeLabel: inputLabel,
    });
  }, [operations]);

  return (
    <div className="p-4 border border-[var(--border-base)] rounded-t-xl rounded-r-xl">
      <OperationRenderer
        operations={operations}
        setOperations={setOperations}
        setOutput={setOutput}
        input={input}
        setInput={setInput}
        inputLabel={inputLabel}
        setInputLabel={setInputLabel}
      />
    </div>
  );
};
