import { useState } from "react";

import JobCard from "./JobCard";
import ApplicationDrawer from "./Application/ApplicationDrawer";

/* -----------------------------------------
   Internship Data
----------------------------------------- */

const internshipJobs = [
  {
    id: "qa-testing",
    title: "QA Testing Intern",
    category: "Tech",
    location: "Remote / Jaipur",
    description:
      "Help ensure product quality by testing features, reporting issues, and collaborating with the engineering team.",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Intern",
    category: "Marketing & Growth",
    location: "Remote / Jaipur",
    description:
      "Work on user research, wireframes, and high-fidelity designs to create intuitive and impactful experiences.",
  },
  {
    id: "full-stack",
    title: "Full Stack Developer Intern",
    category: "Tech",
    location: "Remote / Jaipur",
    description:
      "Build and ship real features, work across the stack, and collaborate with our product and design teams.",
  },
];

const categories = ["All", "Business", "Marketing & Growth", "Tech"];

/* -----------------------------------------
   Internship Openings
----------------------------------------- */

export default function InternshipOpenings() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = internshipJobs.filter((job) => {
    return selectedCategory === "All" || job.category === selectedCategory;
  });

  function handleViewDetails(job) {
    setSelectedJob(job);
  }

  function handleCloseDrawer() {
    setSelectedJob(null);
  }

  return (
    <>
      <section aria-labelledby="internship-heading" className="bg-white">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 lg:px-10 lg:pb-14">
          {/* Section Heading */}
          <div>
            <h2
              id="internship-heading"
              className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl"
            >
              Internship Openings
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Nurturing the next generation of technical and strategic
              architects.
            </p>
          </div>

          {/* Category Filters */}
          <div
            className="mt-5 flex flex-wrap items-center gap-3"
            role="group"
            aria-label="Filter internships by category"
          >
            {categories.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isActive}
                  className={`min-h-10 rounded-full border px-6 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ${
                    isActive
                      ? "border-teal-800 bg-teal-800 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-800 shadow-sm hover:border-teal-400 hover:bg-teal-50 hover:text-teal-800"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Job Cards */}
          <div
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
            aria-live="polite"
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onViewDetails={handleViewDetails}
                />
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
                <h3 className="text-lg font-bold text-slate-950">
                  No {selectedCategory} openings currently
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Check back later for new opportunities.
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className="mt-5 text-sm font-bold text-teal-800 hover:text-teal-600"
                >
                  View all openings →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RIGHT-SIDE APPLICATION DRAWER */}
      {selectedJob && (
        <ApplicationDrawer job={selectedJob} onClose={handleCloseDrawer} />
      )}
    </>
  );
}
