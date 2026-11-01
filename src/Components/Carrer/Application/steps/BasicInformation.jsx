import FormField from "../fields/FormField";
import FormSelect from "../fields/FormSelect";
import { GENDER_OPTIONS } from "./BasicInformation.validation";

// Evaluated once per page load so the controlled date field has a stable max
// value across renders.
const MAX_DATE_OF_BIRTH = new Date().toLocaleDateString("en-CA");

/* -----------------------------------------
   Section Icon
----------------------------------------- */

function UserIcon() {
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
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  );
}

/* -----------------------------------------
   Basic Information Component
----------------------------------------- */

export default function BasicInformation({
  formData = {},
  onChange,
  errors = {},
}) {
  return (
    <section
      aria-labelledby="basic-information-heading"
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.035)] sm:p-6"
    >
      {/* Section Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e5f5f3] text-teal-800">
          <UserIcon />
        </div>

        <div>
          <h2
            id="basic-information-heading"
            className="text-lg font-extrabold tracking-tight text-slate-950 sm:text-xl"
          >
            Basic Information
          </h2>

          <p className="mt-0.5 text-xs leading-5 text-slate-600 sm:text-sm">
            Let's start with your personal and contact details.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        {/* Full Name */}
        <FormField
          label="Full Name"
          name="fullName"
          value={formData.fullName || ""}
          onChange={onChange}
          placeholder="Enter your full name"
          autoComplete="name"
          maxLength={100}
          required
          error={errors.fullName}
        />

        {/* Email */}
        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email || ""}
          onChange={onChange}
          placeholder="alex@example.com"
          autoComplete="email"
          maxLength={254}
          required
          error={errors.email}
        />

        {/* Phone Number */}
        <FormField
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber || ""}
          onChange={onChange}
          placeholder="+91 9876543210"
          autoComplete="tel"
          inputMode="tel"
          maxLength={20}
          required
          error={errors.phoneNumber}
        />

        {/* WhatsApp Number */}
        <FormField
          label="WhatsApp Number"
          name="whatsappNumber"
          type="tel"
          value={formData.whatsappNumber || ""}
          onChange={onChange}
          placeholder="+91 9876543210"
          inputMode="tel"
          maxLength={20}
          required
          error={errors.whatsappNumber}
        />

        {/* Date of Birth */}
        <FormField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth || ""}
          onChange={onChange}
          autoComplete="bday"
          max={MAX_DATE_OF_BIRTH}
          required
          error={errors.dateOfBirth}
        />

        {/* Gender */}
        <FormSelect
          label="Gender"
          name="gender"
          value={formData.gender || ""}
          onChange={onChange}
          options={GENDER_OPTIONS}
          placeholder="Select gender"
          required
          error={errors.gender}
        />
      </div>
    </section>
  );
}
