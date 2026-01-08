import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { SAMPLE_SIZE_N } from "../../data/options";
import { SURVEY_RESULTS } from "../../data/surveyResults";
import { calculateScore } from "../../utils/scoring";

const OUTCOMES = ["Focus", "Mood", "Energy"];

const DISTRIBUTION_LABELS = [
  { key: "muchWorse", label: "Much Worse", weight: 1 },
  { key: "worse", label: "Worse", weight: 2 },
  { key: "normal", label: "Normal", weight: 3 },
  { key: "better", label: "Better", weight: 4 },
  { key: "muchBetter", label: "Much Better", weight: 5 },
];

export default function Breakdown() {
  const location = useLocation();
  const nav = useNavigate();
  const [showHowScores, setShowHowScores] = useState(false);
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
        <h1 className="text-2xl font-semibold text-textPrimary">No Data Available</h1>
        <p className="mt-4 text-textSecondary">
          Please start a new comparison from the setup page.
        </p>
        <button
          type="button"
          onClick={() => nav("/setup")}
          className="btn-primary-sm mt-8"
        >
          Start Comparison
        </button>
      </div>
    );
  }

  const renderDistributionTable = (outcomeKey, optionData, optionLabel, isOptionA) => {
    const data = optionData?.[outcomeKey];
    if (!data) return null;

    const score = calculateScore(data);

    return (
      <div className={`rounded-xl border p-4 ${isOptionA ? "border-primary/30 bg-primary/5" : "border-border bg-surface"}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full text-white text-sm flex items-center justify-center font-medium ${isOptionA ? "bg-primary" : "bg-primary/60"}`}>
              {isOptionA ? "A" : "B"}
            </span>
            <span className="font-medium text-textPrimary text-sm">{optionLabel}</span>
          </div>
          <div className="text-right">
            <div className="text-xs text-textSecondary">Score</div>
            <div className="font-bold text-primary">{score?.toFixed(2)}</div>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="py-2 text-left font-medium text-textSecondary">Response</th>
              <th className="py-2 text-right font-medium text-textSecondary">%</th>
              <th className="py-2 text-center font-medium text-textSecondary w-24">Distribution</th>
            </tr>
          </thead>
          <tbody>
            {DISTRIBUTION_LABELS.map(({ key, label }) => {
              const value = data[key] ?? 0;
              return (
                <tr key={key} className="border-b border-border/30 last:border-0">
                  <td className="py-2 text-textPrimary">{label}</td>
                  <td className="py-2 text-right text-textPrimary font-medium">{value.toFixed(1)}%</td>
                  <td className="py-2 px-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isOptionA ? "bg-primary" : "bg-primary/60"}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {/* Header with back button */}
      <div className="relative pt-4">
        <button
          type="button"
          onClick={() => nav(-1)}
          className="absolute left-0 top-4 text-textPrimary hover:text-primary transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-textPrimary text-center">
          Detailed Breakdown
        </h1>
      </div>

      <p className="mt-2 text-base text-textSecondary text-center">
        Full distribution data from survey responses
      </p>

      {/* Overview Card */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-textSecondary">Category</div>
            <div className="font-semibold text-textPrimary">{category}</div>
          </div>
          <div>
            <div className="text-textSecondary">Sample Size</div>
            <div className="font-semibold text-textPrimary">n = {SAMPLE_SIZE_N}</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">A</span>
            <span className="text-textPrimary">{optionALabel}</span>
          </div>
          <div className="flex items-center gap-2 text-sm mt-2">
            <span className="w-5 h-5 rounded-full bg-primary/60 text-white text-xs flex items-center justify-center">B</span>
            <span className="text-textPrimary">{optionBLabel}</span>
          </div>
        </div>
      </div>

      {/* Outcome Breakdowns */}
      <div className="mt-6 space-y-8">
        {sortedOutcomes.map((outcome) => {
          const isPriority = priorities?.includes(outcome);
          const scoreA = calculateScore(dataA?.[outcome]);
          const scoreB = calculateScore(dataB?.[outcome]);
          const diff = scoreA && scoreB ? (scoreA - scoreB).toFixed(2) : null;

          return (
            <div key={outcome}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-textPrimary">{outcome}</h2>
                  {isPriority && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                      Priority
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {renderDistributionTable(outcome, dataA, optionALabel, true)}
                {renderDistributionTable(outcome, dataB, optionBLabel, false)}
              </div>

              {/* Comparison insight */}
              <div className="mt-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-xs text-textSecondary">
                  {diff !== null ? (
                    Math.abs(parseFloat(diff)) < 0.2 ? (
                      `Survey respondents reported similar ${outcome.toLowerCase()} patterns for both options.`
                    ) : parseFloat(diff) > 0 ? (
                      `Survey respondents reported more positive ${outcome.toLowerCase()} patterns with "${optionALabel}" (score difference: ${diff}).`
                    ) : (
                      `Survey respondents reported more positive ${outcome.toLowerCase()} patterns with "${optionBLabel}" (score difference: ${Math.abs(parseFloat(diff)).toFixed(2)}).`
                    )
                  ) : (
                    "Unable to calculate comparison."
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimers */}
      <div className="mt-8 space-y-3">
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
          <h3 className="font-semibold text-amber-800 text-sm">Understanding These Results</h3>
          <ul className="mt-2 text-xs text-amber-700 space-y-1 list-disc pl-4">
            <li>These percentages represent survey response distributions.</li>
            <li>Results come from self-reported data, not controlled experiments.</li>
            <li>Individual experiences may vary significantly from these patterns.</li>
            <li>This is not medical or professional health advice.</li>
          </ul>
        </div>
      </div>

      {/* How Scores Link */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setShowHowScores(true)}
          className="text-primary font-medium hover:underline cursor-pointer text-sm"
        >
          How do we calculate this?
        </button>
      </div>

      {/* How Scores Modal */}
      {showHowScores && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowHowScores(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-bg rounded-2xl border border-border shadow-xl max-w-sm w-full p-5 animate-fadeIn max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-textPrimary text-center">
              How do we calculate this?
            </h2>
            
            <div className="mt-4 space-y-4 text-sm text-textSecondary leading-relaxed text-justify">
              <p>
                This score summarizes how students reported feeling in similar situations. It is based on responses from the survey that we conducted and then grouped into five categories, and each category is mapped to a 1-5 number scale.
              </p>

              {/* Scale */}
              <div className="space-y-1 text-textPrimary font-medium text-left">
                <p>1 = Much worse</p>
                <p>2 = Worse</p>
                <p>3 = Normal</p>
                <p>4 = Better</p>
                <p>5 = Much better</p>
              </div>

              <p>
                For each option, we combine the percentage of responses in each category into a single weighted score. A higher score means responses leaned more positive overall, and a lower score means that responses leaned more negative overall.
              </p>

              {/* Formula */}
              <div className="py-2 text-center">
                <p className="text-sm text-textPrimary font-medium italic leading-relaxed">
                  Score = (1 × %Much Worse + 2 × %Worse + 3 × %Normal + 4 × %Better + 5 × %Much Better) ÷ 100
                </p>
              </div>

              <p>
                However, this score does not predict what will happen to you personally. It only summarizes how students on average reported feeling in similar situations.
              </p>
            </div>
            
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setShowHowScores(false)}
                className="btn-primary-sm px-6 cursor-pointer"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Actions removed - back button in header provides navigation */}

      <p className="mt-6 mb-8 text-center text-xs text-textSecondary">
        Patterns only, not medical advice.
      </p>
    </div>
  );
}
