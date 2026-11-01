/* oxlint-disable react(only-export-components) -- validation is co-located with its form fields. */

import FormField from "../fields/FormField";

/* -----------------------------------------
   Constants
----------------------------------------- */

const MIN_WORDS = 100;
const MAX_WORDS = 300;
const MAX_CHARACTERS = 3000;

/* -----------------------------------------
   Word Count Utility
----------------------------------------- */

// oxlint-disable-next-line react/only-export-components
export function getWordCount(value = "") {
  const normalized = value.trim();

  if (!normalized) return 0;

  return normalized.split(/\s+/).filter(Boolean).length;
}

/* -----------------------------------------
   Step 4 Validation
----------------------------------------- */

// oxlint-disable-next-line react/only-export-components
export function validateArchitecturalNarrative(formData = {}) {
  const errors = {};

  const statement = formData.applicationStatement?.trim() || "";
  const wordCount = getWordCount(statement);

  if (!statement) {
    errors.applicationStatement = "Your application statement is required.";
  } else if (wordCount < MIN_WORDS) {
    errors.applicationStatement = `Please write at least ${MIN_WORDS} words. Currently: ${wordCount}.`;
  } else if (wordCount > MAX_WORDS) {
    errors.applicationStatement = `Your statement cannot exceed ${MAX_WORDS} words. Currently: ${wordCount}.`;
  }

  if (statement.length > MAX_CHARACTERS) {
    errors.applicationStatement = `Your statement cannot exceed ${MAX_CHARACTERS} characters.`;
  }

  if (formData.acceptedTerms !== true) {
    errors.acceptedTerms =
      "You must accept the Terms & Conditions to continue.";
  }

  return errors;
}

/* -----------------------------------------
   Section Icon
----------------------------------------- */

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M8 13h8M8 17h8" />
    </svg>
  );
}

/* -----------------------------------------
   Terms Checkbox
----------------------------------------- */

function TermsCheckbox({ checked, onChange, error }) {
  const errorId = "accepted-terms-error";

  return (
    <div className="border-t border-slate-100 pt-5">
      <div className="flex items-start gap-3">
        <input
          id="acceptedTerms"
          name="acceptedTerms"
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="mt-1 h-[18px] w-[18px] shrink-0 cursor-pointer accent-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
        />

        <label
          htmlFor="acceptedTerms"
          className="cursor-pointer text-sm leading-6 text-slate-700"
        >
          I agree to the{" "}
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal-800 underline decoration-teal-300 underline-offset-2 transition hover:text-teal-600"
          >
            Terms &amp; Conditions
          </a>{" "}
          and understand that my data will be processed for the recruitment
          process.
        </label>
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-xs font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* -----------------------------------------
   Architectural Narrative Component
----------------------------------------- */

export default function ArchitecturalNarrative({
  formData = {},
  onChange,
  errors = {},
}) {
  const statement = formData.applicationStatement || "";
  const wordCount = getWordCount(statement);

  const isWithinWordLimit = wordCount >= MIN_WORDS && wordCount <= MAX_WORDS;

  return (
    <section
      aria-labelledby="architectural-narrative-heading"
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.035)] sm:p-6"
    >
      {/* Section Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e5f5f3] text-teal-800">
          <DocumentIcon />
        </div>

        <div>
          <h2
            id="architectural-narrative-heading"
            className="text-lg font-extrabold tracking-tight text-slate-950 sm:text-xl"
          >
            Architectural Narrative
          </h2>

          <p className="mt-0.5 text-xs leading-5 text-slate-600 sm:text-sm">
            Tell us about your motivation, interest, and how you align with
            Cynbit's vision.
          </p>
        </div>
      </div>

      {/* Application Statement */}
      <div>
        <FormField
          label="Why Cynbit? / Application Statement"
          name="applicationStatement"
          as="textarea"
          rows={7}
          value={statement}
          onChange={onChange}
          placeholder="Why do you want to join Cynbit, and what do you hope to contribute?

Write about your motivation, interests, technical strengths, and the value you can bring to our team."
          required
          maxLength={MAX_CHARACTERS}
          error={errors.applicationStatement}
          controlClassName="min-h-[180px] resize-y"
          helperText={`Write between ${MIN_WORDS} and ${MAX_WORDS} words.`}
        />

        {/* Live Word Counter */}
        <div
          className="mt-2 flex flex-wrap items-center justify-between gap-2"
          aria-live="polite"
        >
          <span className="text-xs text-slate-500">
            {MAX_WORDS - wordCount >= 0
              ? `${MAX_WORDS - wordCount} words remaining`
              : `${wordCount - MAX_WORDS} words over the limit`}
          </span>

          <span
            className={`text-xs font-semibold ${
              isWithinWordLimit
                ? "text-teal-700"
                : wordCount > MAX_WORDS
                  ? "text-red-600"
                  : "text-slate-500"
            }`}
          >
            {wordCount} / {MAX_WORDS} words
          </span>
        </div>

        {/* Progress indicator */}
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label="Application statement word count"
          aria-valuemin={MIN_WORDS}
          aria-valuemax={MAX_WORDS}
          aria-valuenow={Math.min(Math.max(wordCount, MIN_WORDS), MAX_WORDS)}
        >
          <div
            className={`h-full rounded-full transition-all duration-200 ${
              wordCount > MAX_WORDS
                ? "bg-red-500"
                : isWithinWordLimit
                  ? "bg-teal-600"
                  : "bg-teal-300"
            }`}
            style={{
              width: `${Math.min((wordCount / MAX_WORDS) * 100, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="mt-7">
        <TermsCheckbox
          checked={formData.acceptedTerms === true}
          onChange={onChange}
          error={errors.acceptedTerms}
        />
      </div>
    </section>
  );
}
