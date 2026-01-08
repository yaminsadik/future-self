import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HowScores() {
  const nav = useNavigate();
  const [showThingsToKnow, setShowThingsToKnow] = useState(false);

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
          How do we calculate this?
        </h1>
      </div>

      {/* Content */}
      <div className="mt-6 space-y-5 text-base text-textSecondary leading-relaxed text-justify">
        <p>
          This score summarizes how students reported feeling in similar situations. It is based on responses from the survey that we conducted and then grouped into five categories, and each category is mapped to a 1-5 number scale.
        </p>

        {/* Scale */}
        <div className="space-y-1 text-textPrimary font-medium">
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
        <div className="py-4 text-center">
          <p className="text-base text-textPrimary font-medium italic leading-relaxed">
            Score = (1 × %Much Worse + 2 × %Worse + 3 × %Normal + 4 × %Better + 5 × %Much Better) ÷ 100
          </p>
        </div>

        <p>
          However, this score does not predict what will happen to you personally. It only summarizes how students on average reported feeling in similar situations.
        </p>
      </div>

      {/* Things to know link */}
      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => setShowThingsToKnow(true)}
          className="text-primary font-medium hover:underline cursor-pointer"
        >
          Things to know about these results
        </button>
      </div>

      {/* Things to Know Modal */}
      {showThingsToKnow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowThingsToKnow(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-bg rounded-2xl border border-border shadow-xl max-w-sm w-full p-5 animate-fadeIn">
            <h2 className="text-lg font-bold text-textPrimary text-center">
              Things to Know
            </h2>
            
            <ul className="mt-4 space-y-3 text-sm text-textSecondary leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-textSecondary mt-0.5">•</span>
                <span>These percentages represent survey response distributions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-textSecondary mt-0.5">•</span>
                <span>Results come from self-reported data, not controlled experiments.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-textSecondary mt-0.5">•</span>
                <span>Individual experiences may vary significantly from these patterns.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-textSecondary mt-0.5">•</span>
                <span>This is not medical or professional health advice.</span>
              </li>
            </ul>
            
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setShowThingsToKnow(false)}
                className="btn-primary-sm px-6 cursor-pointer"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
