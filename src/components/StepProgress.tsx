const STEPS = ["Select State", "Select Category", "Choose Course", "Checkout"] as const;

export default function StepProgress({ current }: { current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-2 sm:gap-3" aria-label="Course selection progress">
      {STEPS.map((label, index) => {
        const step = index + 1;
        const isActive = step === current;
        const isDone = step < current;
        return (
          <li key={label} className="flex items-center gap-2 sm:gap-3">
            {index > 0 && <span className="hidden h-px w-6 bg-primary-light sm:block" aria-hidden />}
            <span
              className={[
                "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition",
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : isDone
                    ? "bg-primary-light text-primary-dark"
                    : "bg-white text-slate ring-1 ring-primary-light",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                  isActive
                    ? "bg-seal text-primary-dark"
                    : isDone
                      ? "bg-primary text-white"
                      : "bg-surface text-slate",
                ].join(" ")}
              >
                {isDone ? "✓" : step}
              </span>
              <span className={isActive ? "inline" : "hidden sm:inline"}>{label}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
