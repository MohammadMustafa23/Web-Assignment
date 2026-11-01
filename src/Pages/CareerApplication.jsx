import { useParams, useSearchParams, Link } from "react-router-dom";

import Navbar from "../CommonLayout/Navbar";
import Footer from "../CommonLayout/Footer";

import ApplicationForm from "../Components/Carrer/Application/ApplicationForm";

/* -----------------------------------------
   Helpers
----------------------------------------- */

function formatJobTitle(jobId) {
  if (!jobId) return "Selected Role";

  return jobId
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

/* -----------------------------------------
   Not Found State
----------------------------------------- */

function InvalidApplication() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#f7fbfb] px-5 py-16">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-8 w-8"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5M12 16h.01" />
          </svg>
        </div>

        <h1 className="mt-5 text-2xl font-extrabold text-slate-950">
          Invalid Application Link
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          This application link is invalid or the selected position could not be
          identified.
        </p>

        <Link
          to="/careers"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-800 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-900"
        >
          Explore Opportunities
        </Link>
      </div>
    </main>
  );
}

/* -----------------------------------------
   Career Application Page
----------------------------------------- */

export default function CareerApplication() {
  const { jobId } = useParams();

  const [searchParams] = useSearchParams();

  const suppliedTitle = searchParams.get("title");

  const isValidJobId =
    typeof jobId === "string" && /^[a-zA-Z0-9_-]{1,100}$/.test(jobId);

  // URL-based title survives browser refresh.
  const jobTitle = suppliedTitle?.trim().slice(0, 120) || formatJobTitle(jobId);

  return (
    <>
      <Navbar />

      {isValidJobId ? (
        <main className="min-h-screen w-full bg-[#f7fbfb]">
          <ApplicationForm jobId={jobId} jobTitle={jobTitle} />
        </main>
      ) : (
        <InvalidApplication />
      )}

      <Footer />
    </>
  );
}
