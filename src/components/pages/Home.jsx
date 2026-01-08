import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  const [showAbout, setShowAbout] = useState(false);
  
  return (
    <div className="flex flex-col min-h-[calc(100vh-3rem)]">
      {/* Hero Section */}
      <div className="text-center pt-8">
        <h1 className="text-4xl font-bold text-textPrimary tracking-tight">
          FutureSelf
        </h1>
        <p className="mt-2 text-lg text-textSecondary">
          Small steps, visible shifts.
        </p>
      </div>

      {/* Main Description */}
      <div className="mt-10 text-center">
        <p className="text-xl font-medium text-textPrimary leading-relaxed">
          Compare everyday choices and see how students in similar situations felt.
        </p>
      </div>

      {/* How It Works Card */}
      <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-xl font-bold text-textPrimary text-center">
          How it works
        </h2>
        <ul className="mt-6 space-y-4 text-base text-textSecondary">
          <li className="flex items-start gap-3">
            <span className="text-textSecondary mt-0.5">•</span>
            <span>
              Pick something health related to compare (<span className="font-semibold text-textPrimary">Sleep</span>, <span className="font-semibold text-textPrimary">Caffeine</span>, or <span className="font-semibold text-textPrimary">Food</span>)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-textSecondary mt-0.5">•</span>
            <span>
              Choose two options (<span className="font-semibold text-textPrimary">A</span> vs <span className="font-semibold text-textPrimary">B</span>)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-textSecondary mt-0.5">•</span>
            <span>
              Select what matters most to you (<span className="font-semibold text-textPrimary">Focus</span>, <span className="font-semibold text-textPrimary">Mood</span>, or <span className="font-semibold text-textPrimary">Energy</span>)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-textSecondary mt-0.5">•</span>
            <span>
              See how students in similar situations tended to feel (Detailed breakdown is available)
            </span>
          </li>
        </ul>
      </div>

      {/* Know More Link */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setShowAbout(true)}
          className="text-primary font-medium hover:underline cursor-pointer"
        >
          Know more about FutureSelf
        </button>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowAbout(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-bg rounded-2xl border border-border shadow-xl max-w-sm w-full p-5 animate-fadeIn">
            <h2 className="text-lg font-bold text-textPrimary text-center">
              About FutureSelf
            </h2>
            
            <div className="mt-4 space-y-3 text-sm text-textSecondary leading-relaxed text-justify">
              <p>
                FutureSelf is a student-built system that helps people compare everyday choices like sleep, food, and caffeine by showing how other people reported feeling in similar situations. The app focuses on short-term outcomes, which are defined as focus, mood, and energy. The results are based on survey patterns rather than predictions, and they are meant to highlight tradeoffs and uncertainty instead of giving instructions.
              </p>
              <p>
                FutureSelf does not use machine learning, does not personalize results, and is definitely not medical advice. The goal of the project is to support clearer thinking during stressful moments by making patterns easier to see and easier to reason about. We hope you enjoy while exploring this tool.
              </p>
            </div>
            
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAbout(false)}
                className="btn-primary-sm px-6 cursor-pointer"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to push CTA to bottom */}
      <div className="flex-1" />

      {/* CTA Section */}
      <div className="mt-10 mb-6 flex flex-col items-center">
        <p className="text-base text-textSecondary mb-4">
          Takes about 30 seconds. No account needed.
        </p>
        <button
          type="button"
          onClick={() => nav("/setup")}
          className="btn-primary-sm px-10 cursor-pointer"
        >
          Start Comparison
        </button>
        <p className="mt-4 text-sm text-textSecondary">
          Patterns only, not medical advice.
        </p>
      </div>
    </div>
  );
}
