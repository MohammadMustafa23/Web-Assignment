import { useEffect, useRef } from "react";

/* -----------------------------------------
   Icons
----------------------------------------- */

function CloseIcon() {
  return (
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
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 animate-spin"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="m10.3 3.9-8.1 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.8-3.1l-8.1-14a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}

/* -----------------------------------------
   Application Confirmation
----------------------------------------- */

export default function ApplicationConfirm({
  open = false,
  jobTitle = "Selected Position",
  applicantName = "",
  applicantEmail = "",
  onConfirm,
  onCancel,
  isSubmitting = false,
  submitError = null,
}) {
  const dialogRef = useRef(null);

  // Synchronize native dialog with React state.
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Handle Escape key.
  function handleCancel(event) {
    event.preventDefault();

    if (!isSubmitting) {
      onCancel?.();
    }
  }

  // Handle backdrop click.
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget && !isSubmitting) {
      onCancel?.();
    }
  }

  // Prevent duplicate confirmation clicks.
  function handleConfirm() {
    if (isSubmitting || !onConfirm) return;

    onConfirm();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="application-confirm-title"
      aria-describedby="application-confirm-description"
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/50 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-800">
              <CheckIcon />
            </div>

            <h2
              id="application-confirm-title"
              className="mt-4 text-xl font-extrabold tracking-tight text-slate-950"
            >
              Confirm your application
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Final review before submission.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            aria-label="Close confirmation"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Description */}
        <p
          id="application-confirm-description"
          className="mt-6 text-sm leading-6 text-slate-600"
        >
          Please review your application details before continuing. Once
          submitted, your application will be sent for review.
        </p>

        {/* Application Summary */}
        <div className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Applied Position
            </p>

            <p className="mt-1 break-words text-sm font-bold text-slate-950">
              {jobTitle}
            </p>
          </div>

          <div className="h-px bg-slate-200" />

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Applicant Name
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {applicantName || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Email Address
            </p>

            <p className="mt-1 break-all text-sm font-semibold text-slate-800">
              {applicantEmail || "Not provided"}
            </p>
          </div>
        </div>

        {/* Submission Error */}
        {submitError && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
          >
            <span className="text-red-600">
              <WarningIcon />
            </span>

            <div>
              <p className="text-sm font-bold text-red-800">
                Submission unsuccessful
              </p>

              <p className="mt-1 text-xs leading-5 text-red-700">
                {submitError}
              </p>

              <p className="mt-2 text-xs text-red-600">
                Your application has not been confirmed as submitted. Please try
                again.
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Review Application
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting || !onConfirm}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-teal-800 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-teal-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Spinner />
                Submitting...
              </>
            ) : submitError ? (
              <>
                Retry Submission
                <CheckIcon />
              </>
            ) : (
              <>
                Confirm &amp; Submit
                <CheckIcon />
              </>
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
}
