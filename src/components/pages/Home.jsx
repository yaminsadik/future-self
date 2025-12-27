import { useNavigate } from "react-router-dom";

export default function HomePrac() {
  const nav = useNavigate();
  return (
    <div>
    <div className="text-center">

        <div className = "mt-6 text-4xl font-semibold"> FutureSelf </div>

        <h2 className = "mt-4 text-xl text-textSecondary"> Small steps, visible shifts. </h2>
    </div>
    <div className="text-left">
        <p className="mt-6 text-xl text-textPrimary">
            What if you could A/B test your own life?
        </p>
        <p className="mt-3 text-lg text-textSecondary">
            Compare sleep, caffeine, or food-intake choices and see how the energy,
            mood, and focus of students in similar situations were impacted.
        </p>
        <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold"> How it works </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-lg text-textSecondary">
                <li> Pick a comparison (A vs B) </li>
                <li> See how those choices relate to focus, mood and energy </li>
                <li> Get a simple plan for tomorrow </li>
            </ul>
        </div>

        <div className="mt-12 flex justify-center">
            <button type = "button" onClick={() => nav("/setup")}
            className="btn-primary w-full max-w-[240px]"> Start Comparison </button>
        </div>
        <p className="mt-3 text-center text-sm text-textSecondary"> Patterns only, not medical advice. </p>

    </div>
    </div>
  );
}
