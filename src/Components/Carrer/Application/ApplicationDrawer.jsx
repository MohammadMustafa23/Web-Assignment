import { useCallback, useEffect, useRef, useState } from "react";

import ApplicationForm from "./ApplicationForm";

export default function ApplicationDrawer({ job, onClose }) {
  const panelRef = useRef(null);
  const formContentRef = useRef(null);
  const busyRef = useRef(false);

  const [isBusy, setIsBusy] = useState(false);

  /* -----------------------------------------
     Busy State Handler
  ----------------------------------------- */

  const handleBusyChange = useCallback((busy) => {
    const value = Boolean(busy);

    busyRef.current = value;
    setIsBusy(value);
  }, []);

  /* -----------------------------------------
     Close Drawer
  ----------------------------------------- */

  const handleClose = useCallback(() => {
    if (busyRef.current) return;

    onClose?.();
  }, [onClose]);

  /* -----------------------------------------
     Background Scroll & Keyboard Handling
  ----------------------------------------- */

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;

    document.body.style.overflow = "hidden";

    panelRef.current?.focus();

    function handleKeyDown(event) {
      // Prevent closing while submitting.
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      // Trap keyboard focus inside drawer.
      if (event.key !== "Tab") return;

      const panel = panelRef.current;

      if (!panel) return;

      const focusableElements = Array.from(
        panel.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
        ),
      ).filter((element) => element.getClientRects().length > 0);

      if (focusableElements.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        (document.activeElement === firstElement ||
          document.activeElement === panel)
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener("keydown", handleKeyDown);

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [handleClose]);

  /* -----------------------------------------
     Scroll Drawer to Top on Opening
  ----------------------------------------- */

  useEffect(() => {
    formContentRef.current?.scrollTo({
      top: 0,
          behavior: "auto",
    });
  }, [job?.id]);

  if (!job) return null;

  /* -----------------------------------------
     Render Drawer
  ----------------------------------------- */

  return (
    <div
      className="fixed inset-0 z-[120] flex justify-end bg-slate-950/50 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      {/* Right Side Drawer */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-drawer-title"
        tabIndex={-1}
        style={{
          animation: "cynbit-drawer-in 280ms ease-out",
        }}
        className="application-drawer flex h-[100dvh] w-full max-w-[950px] flex-col overflow-hidden border-l border-slate-200 bg-[#f7fbfb] shadow-2xl outline-none"
      >
        {/* Drawer Header */}
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-teal-700">
              Cynbit Careers
            </p>

            <h2
              id="application-drawer-title"
              className="mt-1 truncate text-lg font-extrabold tracking-tight text-slate-950 sm:text-xl"
            >
              {job.title}
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Complete your application · Remote / Jaipur
            </p>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            disabled={isBusy}
            aria-label="Close application drawer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
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
          </button>
        </header>

        {/* Scrollable Application Form */}
        <div
          ref={formContentRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth"
        >
          <ApplicationForm
            jobId={job.id}
            jobTitle={job.title}
            presentation="drawer"
            onClose={handleClose}
            onBusyChange={handleBusyChange}
          />
        </div>
      </aside>
    </div>
  );
}
