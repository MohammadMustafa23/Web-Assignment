const Icon = ({ name, className = "h-5 w-5" }) => {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    map: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 16 9 5 9-5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </>
    ),
    cloud: (
      <path d="M7 18h11a4 4 0 0 0 .5-8A6.5 6.5 0 0 0 6 8a5 5 0 0 0 1 10Z" />
    ),
    code: (
      <>
        <path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V11h4v9M10 20V5h4v15M16 20v-7h4v7" />
      </>
    ),
    link: (
      <>
        <path d="m10 13.5 4-3M8 16l-1 1a4 4 0 0 1-5.7-5.7l4-4A4 4 0 0 1 11 7" />
        <path d="m16 8 1-1a4 4 0 0 1 5.7 5.7l-4 4A4 4 0 0 1 13 17" />
      </>
    ),
  };

  return (
    <svg
      {...common}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
};

function HeroVisual() {
  return (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-[540px] items-center justify-center"
      aria-hidden="true"
    >
      {/* Background glow */}
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,_rgba(13,148,136,0.16),_transparent_68%)]" />

      {/* Background geometric layers */}
      <div className="absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[30px] border border-teal-100 bg-teal-50/30" />

      <div className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[25px] border border-teal-100/80" />

      {/* Connection lines */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 h-full w-full text-teal-500/60"
        fill="none"
      >
        <path
          d="M250 250 145 155 108 155"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M250 250 355 125 395 125"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M250 250 395 255 435 255"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M250 250 145 350 108 350"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M250 250 355 360 395 360"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M250 250 250 92" stroke="currentColor" strokeWidth="1.5" />

        {[
          [145, 155],
          [355, 125],
          [395, 255],
          [145, 350],
          [355, 360],
          [250, 92],
        ].map(([x, y], index) => (
          <circle key={index} cx={x} cy={y} r="4" fill="#0d9488" />
        ))}
      </svg>

      {/* Central platform */}
      <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div className="flex h-24 w-28 -rotate-6 items-center justify-center rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-500 to-teal-800 shadow-[0_20px_35px_rgba(13,148,136,0.28)] sm:h-28 sm:w-32">
          <Icon name="link" className="h-12 w-12 text-white" />
        </div>

        <div className="-mt-3 h-4 w-32 rounded-b-xl border-x border-b border-teal-200 bg-teal-100 shadow-lg sm:w-36" />
        <div className="-mt-1 h-3 w-28 rounded-b-xl bg-teal-200/80 sm:w-32" />
      </div>

      {/* AI node */}
      <div className="absolute left-[21%] top-[23%] z-20 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-white text-xl font-bold text-teal-600 shadow-lg shadow-teal-900/10 sm:h-16 sm:w-16 sm:text-2xl">
        AI
      </div>

      {/* Uptime card */}
      <div className="absolute left-[49%] top-[7%] z-20 rounded-2xl border border-white bg-white/95 px-4 py-3 shadow-xl shadow-teal-900/10">
        <span className="block text-[9px] font-bold uppercase tracking-wider text-teal-600">
          Uptime
        </span>
        <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          99.99%
          <span className="ml-1 text-teal-500">•</span>
        </span>
      </div>

      {/* Cloud node */}
      <div className="absolute right-[12%] top-[25%] z-20 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-white text-teal-700 shadow-xl shadow-teal-900/10 sm:h-16 sm:w-16">
        <Icon name="cloud" className="h-8 w-8" />
      </div>

      {/* Database node */}
      <div className="absolute left-[12%] top-[43%] z-20 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-white text-teal-700 shadow-xl shadow-teal-900/10 sm:h-16 sm:w-16">
        <Icon name="database" className="h-7 w-7" />
      </div>

      {/* Code node */}
      <div className="absolute right-[7%] top-[47%] z-20 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-white text-teal-700 shadow-xl shadow-teal-900/10 sm:h-16 sm:w-16">
        <Icon name="code" className="h-7 w-7" />
      </div>

      {/* Analytics node */}
      <div className="absolute bottom-[17%] left-[22%] z-20 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-white text-teal-700 shadow-xl shadow-teal-900/10 sm:h-16 sm:w-16">
        <Icon name="chart" className="h-8 w-8" />
      </div>

      {/* Growth card */}
      <div className="absolute bottom-[18%] right-[18%] z-20 rounded-2xl border border-white bg-white/95 px-4 py-3 shadow-xl shadow-teal-900/10">
        <span className="block text-[9px] font-bold uppercase tracking-wider text-emerald-600">
          Growth
        </span>
        <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          +140%
          <span className="ml-1 text-emerald-500">↗</span>
        </span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f7fbfc]">
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-teal-100/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-5 pb-14 pt-12 sm:px-8 lg:grid-cols-2 lg:gap-6 lg:px-10 lg:pb-16 lg:pt-16">
        {/* Hero content */}
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-xs font-semibold tracking-wide text-teal-800 sm:text-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100">
              <Icon name="chart" className="h-4 w-4" />
            </span>
            Success Blueprints
          </div>

          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[58px]">
            From Challenges to{" "}
            <span className="block bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text italic text-transparent">
              Scalable Solutions
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            We build autonomous AI agents, custom software, and scalable digital
            solutions for modern organizations.
          </p>

          {/* CTA buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-teal-800 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-900/15 transition duration-200 hover:-translate-y-0.5 hover:bg-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              Start a Discovery
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href="#case-studies"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-teal-800/40 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 transition duration-200 hover:-translate-y-0.5 hover:border-teal-800 hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              View Our Work
              <span aria-hidden="true">▷</span>
            </a>
          </div>

          {/* Company metadata */}
          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-slate-700 sm:text-sm">
            <div className="flex items-center gap-2">
              <Icon name="map" className="h-4 w-4 text-slate-800" />
              Jaipur, India
            </div>

            <span className="hidden h-5 w-px bg-slate-300 sm:block" />

            <div className="flex items-center gap-2">
              <Icon name="layers" className="h-4 w-4 text-slate-800" />
              AI &amp; Software Solutions
            </div>

            <span className="hidden h-5 w-px bg-slate-300 sm:block" />

            <div className="flex items-center gap-2">
              <Icon name="calendar" className="h-4 w-4 text-slate-800" />
              Flexible Engagements
            </div>
          </div>
        </div>

        {/* Hero illustration */}
        <div className="relative">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
