function LocationIcon() {
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
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function JobCard({ job, onViewDetails }) {
  function handleViewDetails() {
    if (typeof onViewDetails === "function") {
      onViewDetails(job);
    }
  }

  return (
    <article className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg sm:p-6">
      <h3 className="text-xl font-bold leading-snug tracking-tight text-slate-950">
        {job.title}
      </h3>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-teal-50 px-4 py-1.5 text-xs font-semibold text-teal-800">
          {job.category}
        </span>

        <span className="inline-flex items-center gap-2 text-sm text-slate-600">
          <LocationIcon />
          {job.location}
        </span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
        {job.description}
      </p>

      <button
        type="button"
        onClick={handleViewDetails}
        aria-label={`View details for ${job.title}`}
        className="group mt-5 inline-flex w-fit items-center gap-3 rounded-lg py-2 text-sm font-bold text-teal-800 transition hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-4"
      >
        View Details
        <ArrowRightIcon />
      </button>
    </article>
  );
}
