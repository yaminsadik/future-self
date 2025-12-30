import { useEffect } from "react";

export default function WhySeeingModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      {/* Modal */}
      <div className="relative flex h-full items-center justify-center p-4">
        <div className="w-[92%] max-w-[420px] sm:max-w-[460px] rounded-card border border-border bg-modal px-6 py-8 text-textPrimary">

          <h2 className="text-center text-2xl font-semibold">
            Why am I seeing this?
          </h2>

          <ul className="mt-6 list-disc space-y-4 pl-6 text-base sm:text-lg">

            <li>
              These results come from survey responses, but it is not a clinical
              study.
            </li>
            <li>We compare people who reported Option A vs Option B.</li>
            <li>
              Confidence reflects the sample size and separation of responses.
            </li>
            <li>
              Lastly, use this for small experiments. Do not think of it as
              medical advice.
            </li>
          </ul>

          <div className="mt-8 flex justify-center">
            <button type="button" onClick={onClose} className="btn-primary-sm">
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
