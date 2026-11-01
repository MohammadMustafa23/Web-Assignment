import { useId } from "react";

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 text-slate-500"
      aria-hidden="true"
    >
      <path
        d="m7 10 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FormSelect({
  id,
  name,
  label,
  value = "",
  onChange,
  options = [],
  placeholder = "Select an option",
  required = false,
  disabled = false,
  error,
  helperText,
  wrapperClassName = "",
  controlClassName = "",
  labelClassName = "",
  ariaDescribedBy,
  ...rest
}) {
  const generatedId = useId();

  const fieldId = id || generatedId;
  const errorId = `${fieldId}-error`;
  const helperId = `${fieldId}-helper`;

  const hasError = Boolean(error);

  // Associate helper and error messages with the select.
  const describedBy =
    [ariaDescribedBy, helperText ? helperId : null, hasError ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const selectStyles = [
    "min-h-12 w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-11",
    "text-sm outline-none transition-colors duration-200",
    "focus-visible:ring-2 focus-visible:ring-offset-1",
    "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400",
    value === "" ? "text-slate-400" : "text-slate-900",
    hasError
      ? "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-200"
      : "border-slate-200 hover:border-slate-300 focus-visible:border-teal-600 focus-visible:ring-teal-100",
    controlClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`w-full ${wrapperClassName}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={fieldId}
          className={[
            "mb-2 block text-sm font-semibold text-slate-800",
            labelClassName,
          ].join(" ")}
        >
          {label}

          {required && (
            <>
              <span className="ml-1 text-red-500" aria-hidden="true">
                *
              </span>
              <span className="sr-only"> (required)</span>
            </>
          )}
        </label>
      )}

      {/* Select wrapper */}
      <div className="relative">
        <select
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          className={selectStyles}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown icon */}
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
          <ChevronDownIcon />
        </span>
      </div>

      {/* Helper text */}
      {helperText && (
        <p id={helperId} className="mt-1.5 text-xs leading-5 text-slate-500">
          {helperText}
        </p>
      )}

      {/* Validation error */}
      {hasError && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 flex items-start gap-1.5 text-xs font-medium leading-5 text-red-600"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="mt-0.5 h-3.5 w-3.5 shrink-0"
            aria-hidden="true"
          >
            <circle
              cx="10"
              cy="10"
              r="8"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M10 6v5M10 14h.01"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {error}
        </p>
      )}
    </div>
  );
}
