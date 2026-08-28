import { useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateName(value, label = "name") {
  const text = String(value || "").trim();

  if (!text) {
    return `Enter your ${label}.`;
  }

  if (text.length < 2) {
    return "Use at least 2 characters.";
  }

  if (!/[a-zA-Z\u00C0-\u024F]/.test(text)) {
    return `Enter a valid ${label}.`;
  }

  return "";
}

export function validateEmail(value) {
  const text = String(value || "").trim();

  if (!text) {
    return "Enter your email address.";
  }

  if (!EMAIL_PATTERN.test(text)) {
    return "Use a valid email address.";
  }

  return "";
}

export function validatePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");

  if (!digits) {
    return "Enter your phone number.";
  }

  if (digits.length < 7 || digits.length > 15) {
    return "Enter a valid phone number.";
  }

  return "";
}

export function validateSelect(value, message) {
  if (!String(value || "").trim()) {
    return message;
  }

  return "";
}

export function validateMessage(value, label = "message") {
  const text = String(value || "").trim();

  if (!text) {
    return `Enter your ${label}.`;
  }

  if (text.length < 10) {
    return "Add a little more detail.";
  }

  return "";
}

export function validateAgreement(value) {
  if (!value) {
    return "Accept the terms and privacy policy to continue.";
  }

  return "";
}

export function getFirstErrorField(errors, order) {
  return order.find((name) => errors[name]) || "";
}

export function focusField(id) {
  if (!id || typeof document === "undefined") {
    return;
  }

  const field = document.getElementById(id);

  if (!field) {
    return;
  }

  const wrapper =
    field.closest(".rs-form-field, .field-wrap, .rs-form-control-wrap") ||
    field;

  wrapper.classList.remove("rs-shake");
  void wrapper.offsetWidth;
  wrapper.classList.add("rs-shake");

  field.focus({ preventScroll: true });
  field.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function useFormValidation(initialValues, getFieldError) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errorFor = (name, nextValues) =>
    getFieldError(name, nextValues[name], nextValues) || "";

  const showError = (name) =>
    submitted || touched[name] ? errors[name] || "" : "";

  const isFieldValid = (name) => {
    if (!touched[name] && !submitted) {
      return false;
    }

    return !errorFor(name, values);
  };

  const fieldState = (name) => {
    if (showError(name)) {
      return "error";
    }

    if (isFieldValid(name)) {
      return "success";
    }

    return "idle";
  };

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    const nextValue = type === "checkbox" ? checked : value;
    const nextValues = {
      ...values,
      [name]: nextValue,
    };

    setValues(nextValues);

    const shouldValidate =
      submitted ||
      touched[name] ||
      type === "checkbox" ||
      type === "select-one";

    if (shouldValidate) {
      setTouched((current) => ({
        ...current,
        [name]: true,
      }));
      setErrors((current) => ({
        ...current,
        [name]: errorFor(name, nextValues),
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, type, checked, value } = event?.target || {};

    if (!name) {
      return;
    }

    const nextValue = type === "checkbox" ? checked : value;
    const nextValues = {
      ...values,
      [name]: nextValue,
    };

    setTouched((current) => ({
      ...current,
      [name]: true,
    }));

    setErrors((current) => ({
      ...current,
      [name]: errorFor(name, nextValues),
    }));
  };

  const validateAll = (nextValues = values) => {
    const nextErrors = {};
    const nextTouched = { ...touched };

    Object.keys(initialValues).forEach((name) => {
      const message = errorFor(name, nextValues);

      nextTouched[name] = true;

      if (message) {
        nextErrors[name] = message;
      }
    });

    setSubmitted(true);
    setTouched(nextTouched);
    setErrors(nextErrors);

    return nextErrors;
  };

  const applyServerErrors = (serverErrors = {}, aliases = {}) => {
    const nextErrors = {};

    Object.entries(serverErrors).forEach(([key, value]) => {
      const message = Array.isArray(value) ? value[0] : value;
      const field = aliases[key] || key;

      if (field && message) {
        nextErrors[field] = message;
      }
    });

    setSubmitted(true);
    setTouched((current) => {
      const nextTouched = { ...current };

      Object.keys(nextErrors).forEach((name) => {
        nextTouched[name] = true;
      });

      return nextTouched;
    });
    setErrors((current) => ({
      ...current,
      ...nextErrors,
    }));

    return nextErrors;
  };

  const reset = (nextValues = initialValues) => {
    setValues(nextValues);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  return {
    values,
    errors,
    touched,
    submitted,
    handleChange,
    handleBlur,
    showError,
    isFieldValid,
    fieldState,
    validateAll,
    applyServerErrors,
    reset,
  };
}
