export default function CareerHero() {
  return (
    <section
      aria-labelledby="career-heading"
      className="relative isolate overflow-hidden border-b border-teal-100 bg-gradient-to-r from-[#f8fcfc] via-[#f2fafa] to-[#eaf8f8]"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full bg-teal-100/60"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-52 h-[520px] w-[520px] rounded-full border border-teal-200/40"
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-11">
        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-teal-100 bg-teal-50/90 px-4 py-2 text-xs font-bold uppercase tracking-wide text-teal-800 sm:text-sm">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <rect x="3" y="7" width="18" height="14" rx="2" />
            <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
          </svg>
          Cynbit Careers
        </div>

        {/* Heading */}
        <h1
          id="career-heading"
          className="max-w-5xl text-3xl font-extrabold leading-[1.15] tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[46px]"
        >
          Explore the{" "}
          <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text italic text-transparent">
            opportunities
          </span>{" "}
          at Cynbit
        </h1>

        {/* Description */}
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          A place for thinkers, builders, and problem-solvers who want to grow,
          practice technical discipline, and create real impact through digital
          innovation.
        </p>
      </div>
    </section>
  );
}
