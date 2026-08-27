import Link from "next/link";

const COLOR_PRESETS = {
  red: {
    bg: "#d42b2b",
    text: "#ffffff",
    border: "#d42b2b",
  },
  white: {
    bg: "#ffffff",
    text: "#DE1515",
    border: "#ffffff",
  },
  yellow: {
    bg: "#f5ff00",
    text: "#ef1515",
    border: "#f5ff00",
  },
  black: {
    bg: "#333333",
    text: "#ffffff",
    border: "#333333",
  },
};

function resolveColors(color, textColor, borderColor) {
  const preset = COLOR_PRESETS[color];

  if (preset) {
    return {
      bg: preset.bg,
      text: textColor || preset.text,
      border: borderColor || preset.border,
      name: color,
    };
  }

  return {
    bg: color || COLOR_PRESETS.red.bg,
    text: textColor || "#ffffff",
    border: borderColor || color || COLOR_PRESETS.red.border,
    name: "custom",
  };
}

export default function Button({
  children,
  color = "red",
  textColor,
  borderColor,
  href,
  type = "button",
  className = "",
  target,
  rel,
  disabled = false,
  onClick,
  ...rest
}) {
  const colors = resolveColors(color, textColor, borderColor);

  const classNames = ["rs-btn", `rs-btn--${colors.name}`, className]
    .filter(Boolean)
    .join(" ");

  const style = {
    "--rs-btn-bg": colors.bg,
    "--rs-btn-text": colors.text,
    "--rs-btn-border": colors.border,
  };

  const content = <span className="btn-title">{children}</span>;

  if (href) {
    const isExternal =
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      target === "_blank";

    const sharedProps = {
      className: classNames,
      style,
      onClick,
      ...rest,
    };

    if (isExternal) {
      return (
        <a
          href={href}
          target={target}
          rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
          {...sharedProps}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} {...sharedProps}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      style={style}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
}
