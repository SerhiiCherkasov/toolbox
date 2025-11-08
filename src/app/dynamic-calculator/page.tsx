
import { CalculatorRenderer } from "./CalculatorRenderer";

export default function DynamicCalculator() {
  return (
    <main className="flex flex-col p-8 gap-8">
      <header>
        <h1>Dynamic Calculator</h1>
      </header>
      <section>
        <CalculatorRenderer />
      </section>
    </main>
  );
}
