export default function FieldError({ id, message }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="rs-field-error" role="alert">
      <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
      <span className="rs-field-error__text">{message}</span>
    </p>
  );
}
