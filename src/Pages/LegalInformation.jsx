import Navbar from "../CommonLayout/Navbar";
import Footer from "../CommonLayout/Footer";

const pageContent = {
  terms: {
    title: "Terms of Use",
    intro:
      "These terms describe the general rules for using this demonstration website and its careers application form.",
    sections: [
      {
        title: "Use of this website",
        text: "Use the site lawfully and provide accurate information when submitting an application. Do not attempt to disrupt, misuse, or gain unauthorized access to the site.",
      },
      {
        title: "Career applications",
        text: "Submitting an application does not create an employment agreement. Application details are reviewed according to the recruitment process for the selected role.",
      },
    ],
  },
  privacy: {
    title: "Privacy Notice",
    intro:
      "This page explains how information entered in the careers form is handled in this demonstration application.",
    sections: [
      {
        title: "Information you provide",
        text: "The application form collects contact, education, location, and professional profile information that is relevant to a job application.",
      },
      {
        title: "Local drafts",
        text: "Unsubmitted drafts are stored only in your browser for up to 30 days. You can remove them by clearing this website’s local storage in your browser settings.",
      },
      {
        title: "Submitted applications",
        text: "When a recruitment API is configured, the application is sent to that service for review. The receiving organization’s production privacy policy should govern how submitted information is retained and used.",
      },
    ],
  },
  cookies: {
    title: "Cookie Notice",
    intro:
      "This demonstration website does not set optional analytics or advertising cookies.",
    sections: [
      {
        title: "Browser storage",
        text: "The careers form uses browser local storage only to preserve an unfinished application draft on the current device.",
      },
      {
        title: "Your choices",
        text: "You can remove locally stored data at any time through your browser’s site-data or local-storage controls.",
      },
    ],
  },
};

export default function LegalInformation({ documentName }) {
  const content = pageContent[documentName] || pageContent.terms;

  return (
    <>
      <Navbar />

      <main className="min-h-[60vh] bg-[#f7fbfb] px-5 py-12 sm:px-8 lg:py-16">
        <article className="mx-auto max-w-3xl rounded-3xl border border-teal-100 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700">
            Cynbit legal information
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            {content.title}
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600">
            {content.intro}
          </p>

          <div className="mt-8 space-y-7">
            {content.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-bold text-slate-900">
                  {section.title}
                </h2>
                <p className="mt-2 leading-7 text-slate-600">{section.text}</p>
              </section>
            ))}
          </div>

          <p className="mt-10 border-t border-slate-100 pt-5 text-sm text-slate-500">
            For questions, contact{" "}
            <a
              href="mailto:hello@cynbit.in"
              className="font-semibold text-teal-800 underline decoration-teal-300 underline-offset-2"
            >
              hello@cynbit.in
            </a>
            .
          </p>
        </article>
      </main>

      <Footer />
    </>
  );
}
