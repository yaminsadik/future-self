import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["Sleep", "Food", "Caffeine"];

export default function Setup() {
  const nav = useNavigate();

  // Parent state: this page owns the selection
  const [category, setCategory] = useState(null);

  return (
    <div className="text-center">
      <div className="mt-6 text-2xl font-semibold">Set Up Comparison</div>
      <h2 className="mt-4 text-xl text-textSecondary">Choose a category</h2>

      {/* Category buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((c) => {
          const isActive = c === category;

          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={isActive ? "btn-secondary-active" :  "btn-secondary"}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Proof that state works */}
      <div className="mt-4 text-textSecondary">Selected: {category}</div>

      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={() => nav("/results", { state: { category } })}
          className="btn-primary"
        >
          Calculate Results
        </button>
      </div>
    </div>
  );
}
