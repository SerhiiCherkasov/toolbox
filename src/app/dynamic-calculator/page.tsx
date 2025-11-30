
import { CalculatorRenderer } from "./CalculatorRenderer";

export default function DynamicCalculator() {
  return (
    <main className="flex flex-col p-8 gap-8">
      <header>
        <h1>Dynamic Chain Calculator</h1>
      </header>
      <div>
        <p>Use this calculator to create and manage dynamic calculation chains. </p>
      </div>
      <section>
        <CalculatorRenderer />
      </section>
    </main>
  );
}
