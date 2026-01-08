import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { SAMPLE_SIZE_N } from "../../data/options";
import { SURVEY_RESULTS } from "../../data/surveyResults";
import {
  calculateScore,
  getScoreLabel,
  getScoreBarColorClass,
  generateComparisonSummary,
} from "../../utils/scoring";

const OUTCOMES = ["Focus", "Mood", "Energy"];

export default function Results() {
  const location = useLocation();
  const nav = useNavigate();
  const {
    category,
    optionA,
    optionB,
    optionALabel,
    optionBLabel,
    priorities,
  } = location.state || {};

  const dataA = SURVEY_RESULTS[optionA];
  const dataB = SURVEY_RESULTS[optionB];

  const scores = useMemo(() => {
    const result = {};
    for (const outcome of OUTCOMES) {
      result[outcome] = {
        scoreA: calculateScore(dataA?.[outcome]),
        scoreB: calculateScore(dataB?.[outcome]),
      };
    }
    return result;
  }, [dataA, dataB]);

  const summary = useMemo(() => {
    return generateComparisonSummary(dataA, dataB, optionALabel, optionBLabel, priorities || []);
  }, [dataA, dataB, optionALabel, optionBLabel, priorities]);

  // Sort outcomes by priority
  const sortedOutcomes = useMemo(() => {
    if (!priorities || priorities.length === 0) return OUTCOMES;
    const prioritized = OUTCOMES.filter((o) => priorities.includes(o));
    const nonPrioritized = OUTCOMES.filter((o) => !priorities.includes(o));
    return [...prioritized, ...nonPrioritized];
  }, [priorities]);

  if (!category || !optionA || !optionB) {
    return (
      <div className="text-center mt-12">
        <h1 className="text-2xl font-semibold text-textPrimary">No Comparison Data</h1>
        <p className="mt-4 text-textSecondary">
          Please start a new comparison from the setup page.
        </p>
        <button
          type="button"
          onClick={() => nav("/setup")}
          className="btn-primary-sm mt-8 cursor-pointer"
        >
          Start Comparison
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header with back button */}
      <div className="relative pt-4">
        <button
          type="button"
          onClick={() => nav("/setup")}
          className="absolute left-0 top-4 text-textPrimary hover:text-primary transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-textPrimary text-center">
          Comparison Results
        </h1>
      </div>

      {/* Subheader */}
      <p className="mt-2 text-base text-textSecondary text-center">
        Based on survey response patterns
      </p>

      {/* Overview Card */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between text-sm text-textSecondary mb-4">
          <span className="uppercase tracking-wide font-medium">Category</span>
          <span className="text-textPrimary font-semibold">{category}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-lg bg-primary/10 p-3 text-center">
            <div className="text-xs text-textSecondary uppercase tracking-wide">Option A</div>
            <div className="mt-1 font-semibold text-primary text-sm">{optionALabel}</div>
          </div>
          <div className="text-textSecondary font-medium">vs</div>
          <div className="flex-1 rounded-lg bg-primary/5 p-3 text-center">
            <div className="text-xs text-textSecondary uppercase tracking-wide">Option B</div>
            <div className="mt-1 font-semibold text-primary/70 text-sm">{optionBLabel}</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
          <span className="text-textSecondary">Sample size (n)</span>
          <span className="text-textPrimary font-medium">{SAMPLE_SIZE_N} responses</span>
        </div>
      </div>

      {/* Score Comparison */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-textPrimary mb-4">
          Outcome Scores (1–5 scale)
        </h2>

        <div className="space-y-4">
          {sortedOutcomes.map((outcome) => {
            const { scoreA, scoreB } = scores[outcome];
            const isPriority = priorities?.includes(outcome);
            
            return (
              <div
                key={outcome}
                className={`rounded-xl border p-4 ${
                  isPriority ? "border-primary bg-primary/5" : "border-border bg-surface"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-textPrimary">{outcome}</span>
                    {isPriority && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        Priority
                      </span>
                    )}
                  </div>
                </div>

                {/* Score Bars */}
                <div className="space-y-3">
                  {/* Option A */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-textSecondary">A: {optionALabel}</span>
                      <span className="font-semibold text-textPrimary">
                        {scoreA?.toFixed(2) ?? "N/A"}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getScoreBarColorClass(scoreA)}`}
                        style={{ width: `${((scoreA ?? 0) / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Option B */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-textSecondary">B: {optionBLabel}</span>
                      <span className="font-semibold text-textPrimary">
                        {scoreB?.toFixed(2) ?? "N/A"}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getScoreBarColorClass(scoreB)} opacity-70`}
                        style={{ width: `${((scoreB ?? 0) / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Difference indicator */}
                {scoreA !== null && scoreB !== null && (
                  <div className="mt-3 pt-3 border-t border-border/50 text-xs text-textSecondary">
                    {Math.abs(scoreA - scoreB) < 0.2 ? (
                      <span>Similar patterns reported for both options</span>
                    ) : scoreA > scoreB ? (
                      <span>
                        Option A showed {Math.abs(scoreA - scoreB).toFixed(2)} higher score
                      </span>
                    ) : (
                      <span>
                        Option B showed {Math.abs(scoreB - scoreA).toFixed(2)} higher score
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Summary */}
      <div className="mt-6 rounded-xl border border-border bg-surface p-5">
        <h2 className="text-lg font-semibold text-textPrimary mb-3">
          Summary
        </h2>
        <p className="text-sm text-textSecondary leading-relaxed">
          {summary}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4">
        <p className="text-xs text-amber-800 leading-relaxed">
          <span className="font-semibold">Important:</span> These scores reflect survey response patterns and do not predict individual outcomes. Results may vary based on personal factors not captured in the survey.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={() =>
            nav("/breakdown", {
              state: {
                category,
                optionA,
                optionB,
                optionALabel,
                optionBLabel,
                priorities,
              },
            })
          }
          className="btn-primary-sm w-full cursor-pointer"
        >
          View Detailed Breakdown
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => nav("/setup")}
            className="btn-secondary flex-1 cursor-pointer"
          >
            New Comparison
          </button>
          <button
            type="button"
            onClick={() => nav("/")}
            className="btn-secondary flex-1 cursor-pointer"
          >
            Home
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-textSecondary">
        Based on survey patterns, not medical advice.
      </p>
    </div>
  );
}
