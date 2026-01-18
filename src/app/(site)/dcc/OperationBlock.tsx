import { useEffect, useState } from "react";
import { OperationCard, OperationCardProps } from "./OperationCard";
import { OperationTree } from "./OperationTree";

export type TreeType = "none" | "upper" | "lower";

export type OperationBlockProps = OperationCardProps;

export const OperationBlock = ({operand, ...rest}: OperationBlockProps) => {
  const [output, setOutput] = useState(operand);

  useEffect(() => {
    setOutput(operand);
  }, [operand]);

  return (
    <div className="flex gap-4 items-end">
      {rest.treeType === "upper" ? (
        <>
          <OperationCard {...rest} operand={output} />
          <div className="animate-fade-right animate-duration-300 animate-ease-linear transition-width duration-300 ease-in-out">
            <OperationTree {...rest} operand={operand} setOutput={setOutput} />
          </div>
        </>
      ) : (
        <OperationCard {...rest} operand={output} />
      )}
    </div>
  );
};
