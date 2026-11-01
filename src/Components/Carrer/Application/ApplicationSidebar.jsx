import { APPLICATION_STEPS } from "./applicationSteps";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </svg>
  );
}

function StepIndicator({ index, isActive, isCompleted }) {
  const styles = isCompleted
    ? "bg-teal-700 text-white"
    : isActive
      ? "bg-teal-700 text-white"
      : "bg-[#e4f4f2] text-teal-800";

  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${styles}`}
      aria-hidden="true"
    >
      {isCompleted ? <CheckIcon /> : index + 1}
    </span>
  );
}

function SidebarStep({ step, index, currentStep, completed, onStepChange }) {
  const isActive = currentStep === index;

  const isAccessible = index <= currentStep || completed;

  return (
    <li>
      <button
        type="button"
        disabled={!isAccessible}
        onClick={() => onStepChange(index)}
        aria-current={isActive ? "step" : undefined}
        className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors duration-200 ${
          isActive
            ? "bg-[#e5f5f3]"
            : isAccessible
              ? "hover:bg-slate-50"
              : "cursor-not-allowed opacity-65"
        }`}
      >
        <StepIndicator
          index={index}
          isActive={isActive}
          isCompleted={completed}
        />

        <span className="min-w-0 flex-1 pt-0.5">
          <span
            className={`block text-[13px] font-bold leading-snug ${
              isActive || completed ? "text-slate-950" : "text-slate-700"
            }`}
          >
            {step.title}
          </span>

          <span className="mt-1 block text-[11px] leading-[1.5] text-slate-500">
            {step.description}
          </span>
        </span>
      </button>
    </li>
  );
}

export default function ApplicationSidebar({
  currentStep,
  onStepChange,
  completedSteps = [],
}) {
  return (
    <aside
      aria-label="Application progress overview"
      className="hidden h-fit w-full rounded-2xl border border-teal-100 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)] lg:block lg:p-5"
    >
      {/* Sidebar heading */}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e5f5f3] text-teal-800">
          <LayersIcon />
        </div>

        <div>
          <h2 className="text-base font-extrabold tracking-tight text-slate-950">
            Application Steps
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-600">
            A four-part application to help us understand you better.
          </p>
        </div>
      </div>

      {/* Application steps */}
      <nav className="mt-5" aria-label="Application steps">
        <ol className="space-y-2">
          {APPLICATION_STEPS.map((step, index) => {
            const completed =
              completedSteps.includes(index) || index < currentStep;

            return (
              <SidebarStep
                key={step.id}
                step={step}
                index={index}
                currentStep={currentStep}
                completed={completed}
                onStepChange={onStepChange}
              />
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
