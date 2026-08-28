import { useEffect, useId, useRef, useState } from "react";

export default function ThemedSelect({
  name,
  id,
  value = "",
  onChange,
  onBlur,
  options = [],
  required = false,
  disabled = false,
  invalid = false,
  className = "",
  variant = "light",
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const listId = useId();
  const selectId = id || name;

  const selected = options.find((option) => option.value === value);
  const label = selected?.label || options[0]?.label || "";
  const isPlaceholder = !selected || selected.disabled || selected.value === "";

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const emitChange = (nextValue) => {
    if (typeof onChange === "function") {
      onChange({
        target: {
          name,
          value: nextValue,
          type: "select-one",
        },
      });
    }
  };

  const handleSelect = (option) => {
    if (option.disabled || disabled) {
      return;
    }

    emitChange(option.value);
    setOpen(false);
  };

  const emitBlur = (event) => {
    if (open) {
      return;
    }

    if (rootRef.current?.contains(event.relatedTarget)) {
      return;
    }

    if (typeof onBlur === "function") {
      onBlur({
        target: {
          name,
          value,
          type: "select-one",
        },
      });
    }
  };

  return (
    <div
      ref={rootRef}
      className={`rs-themed-select rs-themed-select--${variant} ${
        open ? "is-open" : ""
      } ${invalid ? "is-invalid" : ""} ${className}`.trim()}
    >
      <select
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        className="rs-themed-select-native"
        onChange={onChange}
      >
        {options.map((option) => (
          <option
            key={`${option.value}-${option.label}`}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        id={selectId}
        className={`rs-themed-select-trigger ${
          isPlaceholder ? "is-placeholder" : ""
        }`}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={invalid || undefined}
        aria-required={required || undefined}
        aria-describedby={ariaDescribedBy}
        onBlur={emitBlur}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{label}</span>
        <i className="bi bi-chevron-down" aria-hidden="true"></i>
      </button>

      {open && (
        <ul id={listId} className="rs-themed-select-menu" role="listbox">
          {options.map((option) => (
            <li key={`${option.value}-${option.label}`}>
              <button
                type="button"
                role="option"
                disabled={option.disabled}
                aria-selected={option.value === value}
                className={`rs-themed-select-option ${
                  option.value === value ? "is-selected" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
