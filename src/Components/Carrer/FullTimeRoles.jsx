import { useState } from "react";

import ApplicationDrawer from "./Application/ApplicationDrawer";

/* -----------------------------------------
   Full-Time Job Data
----------------------------------------- */

const fullTimeJobs = [
  {
    id: "business-development",
    title: "Business Development Executive",
    team: "Growth Team",
    location: "Remote / Jaipur",
    experience: "Sales/client acquisition.",
  },
  {
    id: "content-strategist",
    title: "Content Strategist",
    team: "Growth Team",
    location: "Remote / Jaipur",
    experience: "Content + SEO strategy.",
  },
  {
    id: "growth-manager",
    title: "Growth Manager",
    team: "Growth Team",
    location: "Remote / Jaipur",
    experience: "Lead generation and growth strategies.",
  },
  {
    id: "marketing-executive",
    title: "Marketing Executive",
    team: "Growth Team",
    location: "Remote / Jaipur",
    experience: "1–2 Years. Driving brand presence.",
  },
  {
    id: "devops-cloud",
    title: "DevOps / Cloud Engineer",
    team: "Core Engineering Team",
    location: "Remote / Jaipur",
    experience: "AWS, Docker, deployment pipelines.",
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    team: "Core Engineering Team",
    location: "Remote / Jaipur",
    experience: "1–3 Years. Focused on high-performance APIs.",
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    team: "Core Engineering Team",
    location: "Remote / Jaipur",
    experience: "1–3 Years. Engineering autonomous agents.",
  },
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    team: "Core Engineering Team",
    location: "Remote / Jaipur",
    experience: "1–3 Years. Architecting scalable digital ecosystems.",
  },
];

/* -----------------------------------------
   Full-Time Job Card
----------------------------------------- */

function FullTimeJobCard({ job, onViewDetails }) {
  return (
    <article className="flex flex-col rounded-[26px] border border-white bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)] sm:p-6">
      {/* Team and Location */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-500">
          {job.team}
        </span>

        <span className="shrink-0 rounded-full bg-slate-200 px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-slate-700">
          {job.location}
        </span>
      </div>

      {/* Job Information */}
      <div className="mt-5">
        <h3 className="text-lg font-bold leading-snug tracking-tight text-slate-950 sm:text-xl">
          {job.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Experience: {job.experience}
        </p>
      </div>

      {/* View Details */}
      <button
        type="button"
        onClick={() => onViewDetails(job)}
        aria-label={`Open application for ${job.title}`}
        className="group mt-5 flex min-h-11 w-full items-center justify-center rounded-full border border-slate-100 bg-slate-100/80 px-4 text-[11px] font-bold uppercase tracking-wider text-blue-700 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        View Details
      </button>
    </article>
  );
}

/* -----------------------------------------
   Main Full-Time Roles Section
----------------------------------------- */

export default function FullTimeRoles() {
  const [selectedJob, setSelectedJob] = useState(null);

  function handleViewDetails(job) {
    setSelectedJob(job);
  }

  function handleCloseDrawer() {
    setSelectedJob(null);
  }

  return (
    <>
      <section
        id="full-time-roles"
        aria-labelledby="fulltime-heading"
        className="bg-[#f4f7f7]"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          {/* Section Heading */}
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700">
              Join Our Team
            </span>

            <h2
              id="fulltime-heading"
              className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl"
            >
              Full-Time Opportunities
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Explore full-time opportunities to work on larger challenges and
              drive long-term impact.
            </p>
          </div>

          {/* Job Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-5">
            {fullTimeJobs.map((job) => (
              <FullTimeJobCard
                key={job.id}
                job={job}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Shared Right-Side Application Drawer */}
      {selectedJob && (
        <ApplicationDrawer
          key={selectedJob.id}
          job={selectedJob}
          onClose={handleCloseDrawer}
        />
      )}
    </>
  );
}
