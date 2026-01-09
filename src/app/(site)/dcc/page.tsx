// import { CalculatorRenderer } from "./CalculatorRenderer";
"use client";

import { useState } from "react";

export type TreeType = "none" | "upper" | "lower";

export type ChainItem = {
  id: number;
  label?: string;
  input: number;
  slug: OperationType;
  operand?: number;
  treeType: TreeType;
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
  input: 0,
  slug: "pass",
  operand: 0,
  treeType: "none",
};

export default function DynamicCalculator() {
  const [chain, setChain] = useState<ChainItem[]>([initialChainItem]);

  

  return (
    <main className="flex flex-col p-8 gap-8">
      <header>
        <h1>Dynamic Chain Calculator</h1>
      </header>
      <div className="flex flex-col gap-4 max-w-[550px]">
        <p>
          Use this calculator to create and manage dynamic calculation chains.
          It starts with some input value, and then you can add math operations
          to change it.{" "}
        </p>
        <p>
          Each operation can be as a result of separate subchain of calculations
          or as direct input.
        </p>{" "}
        <p>
          If you want to try the same calculations but with a different input or
          change one or more values in the chain - you can do it without
          necessity to repeat all other operations.
        </p>
        <p>Any chain can be saved to use it in the future.</p>
        <p>
          IMPORTANT! All data are stored locally in your browser. We are not
          collecting any user information.
        </p>
      </div>
      <section>{/* <CalculatorRenderer /> */}</section>
    </main>
  );
}
