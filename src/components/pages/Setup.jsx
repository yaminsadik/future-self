import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORY_OPTIONS } from "../../data/options";

const CATEGORIES = [
  { id: "Sleep", label: "Sleep", icon: "🌙" },
  { id: "Food", label: "Food", icon: "🥗" },
  { id: "Caffeine", label: "Caffeine", icon: "☕" },
];

const OUTCOMES = [
  { id: "Focus", label: "Focus" },
  { id: "Mood", label: "Mood" },
  { id: "Energy", label: "Energy" },
];

export default function Setup() {
  const nav = useNavigate();

  const [category, setCategory] = useState(null);
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [priorities, setPriorities] = useState([]);
  const [showOutcomeDropdown, setShowOutcomeDropdown] = useState(false);
  const [showDropdownA, setShowDropdownA] = useState(false);
  const [showDropdownB, setShowDropdownB] = useState(false);

  const config = useMemo(() => {
    if (!category) return null;
    return CATEGORY_OPTIONS?.[category] ?? null;
  }, [category]);

  useEffect(() => {
    setOptionA("");
    setOptionB("");
  }, [category]);

  const togglePriority = (id) => {
    setPriorities((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const optionALabel = config?.options.find((o) => o.id === optionA)?.label ?? "";
  const optionBLabel = config?.options.find((o) => o.id === optionB)?.label ?? "";

  const canContinue = Boolean(optionA) && Boolean(optionB) && optionA !== optionB && priorities.length > 0;

  const getPlaceholder = () => {
    if (category === "Sleep") return "Select a sleep range";
    if (category === "Food") return "Select a food option";
    if (category === "Caffeine") return "Select a caffeine amount";
    return "Select an option";
  };

  const handleContinue = () => {
    if (canContinue) {
      nav("/results", {
        state: {
          category,
          optionA,
          optionB,
          optionALabel,
          optionBLabel,
          priorities,
        },
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-3rem)] flex flex-col">
      {/* Header with back button */}
      <div className="relative pt-4">
        <button
          type="button"
          onClick={() => nav("/")}
          className="absolute left-0 top-4 text-textPrimary hover:text-primary transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-textPrimary text-center">
          Set Up Comparison
        </h1>
      </div>

      {/* Choose a category */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-lg font-semibold text-textPrimary text-center">
          Choose a category
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {CATEGORIES.map((c) => {
            const isActive = c.id === category;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary/10 border-primary"
                    : "bg-surface border-border hover:border-primary/50"
                }`}
              >
                <span className="text-3xl mb-2">{c.icon}</span>
                <span className={`text-sm font-medium ${isActive ? "text-primary" : "text-textPrimary"}`}>
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rest of content only shows when category is selected */}
      {category && (
        <>
          {/* Now choose two options */}
          <p className="mt-6 text-center text-textSecondary">
            Now choose two options to compare
          </p>

          {/* Option A */}
          <div className="mt-4 rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-lg font-bold text-textPrimary">Option A</h3>
            <div className="mt-3 relative">
              <button
                type="button"
                onClick={() => {
                  setShowDropdownA(!showDropdownA);
                  setShowDropdownB(false);
                }}
                className={`w-full rounded-full border bg-surface px-4 py-3 pr-12 text-base text-left transition-colors cursor-pointer ${
                  showDropdownA ? "border-primary ring-2 ring-primary/20" : "border-primary"
                }`}
              >
                <span className={optionA ? "text-textPrimary" : "text-textSecondary"}>
                  {optionA ? config?.options.find((o) => o.id === optionA)?.label : getPlaceholder()}
                </span>
              </button>
              <span className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-textSecondary transition-transform ${showDropdownA ? "rotate-180" : ""}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>

              {/* Dropdown */}
              {showDropdownA && (
                <div className="absolute z-10 mt-2 w-full rounded-xl border border-border bg-surface shadow-lg overflow-hidden">
                  {config?.options
                    .filter((o) => o.id !== optionB)
                    .map((o) => {
                      const isSelected = o.id === optionA;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => {
                            setOptionA(o.id);
                            setShowDropdownA(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-textPrimary hover:bg-gray-50"
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </div>

          {/* Option B */}
          <div className="mt-4 rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-lg font-bold text-textPrimary">Option B</h3>
            <div className="mt-3 relative">
              <button
                type="button"
                onClick={() => {
                  setShowDropdownB(!showDropdownB);
                  setShowDropdownA(false);
                }}
                className={`w-full rounded-full border bg-surface px-4 py-3 pr-12 text-base text-left transition-colors cursor-pointer ${
                  showDropdownB ? "border-primary ring-2 ring-primary/20" : "border-primary"
                }`}
              >
                <span className={optionB ? "text-textPrimary" : "text-textSecondary"}>
                  {optionB ? config?.options.find((o) => o.id === optionB)?.label : getPlaceholder()}
                </span>
              </button>
              <span className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-textSecondary transition-transform ${showDropdownB ? "rotate-180" : ""}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>

              {/* Dropdown */}
              {showDropdownB && (
                <div className="absolute z-10 mt-2 w-full rounded-xl border border-border bg-surface shadow-lg overflow-hidden">
                  {config?.options
                    .filter((o) => o.id !== optionA)
                    .map((o) => {
                      const isSelected = o.id === optionB;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => {
                            setOptionB(o.id);
                            setShowDropdownB(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-textPrimary hover:bg-gray-50"
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </div>

          {/* Explanatory text */}
          <p className="mt-6 text-center text-sm text-textSecondary leading-relaxed px-2">
            Based on survey responses, we estimate how each option tends to affect focus, energy, and mood. Select what matters most to you so results are ordered accordingly.
          </p>

          {/* What outcomes do you prioritize? */}
          <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-lg font-bold text-textPrimary text-center">
              What outcomes do you prioritize?
            </h3>
            <div className="mt-3 relative">
              <button
                type="button"
                onClick={() => setShowOutcomeDropdown(!showOutcomeDropdown)}
                className="w-full rounded-full border border-border bg-surface px-4 py-3 pr-12 text-base text-left focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <span className={priorities.length > 0 ? "text-textPrimary" : "text-textSecondary"}>
                  {priorities.length > 0
                    ? priorities.join(", ")
                    : "Select one or more outcomes"}
                </span>
              </button>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-textSecondary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>

              {/* Dropdown */}
              {showOutcomeDropdown && (
                <div className="absolute z-10 mt-2 w-full rounded-xl border border-border bg-surface shadow-lg">
                  {OUTCOMES.map((outcome) => {
                    const isSelected = priorities.includes(outcome.id);
                    return (
                      <button
                        key={outcome.id}
                        type="button"
                        onClick={() => togglePriority(outcome.id)}
                        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl cursor-pointer"
                      >
                        <span className="text-textPrimary">{outcome.label}</span>
                        <span
                          className={`w-5 h-5 rounded border flex items-center justify-center text-xs ${
                            isSelected
                              ? "bg-primary border-primary text-white"
                              : "border-border"
                          }`}
                        >
                          {isSelected && "✓"}
                        </span>
                      </button>
                    );
                  })}
                  <div className="border-t border-border p-2">
                    <button
                      type="button"
                      onClick={() => setShowOutcomeDropdown(false)}
                      className="w-full py-2 text-sm text-primary font-medium cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Continue button */}
      <div className="mt-8 mb-6 flex justify-center">
        <button
          type="button"
          disabled={!canContinue}
          onClick={handleContinue}
          className={`px-12 py-3 rounded-xl text-base font-medium transition-all ${
            canContinue
              ? "bg-primary text-white hover:bg-primary/90 cursor-pointer"
              : "bg-primary/50 text-white/80 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
