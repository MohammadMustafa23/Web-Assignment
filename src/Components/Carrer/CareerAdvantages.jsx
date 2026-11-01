const advantages = [
  {
    id: 1,
    title: "Continuous tech learning",
    description:
      "Work on real problems and keep upskilling with modern tools and practices.",
    icon: "learning",
  },
  {
    id: 2,
    title: "Radical flexibility",
    description:
      "A culture that values focus, ownership, and a healthy work–life balance.",
    icon: "flexibility",
  },
  {
    id: 3,
    title: "High-impact ownership",
    description:
      "Get the space to take initiative and see your work make a real difference.",
    icon: "impact",
  },
];

function AdvantageIcon({ type }) {
  const icons = {
    learning: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 16 9 5 9-5" />
      </>
    ),
    flexibility: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </>
    ),
    impact: (
      <>
        <path d="M14 6c3-3 7-3 7-3s0 4-3 7l-5 5-4-4 5-5Z" />
        <path d="m9 11-4 1-2 5 6-2M13 15l-1 4-5 2 2-6" />
        <circle cx="16" cy="8" r="1.5" />
      </>
    ),
  };

  return (
    <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-2xl bg-[#e5f6f5] text-teal-700 transition duration-300 group-hover:bg-teal-700 group-hover:text-white">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
        aria-hidden="true"
      >
        {icons[type]}
      </svg>
    </div>
  );
}

function AdvantageCard({ title, description, icon }) {
  return (
    <article className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white/80 p-5 shadow-[0_3px_12px_rgba(15,23,42,0.03)] transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-[0_12px_28px_rgba(13,148,136,0.09)] sm:p-5">
      <AdvantageIcon type={icon} />

      <div className="min-w-0">
        <h3 className="text-lg font-bold leading-snug tracking-tight text-slate-950 sm:text-xl">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </article>
  );
}

export default function CareerAdvantages() {
  return (
    <section aria-labelledby="career-advantages-heading" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-14">
        {/* Section heading */}
        <div className="mb-7">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700 sm:text-sm">
            The Cynbit Advantage
          </span>

          <h2
            id="career-advantages-heading"
            className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl"
          >
            Why build with us?
          </h2>
        </div>

        {/* Advantage cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {advantages.map((advantage) => (
            <AdvantageCard key={advantage.id} {...advantage} />
          ))}
        </div>
      </div>
    </section>
  );
}
