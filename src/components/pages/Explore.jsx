import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SelectField from "../SelectField";
import { CATEGORY_OPTIONS, SAMPLE_SIZE_N } from "../../data/options";
import { useSurveyQuery } from "../../api/useSurveyQuery";



const CATEGORIES = ["Sleep", "Food", "Caffeine"];

export default function Explore() {
  const location = useLocation();
  const nav = useNavigate();

  const initial = location.state || {};

  const [category, setCategory] = useState(initial.category ?? null);
  const [selectionId, setSelectionId] = useState(initial.selectionId ?? "");

  const { data: surveyData, error, isLoading } = useSurveyQuery();

  const config = useMemo(() => {
    if (!category) return null;
    return CATEGORY_OPTIONS?.[category] ?? null;
  }, [category]);

  useEffect(() => {
    setSelectionId("");
  }, [category]);

  const selectedLabel = useMemo(() => {
    if (!config || !selectionId) return "";
    return config.options.find((o) => o.id === selectionId)?.label ?? "";
  }, [config, selectionId]);

  const data = selectionId ? surveyData?.[selectionId] : null;

  const createTableData = (metricData) =>
    metricData
      ? [
          { condition: "Much Worse", percentage: `${metricData.muchWorse}%` },
          { condition: "Worse", percentage: `${metricData.worse}%` },
          { condition: "Normal", percentage: `${metricData.normal}%` },
          { condition: "Better", percentage: `${metricData.better}%` },
          { condition: "Much Better", percentage: `${metricData.muchBetter}%` },
        ]
      : [];

  function handleReset() {
    setCategory(null);
    setSelectionId("");
  }

  const renderTable = (title, metricKey, metricLabel) => {
    const tableData = createTableData(data?.[metricKey]);

    return (
      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 text-left">
        <h2 className="text-2xl font-semibold">{title}</h2>

        {selectedLabel ? (
          <p className="mt-2 text-textSecondary">
            Among survey respondents who reported {selectedLabel}, here is how
            they rated their {metricLabel}.
          </p>
        ) : (
          <p className="mt-2 text-textSecondary">
            Select an option to see results.
          </p>
        )}

        <table className="mt-4 w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 text-left font-semibold">Condition</th>
              <th className="py-3 text-left font-semibold">Percentage</th>
            </tr>
          </thead>

          <tbody>
            {tableData.length ? (
              tableData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-3 text-textSecondary">{row.condition}</td>
                  <td className="py-3 text-textPrimary">{row.percentage}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-3 text-textSecondary">—</td>
                <td className="py-3 text-textSecondary">—</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const canShowResults =
    Boolean(category) && Boolean(selectionId) && Boolean(selectedLabel);

  return (
    <div className="text-center">
      <div className="mt-6 text-2xl font-semibold">Explore</div>
      <h2 className="mt-4 text-xl text-textSecondary">
        Choose a category and option
      </h2>

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

      

      {canShowResults ? (
        <>
        <div className="mt-8 rounded-2xl border border-border bg-surface p-4 text-left">
      <h2 className="text-2xl font-semibold">Overview</h2>

      <div className="mt-4 text-lg text-textSecondary">
        Category: <span className="text-textPrimary">{category}</span>
      </div>

      <div className="mt-4 text-lg text-textSecondary">
        Selected option: <span className="text-textPrimary">{selectedLabel}</span>
      </div>

      <div className="mt-4 text-lg text-textSecondary">
        Survey matches (n): <span className="text-textPrimary">{SAMPLE_SIZE_N}</span>
      </div>
    </div>
        
          {renderTable("Mood", "Mood", "mood")}
          {renderTable("Energy", "Energy", "energy")}
          {renderTable("Focus", "Focus", "focus")}
        </>
      ) : null}

      <div className="mt-8 flex justify-center gap-3">
  <button type="button" onClick={handleReset} className="btn-primary-sm">
    Reset
  </button>

  <button type="button" onClick={() => nav("/home")} className="btn-primary-sm">
    Home
  </button>
</div>

    </div>
  );
}
