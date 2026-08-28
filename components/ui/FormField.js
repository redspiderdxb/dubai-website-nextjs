import FieldError from "./FieldError";

export default function FormField({
  id,
  label,
  required = false,
  error = "",
  className = "",
  fullWidth = false,
  hideLabel = false,
  children,
}) {
  const hasError = Boolean(error);

  return (
    <div
      className={[
        "rs-form-field",
        fullWidth ? "rs-form-field--full" : "",
        hasError ? "is-invalid" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && !hideLabel && (
        <label htmlFor={id} className="rs-form-label">
          {label}
          {required ? (
            <span className="rs-form-required" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      )}

      <div className="rs-form-control-wrap">{children}</div>

      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
