import { useState } from "react";
import { OperationCard, OperationCardProps } from "./OperationCard";
import { OperationTree } from "./OperationTree";

export type TreeType = "none" | "upper" | "lower";

export type OperationBlockProps = OperationCardProps;

export const OperationBlock = (props: OperationBlockProps) => {
  const [output, setOutput] = useState(props.operand);

  return (
    <div className="flex gap-4 items-end">
      {props.treeType === "upper" ? (
        <>
          <OperationCard {...props} operand={output} />
          <div className="animate-fade-right animate-duration-300 animate-ease-linear transition-width duration-300 ease-in-out">
            <OperationTree {...props} setOutput={setOutput} />
          </div>
        </>
      ) : (
        <OperationCard {...props} operand={output} />
      )}
    </div>
  );
};
