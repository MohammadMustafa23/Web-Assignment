import { useId } from "react";

export default function FormField({
  id,
  name,
  label,
  type = "text",
  as = "input",
  value = "",
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  readOnly = false,
  error,
  helperText,
  rows = 4,
  maxLength,
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

  const isTextarea = as === "textarea";
  const hasError = Boolean(error);

  // Connect helper and error messages to the input.
  const describedBy =
    [ariaDescribedBy, helperText ? helperId : null, hasError ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const baseControlStyles =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 " +
    "placeholder:text-slate-400 transition-colors duration-200 " +
    "outline-none focus-visible:ring-2 focus-visible:ring-offset-1 " +
    "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

  const stateStyles = hasError
    ? "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-200"
    : "border-slate-200 hover:border-slate-300 focus-visible:border-teal-600 focus-visible:ring-teal-100";

  const controlStyles = [
    baseControlStyles,
    stateStyles,
    isTextarea ? "min-h-28 resize-y leading-6" : "min-h-12",
    controlClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const commonProps = {
    id: fieldId,
    name,
    value,
    onChange,
    placeholder,
    required,
    disabled,
    readOnly,
    maxLength,
    "aria-invalid": hasError,
    "aria-describedby": describedBy,
    className: controlStyles,
    ...rest,
  };

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

      {/* Input / Textarea */}
      {isTextarea ? (
        <textarea {...commonProps} rows={rows} />
      ) : (
        <input {...commonProps} type={type} />
      )}

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
