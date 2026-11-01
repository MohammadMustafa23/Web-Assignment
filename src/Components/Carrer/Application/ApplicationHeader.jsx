const TOTAL_STEPS = 4;

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9M9 20v-7h6v7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <path
        d="m7 4 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ApplicationHeader({
  jobTitle = "Selected Role",
  currentStep = 0,
}) {
  const safeStep = Number.isInteger(currentStep)
    ? Math.min(Math.max(currentStep, 0), TOTAL_STEPS - 1)
    : 0;

  const stepNumber = safeStep + 1;

  return (
    <section
      aria-labelledby="application-heading"
      className="relative overflow-hidden bg-gradient-to-r from-[#f8fcfc] via-[#f0fafa] to-[#eaf8f7]"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-80 w-80 rounded-full bg-teal-100/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-7 pt-4 sm:px-8 sm:pb-9 lg:px-10">
        {/* Breadcrumb and Step Badge */}
        <div className="flex items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 sm:gap-2 sm:text-sm">
              <li className="flex shrink-0 items-center">
                <a
                  href="/"
                  aria-label="Home"
                  className="rounded text-slate-600 transition hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  <HomeIcon />
                </a>
              </li>

              <li aria-hidden="true">
                <ChevronRight />
              </li>

              <li className="shrink-0">
                <a href="/careers" className="transition hover:text-teal-800">
                  Careers
                </a>
              </li>

              <li aria-hidden="true">
                <ChevronRight />
              </li>

              <li className="min-w-0 max-w-[130px] truncate sm:max-w-[220px]">
                <span title={jobTitle} className="font-medium text-slate-800">
                  {jobTitle}
                </span>
              </li>

              <li aria-hidden="true">
                <ChevronRight />
              </li>

              <li
                aria-current="page"
                className="shrink-0 font-semibold text-teal-800"
              >
                Apply
              </li>
            </ol>
          </nav>

          {/* Step Badge */}
          <div
            className="flex shrink-0 items-center rounded-full border border-teal-100 bg-[#d9f2ef] px-3 py-1.5 text-xs font-extrabold tracking-wide text-teal-800 sm:px-5 sm:py-2 sm:text-sm"
            aria-label={`Step ${stepNumber} of ${TOTAL_STEPS}`}
          >
            STEP {stepNumber}
          </div>
        </div>

        {/* Main Heading */}
        <div className="mt-5 sm:mt-6">
          <h1
            id="application-heading"
            className="text-3xl font-extrabold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[42px]"
          >
            Submit your{" "}
            <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text italic text-transparent">
              blueprint
            </span>
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Complete the required fields to begin your architectural review.
          </p>
        </div>
      </div>
    </section>
  );
}
