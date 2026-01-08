import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SelectField from "../SelectField";
import { CATEGORY_OPTIONS, SAMPLE_SIZE_N } from "../../data/options";
import { SURVEY_RESULTS } from "../../data/surveyResults";
import { calculateScore, getScoreBarColorClass } from "../../utils/scoring";

const CATEGORIES = ["Sleep", "Food", "Caffeine"];
const OUTCOMES = ["Focus", "Mood", "Energy"];

export default function ResultsView() {
  const location = useLocation();
  const nav = useNavigate();

  const initial = location.state || {};

  const [category, setCategory] = useState(initial.category ?? null);
  const [selectionId, setSelectionId] = useState(initial.selectionId ?? "");

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

  const data = selectionId ? SURVEY_RESULTS?.[selectionId] : null;

  const scores = useMemo(() => {
    if (!data) return {};
    const result = {};
    for (const outcome of OUTCOMES) {
      result[outcome] = calculateScore(data[outcome]);
    }
    return result;
  }, [data]);

  function handleReset() {
    setCategory(null);
    setSelectionId("");
  }

  const canShowResults = Boolean(category) && Boolean(selectionId) && Boolean(selectedLabel);

  return (
    <div>
      {/* Header */}
      <div className="mt-6 text-center">
        <h1 className="text-2xl font-semibold text-textPrimary">
          Explore Options
        </h1>
        <p className="mt-2 text-base text-textSecondary">
          Browse survey patterns for individual options
        </p>
      </div>

      {/* Category Selection */}
      <div className="mt-8">
        <p className="text-sm font-medium text-textSecondary mb-3">
          Select a category
        </p>
        <div className="flex flex-wrap gap-2">
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
      </div>

      {/* Option Selection */}
      {config && (
        <div className="mt-6">
          <SelectField
            label="Select an option"
            value={selectionId}
            onChange={setSelectionId}
            placeholder={`Choose ${category} option`}
            options={config.options ?? []}
          />
        </div>
      )}

      {/* Results Display */}
      {canShowResults && (
        <div className="mt-8 animate-fadeIn">
          {/* Overview Card */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-lg font-semibold text-textPrimary">Overview</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-textSecondary">Category</span>
                <span className="font-medium text-textPrimary">{category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Option</span>
                <span className="font-medium text-textPrimary">{selectedLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Sample size (n)</span>
                <span className="font-medium text-textPrimary">{SAMPLE_SIZE_N}</span>
              </div>
            </div>
          </div>

          {/* Scores Overview */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-textPrimary mb-4">
              Outcome Scores
            </h2>
            <div className="space-y-4">
              {OUTCOMES.map((outcome) => {
                const score = scores[outcome];
                return (
                  <div
                    key={outcome}
                    className="rounded-xl border border-border bg-surface p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-textPrimary">{outcome}</span>
                      <span className="font-semibold text-primary">
                        {score?.toFixed(2) ?? "N/A"}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getScoreBarColorClass(score)}`}
                        style={{ width: `${((score ?? 0) / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Distribution Tables */}
          <div className="mt-6 space-y-4">
            {OUTCOMES.map((outcome) => {
              const outcomeData = data?.[outcome];
              if (!outcomeData) return null;

              return (
                <div
                  key={outcome}
                  className="rounded-xl border border-border bg-surface p-4"
                >
                  <h3 className="font-semibold text-textPrimary mb-2">{outcome} Distribution</h3>
                  <p className="text-xs text-textSecondary mb-3">
                    Survey respondents who reported "{selectedLabel}"
                  </p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="py-2 text-left font-medium text-textSecondary">Response</th>
                        <th className="py-2 text-right font-medium text-textSecondary">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { key: "muchWorse", label: "Much Worse" },
                        { key: "worse", label: "Worse" },
                        { key: "normal", label: "Normal" },
                        { key: "better", label: "Better" },
                        { key: "muchBetter", label: "Much Better" },
                      ].map(({ key, label }) => (
                        <tr key={key} className="border-b border-border/30 last:border-0">
                          <td className="py-2 text-textPrimary">{label}</td>
                          <td className="py-2 text-right font-medium text-textPrimary">
                            {outcomeData[key]?.toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!canShowResults && category && (
        <div className="mt-8 rounded-xl border border-dashed border-border p-8 text-center">
          <p className="text-textSecondary">
            Select an option above to view survey patterns
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex gap-3">
        <button type="button" onClick={handleReset} className="btn-secondary flex-1">
          Reset
        </button>
        <button type="button" onClick={() => nav("/setup")} className="btn-primary-sm flex-1">
          New Comparison
        </button>
      </div>

      {/* Footer disclaimer */}
      <p className="mt-6 text-center text-xs text-textSecondary">
        Based on survey patterns, not medical advice.
      </p>
    </div>
  );
}
