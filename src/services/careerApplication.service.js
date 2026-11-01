/* =========================================
   CAREER APPLICATION SERVICE
   =========================================

   Responsibilities:
   - Local application draft persistence
   - Draft expiry and versioning
   - Backend application submission
   - API error normalization
   - Duplicate in-flight submission protection

   ========================================= */

/* -----------------------------------------
   Configuration
----------------------------------------- */

const STORAGE_VERSION = 1;
const DRAFT_EXPIRY_DAYS = 30;
const REQUEST_TIMEOUT = 20000;

const STORAGE_PREFIX = "cynbit:career-application:draft";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

const APPLICATION_ENDPOINT =
  import.meta.env.VITE_CAREER_APPLICATION_API_URL ||
  `${API_BASE_URL}/api/career-applications`;

/* -----------------------------------------
   In-flight Request Registry
----------------------------------------- */

// Prevent concurrent duplicate requests for the same role/email.
const pendingSubmissions = new Map();

/* -----------------------------------------
   Custom Service Error
----------------------------------------- */

export class CareerApplicationServiceError extends Error {
  constructor({
    message,
    userMessage,
    code = "CAREER_APPLICATION_ERROR",
    status = null,
    cause,
  }) {
    super(message || userMessage || "Application service error.");

    this.name = "CareerApplicationServiceError";
    this.userMessage = userMessage || "Something went wrong.";
    this.code = code;
    this.status = status;
    this.cause = cause;
  }
}

/* -----------------------------------------
   Storage Utilities
----------------------------------------- */

function getStorage() {
  if (typeof window === "undefined") {
    throw new CareerApplicationServiceError({
      code: "STORAGE_UNAVAILABLE",
      userMessage: "Browser storage is unavailable.",
    });
  }

  try {
    return window.localStorage;
  } catch (error) {
    throw new CareerApplicationServiceError({
      code: "STORAGE_ACCESS_DENIED",
      userMessage:
        "We couldn't access browser storage. Check your browser privacy settings.",
      cause: error,
    });
  }
}

function getDraftKey(jobId) {
  if (typeof jobId !== "string" || !jobId.trim() || jobId.length > 200) {
    throw new CareerApplicationServiceError({
      code: "INVALID_JOB_ID",
      userMessage: "A valid job ID is required for draft storage.",
    });
  }

  return `${STORAGE_PREFIX}:v${STORAGE_VERSION}:${encodeURIComponent(
    jobId.trim(),
  )}`;
}

function getExpiryDate() {
  const date = new Date();

  date.setDate(date.getDate() + DRAFT_EXPIRY_DAYS);

  return date.toISOString();
}

function isValidDraftEnvelope(envelope, jobId) {
  return (
    envelope !== null &&
    typeof envelope === "object" &&
    envelope.storageVersion === STORAGE_VERSION &&
    envelope.jobId === jobId &&
    envelope.data !== null &&
    typeof envelope.data === "object" &&
    typeof envelope.savedAt === "string" &&
    typeof envelope.expiresAt === "string"
  );
}

/* -----------------------------------------
   1. Load Application Draft
----------------------------------------- */

export async function loadApplicationDraft(jobId) {
  const storage = getStorage();
  const key = getDraftKey(jobId);

  try {
    const storedValue = storage.getItem(key);

    if (!storedValue) {
      return null;
    }

    let envelope;

    try {
      envelope = JSON.parse(storedValue);
    } catch {
      // Remove corrupted storage data.
      storage.removeItem(key);
      return null;
    }

    if (!isValidDraftEnvelope(envelope, jobId.trim())) {
      storage.removeItem(key);
      return null;
    }

    const expiryTime = Date.parse(envelope.expiresAt);

    if (!Number.isFinite(expiryTime) || expiryTime <= Date.now()) {
      storage.removeItem(key);
      return null;
    }

    return envelope.data;
  } catch (error) {
    if (error instanceof CareerApplicationServiceError) {
      throw error;
    }

    throw new CareerApplicationServiceError({
      code: "DRAFT_LOAD_FAILED",
      userMessage:
        "We couldn't restore your application draft. You can continue with a new application.",
      cause: error,
    });
  }
}

/* -----------------------------------------
   2. Save Application Draft
----------------------------------------- */

export async function saveApplicationDraft(jobId, snapshot) {
  const storage = getStorage();
  const key = getDraftKey(jobId);

  if (
    !snapshot ||
    typeof snapshot !== "object" ||
    snapshot.jobId !== jobId ||
    !snapshot.formData ||
    typeof snapshot.formData !== "object"
  ) {
    throw new CareerApplicationServiceError({
      code: "INVALID_DRAFT_DATA",
      userMessage: "Your application data could not be saved.",
    });
  }

  const envelope = {
    storageVersion: STORAGE_VERSION,
    jobId: jobId.trim(),
    savedAt: new Date().toISOString(),
    expiresAt: getExpiryDate(),
    data: snapshot,
  };

  try {
    const serialized = JSON.stringify(envelope);

    // Keep draft storage bounded.
    if (serialized.length > 250000) {
      throw new CareerApplicationServiceError({
        code: "DRAFT_TOO_LARGE",
        userMessage:
          "Your application draft is too large to save in this browser.",
      });
    }

    storage.setItem(key, serialized);

    return {
      success: true,
      savedAt: envelope.savedAt,
      expiresAt: envelope.expiresAt,
    };
  } catch (error) {
    if (error instanceof CareerApplicationServiceError) {
      throw error;
    }

    throw new CareerApplicationServiceError({
      code: "DRAFT_SAVE_FAILED",
      userMessage:
        "Unable to save your draft. Check your browser storage and try again.",
      cause: error,
    });
  }
}

/* -----------------------------------------
   3. Delete Application Draft
----------------------------------------- */

export async function deleteApplicationDraft(jobId) {
  const storage = getStorage();
  const key = getDraftKey(jobId);

  try {
    storage.removeItem(key);

    return {
      success: true,
    };
  } catch (error) {
    throw new CareerApplicationServiceError({
      code: "DRAFT_DELETE_FAILED",
      userMessage: "The saved draft could not be removed.",
      cause: error,
    });
  }
}

/* -----------------------------------------
   Submission Utilities
----------------------------------------- */

function createIdempotencyKey() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `career-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

async function parseResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      throw new CareerApplicationServiceError({
        code: "INVALID_API_RESPONSE",
        status: response.status,
        userMessage:
          "The server returned an invalid response. Please try again.",
      });
    }
  }

  // Do not expose arbitrary server HTML or text to applicants.
  return null;
}

function normalizeApiError(status) {
  if (status === 400 || status === 422) {
    return {
      code: "VALIDATION_FAILED",
      userMessage:
        "Some application information was rejected. Please review your details.",
    };
  }

  if (status === 409) {
    return {
      code: "APPLICATION_CONFLICT",
      userMessage:
        "An application for this role may already exist. Please contact the recruitment team.",
    };
  }

  if (status === 429) {
    return {
      code: "RATE_LIMITED",
      userMessage:
        "Too many requests. Please wait a moment before trying again.",
    };
  }

  if (status >= 500) {
    return {
      code: "SERVER_ERROR",
      userMessage:
        "The recruitment server is temporarily unavailable. Please try again later.",
    };
  }

  return {
    code: "REQUEST_FAILED",
    userMessage: "We couldn't submit your application. Please try again.",
  };
}

/* -----------------------------------------
   4. Submit Career Application
----------------------------------------- */

async function performSubmission({ jobId, jobTitle, applicant }) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT);

  const { acceptedTerms, ...applicantDetails } = applicant;

  if (acceptedTerms !== true) {
    throw new CareerApplicationServiceError({
      code: "CONSENT_REQUIRED",
      userMessage: "Please accept the Terms & Conditions before submitting.",
    });
  }

  const payload = {
    jobId,
    jobTitle,
    applicant: applicantDetails,
    consent: {
      termsAccepted: true,
      acceptedAt: new Date().toISOString(),
    },
  };

  try {
    const response = await fetch(APPLICATION_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Idempotency-Key": createIdempotencyKey(),
      },
      credentials: "same-origin",
      signal: controller.signal,
      body: JSON.stringify(payload),
    });

    const responseData = await parseResponse(response);

    if (!response.ok) {
      const normalizedError = normalizeApiError(response.status);

      throw new CareerApplicationServiceError({
        ...normalizedError,
        status: response.status,
      });
    }

    if (responseData?.success === false) {
      throw new CareerApplicationServiceError({
        code: "APPLICATION_REJECTED",
        userMessage:
          "Your application was not accepted by the server. Please try again.",
        status: response.status,
      });
    }

    // Normalize successful API responses.
    return {
      success: true,
      applicationId:
        responseData?.applicationId ||
        responseData?.data?.applicationId ||
        null,
      data: responseData?.data || responseData || null,
    };
  } catch (error) {
    if (error instanceof CareerApplicationServiceError) {
      throw error;
    }

    if (error.name === "AbortError") {
      throw new CareerApplicationServiceError({
        code: "REQUEST_TIMEOUT",
        userMessage:
          "The submission took too long. Check your connection and retry. The server may have received your previous request.",
        cause: error,
      });
    }

    if (error instanceof TypeError || error instanceof DOMException) {
      throw new CareerApplicationServiceError({
        code: "NETWORK_ERROR",
        userMessage:
          "Unable to connect to the recruitment server. Please check your internet connection.",
        cause: error,
      });
    }

    throw new CareerApplicationServiceError({
      code: "SUBMISSION_FAILED",
      userMessage:
        "An unexpected error occurred while submitting your application.",
      cause: error,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function submitCareerApplication({ jobId, jobTitle, applicant }) {
  if (
    typeof jobId !== "string" ||
    !jobId.trim() ||
    typeof jobTitle !== "string" ||
    !jobTitle.trim() ||
    !applicant ||
    typeof applicant !== "object"
  ) {
    throw new CareerApplicationServiceError({
      code: "INVALID_APPLICATION",
      userMessage:
        "Please provide valid application information before submitting.",
    });
  }

  const email = applicant.email?.trim().toLowerCase();

  if (!email) {
    throw new CareerApplicationServiceError({
      code: "INVALID_APPLICANT_EMAIL",
      userMessage: "A valid applicant email is required.",
    });
  }

  const requestKey = `${jobId.trim()}:${email}`;

  // Reuse the currently running request for identical role/email.
  if (pendingSubmissions.has(requestKey)) {
    return pendingSubmissions.get(requestKey);
  }

  const request = performSubmission({
    jobId: jobId.trim(),
    jobTitle: jobTitle.trim(),
    applicant,
  }).finally(() => {
    pendingSubmissions.delete(requestKey);
  });

  pendingSubmissions.set(requestKey, request);

  return request;
}
