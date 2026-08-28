export default function FormAlert({ type = "info", message }) {
  if (!message || !type) {
    return null;
  }

  const icon =
    type === "success"
      ? "bi-check-circle-fill"
      : type === "error"
        ? "bi-exclamation-triangle-fill"
        : "bi-info-circle-fill";

  return (
    <div
      className={`rs-form-alert rs-form-alert--${type}`}
      role="alert"
      aria-live="polite"
    >
      <i className={`bi ${icon}`} aria-hidden="true"></i>
      <span>{message}</span>
    </div>
  );
}
