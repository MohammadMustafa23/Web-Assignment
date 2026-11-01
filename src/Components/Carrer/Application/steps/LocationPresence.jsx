/* oxlint-disable react(only-export-components) -- validation is co-located with its form fields. */

import FormField from "../fields/FormField";

/* -----------------------------------------
   URL Validation Helpers
----------------------------------------- */

function parseHttpUrl(value) {
  const input = value.trim();

  if (!input || /\s/.test(input)) {
    return null;
  }

  // Support URLs pasted without https://
  const normalized = /^[a-z][a-z\d+.-]*:\/\//i.test(input)
    ? input
    : `https://${input}`;

  try {
    const url = new URL(normalized);

    if (
      !["http:", "https:"].includes(url.protocol) ||
      !url.hostname.includes(".") ||
      url.hostname.startsWith(".") ||
      url.hostname.endsWith(".")
    ) {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

function isValidHttpUrl(value) {
  return Boolean(parseHttpUrl(value));
}

function isValidLinkedInUrl(value) {
  const url = parseHttpUrl(value);

  if (!url) return false;

  const hostname = url.hostname.toLowerCase();

  const isLinkedInDomain =
    hostname === "linkedin.com" || hostname.endsWith(".linkedin.com");

  if (!isLinkedInDomain) return false;

  return /^\/(in|pub)\/[^/]+\/?$/i.test(url.pathname);
}

/* -----------------------------------------
   Step 3 Validation
----------------------------------------- */

// oxlint-disable-next-line react/only-export-components
export function validateLocationPresence(formData = {}) {
  const errors = {};

  const currentCity = formData.currentCity?.trim() || "";
  const permanentAddress = formData.permanentAddress?.trim() || "";
  const portfolioResumeLink = formData.portfolioResumeLink?.trim() || "";
  const linkedInUrl = formData.linkedInUrl?.trim() || "";
  const professionalProfiles = formData.professionalProfiles?.trim() || "";

  // Current City
  if (!currentCity) {
    errors.currentCity = "Current city is required.";
  } else if (currentCity.length < 2) {
    errors.currentCity = "Please enter a valid city name.";
  } else if (currentCity.length > 100) {
    errors.currentCity = "City name cannot exceed 100 characters.";
  }

  // Permanent Address
  if (!permanentAddress) {
    errors.permanentAddress = "Permanent address is required.";
  } else if (permanentAddress.length < 5) {
    errors.permanentAddress = "Please enter a complete address.";
  } else if (permanentAddress.length > 500) {
    errors.permanentAddress = "Address cannot exceed 500 characters.";
  }

  // Portfolio / Resume
  if (!portfolioResumeLink) {
    errors.portfolioResumeLink = "Portfolio or resume link is required.";
  } else if (portfolioResumeLink.length > 2048) {
    errors.portfolioResumeLink = "URL is too long.";
  } else if (!isValidHttpUrl(portfolioResumeLink)) {
    errors.portfolioResumeLink = "Enter a valid portfolio or resume URL.";
  }

  // LinkedIn
  if (!linkedInUrl) {
    errors.linkedInUrl = "LinkedIn profile URL is required.";
  } else if (linkedInUrl.length > 2048) {
    errors.linkedInUrl = "URL is too long.";
  } else if (!isValidLinkedInUrl(linkedInUrl)) {
    errors.linkedInUrl =
      "Enter a valid LinkedIn profile URL (linkedin.com/in/...).";
  }

  // Optional Professional Profiles
  if (professionalProfiles) {
    if (professionalProfiles.length > 2048) {
      errors.professionalProfiles = "Maximum 2048 characters allowed.";
    } else {
      const profiles = professionalProfiles
        .split(/[,\n]+/)
        .map((profile) => profile.trim())
        .filter(Boolean);

      if (profiles.length > 5) {
        errors.professionalProfiles =
          "You can provide a maximum of 5 profile links.";
      } else {
        const invalidProfiles = profiles.filter(
          (profile) => !isValidHttpUrl(profile),
        );

        if (invalidProfiles.length > 0) {
          errors.professionalProfiles =
            "One or more profile URLs are invalid. Check the links.";
        }
      }
    }
  }

  return errors;
}

/* -----------------------------------------
   Section Icon
----------------------------------------- */

function LocationIcon() {
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
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* -----------------------------------------
   Location & Presence Component
----------------------------------------- */

export default function LocationPresence({
  formData = {},
  onChange,
  errors = {},
}) {
  return (
    <section
      aria-labelledby="location-presence-heading"
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.035)] sm:p-6"
    >
      {/* Section Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e5f5f3] text-teal-800">
          <LocationIcon />
        </div>

        <div>
          <h2
            id="location-presence-heading"
            className="text-lg font-extrabold tracking-tight text-slate-950 sm:text-xl"
          >
            Location &amp; Presence
          </h2>

          <p className="mt-0.5 text-xs leading-5 text-slate-600 sm:text-sm">
            Share your current location and online presence.
          </p>
        </div>
      </div>

      {/* Location Fields */}
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        {/* Current City */}
        <FormField
          label="Current City"
          name="currentCity"
          value={formData.currentCity || ""}
          onChange={onChange}
          placeholder="Enter your current city"
          autoComplete="address-level2"
          maxLength={100}
          required
          error={errors.currentCity}
        />

        {/* Permanent Address */}
        <FormField
          label="Permanent Address"
          name="permanentAddress"
          as="textarea"
          rows={3}
          value={formData.permanentAddress || ""}
          onChange={onChange}
          placeholder="Enter your complete permanent address"
          autoComplete="street-address"
          maxLength={500}
          required
          controlClassName="min-h-[76px]"
          error={errors.permanentAddress}
        />
      </div>

      {/* Professional Links */}
      <div className="mt-5 space-y-5">
        {/* Portfolio / Resume */}
        <FormField
          label="Portfolio / Resume Link"
          name="portfolioResumeLink"
          type="url"
          value={formData.portfolioResumeLink || ""}
          onChange={onChange}
          placeholder="https://your-portfolio.com or https://drive.google.com/..."
          maxLength={2048}
          required
          helperText="You can share a portfolio link (e.g., personal website, Notion, Google Drive) or your resume link."
          error={errors.portfolioResumeLink}
        />

        {/* LinkedIn and Professional Profiles */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          <FormField
            label="LinkedIn Profile URL"
            name="linkedInUrl"
            type="url"
            value={formData.linkedInUrl || ""}
            onChange={onChange}
            placeholder="https://www.linkedin.com/in/your-profile"
            maxLength={2048}
            required
            error={errors.linkedInUrl}
          />

          <FormField
            label="Professional Profiles"
            name="professionalProfiles"
            value={formData.professionalProfiles || ""}
            onChange={onChange}
            placeholder="GitHub / Behance / Other"
            maxLength={2048}
            helperText="Optional. Separate multiple links with commas or new lines (up to 5)."
            error={errors.professionalProfiles}
          />
        </div>
      </div>
    </section>
  );
}
