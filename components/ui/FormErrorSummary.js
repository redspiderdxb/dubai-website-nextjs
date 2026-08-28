export default function FormErrorSummary({ errors = {}, fieldLabels = {} }) {
  const items = Object.entries(errors).filter(([, message]) => Boolean(message));

  if (!items.length) {
    return null;
  }

  return (
    <div
      className="rs-form-error-summary"
      role="alert"
      aria-live="assertive"
      tabIndex={-1}
    >
      <div className="rs-form-error-summary__title">
        <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
        <span>Please fix the highlighted fields</span>
      </div>

      <ul>
        {items.map(([name, message]) => (
          <li key={name}>
            <a href={`#${name}`}>
              {fieldLabels[name] ? `${fieldLabels[name]}: ` : ""}
              {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
