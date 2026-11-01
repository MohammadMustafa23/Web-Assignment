import { APPLICATION_STEPS } from "./applicationSteps";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
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

export default function ApplicationStepper({ currentStep, onStepChange }) {
  return (
    <div aria-label="Application progress" className="w-full">
      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-[12.5%] right-[12.5%] top-[15px] h-[2px] bg-slate-200">
          <div
            className="h-full bg-teal-700 transition-all duration-300"
            style={{
              width: `${(currentStep / (APPLICATION_STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-4 gap-2">
          {APPLICATION_STEPS.map((step, index) => {
            const completed = index < currentStep;
            const active = index === currentStep;
            const accessible = index <= currentStep;

            return (
              <button
                key={step.id}
                type="button"
                disabled={!accessible}
                onClick={() => onStepChange(index)}
                aria-current={active ? "step" : undefined}
                aria-label={`Step ${index + 1}: ${step.title}${completed ? ", completed" : active ? ", current" : ", locked"}`}
                className={`group flex flex-col items-center text-center ${
                  accessible ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                {/* Circle */}
                <span
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${
                    completed
                      ? "border-teal-700 bg-teal-700 text-white"
                      : active
                        ? "border-teal-700 bg-teal-700 text-white shadow-[0_0_0_4px_rgba(13,148,136,0.12)]"
                        : "border-slate-300 bg-white text-slate-600"
                  }`}
                >
                  {completed ? <CheckIcon /> : index + 1}
                </span>

                {/* Label */}
                <span
                  className={`mt-3 max-w-36 text-[10px] font-semibold leading-tight transition-colors sm:text-xs ${
                    active || completed ? "text-teal-800" : "text-slate-500"
                  }`}
                >
                  {step.shortTitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
