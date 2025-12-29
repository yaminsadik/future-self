import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectField from "../SelectField";
import { CATEGORY_OPTIONS } from "../../data/options";

const CATEGORIES = ["Sleep", "Food", "Caffeine"];

export default function Setup() {
  const nav = useNavigate();

  const [category, setCategory] = useState(null);
  const [selectionId, setSelectionId] = useState("");

  // If CATEGORY_OPTIONS is missing or category not selected, config becomes null (safe)
  const config = useMemo(() => {
    if (!category) return null;
    return CATEGORY_OPTIONS?.[category] ?? null;
  }, [category]);

  useEffect(() => {
  // When the category changes, reset dropdown to "no selection"
  // so the placeholder text is shown.
  setSelectionId("");
}, [category]);


  const canCalculate = Boolean(category) && Boolean(selectionId);

  return (
    <div className="text-center">
      <div className="mt-6 text-2xl font-semibold">Set Up Comparison</div>
      <h2 className="mt-4 text-xl text-textSecondary">Choose a category</h2>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((c) => {
          const isActive = c === category;

          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={isActive ? "btn-secondary-active" : "btn-secondary"}
            >
              {c}
            </button>
          );
        })}
      </div>

      {config ? (
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-sm text-left">
            <SelectField
              label={config.label ?? ""}
              value={selectionId}
              onChange={setSelectionId}
              placeholder={`Select ${category} option`}
              options={config.options ?? []}
            />
          </div>
        </div>
      ) : null}

      <div className="mt-12 flex justify-center">
        <button
          type="button"
          disabled={!canCalculate}
          onClick={() => nav("/results", { state: { category, selectionId } })}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Results
        </button>
      </div>
    </div>
  );
}
