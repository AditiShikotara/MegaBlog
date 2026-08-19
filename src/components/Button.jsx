const VARIANTS = {
  primary: "bg-forest text-paper hover:bg-forest-dark",
  secondary: "bg-transparent text-ink border border-ink/20 hover:border-ink/40 hover:bg-paper-dark",
  danger: "bg-brick text-paper hover:bg-brick/90",
}

export default function Button({
  children,
  type = "button",
  variant,
  bgColor,
  textColor,
  className = "",
  ...props
}) {
  // Back-compat: older call sites pass raw Tailwind bgColor/textColor
  // (e.g. bgColor="bg-red-500"). Prefer those verbatim if given, otherwise
  // fall back to the design-system variant.
  const colorClasses = bgColor || textColor
    ? `${bgColor || "bg-forest"} ${textColor || "text-paper"} hover:brightness-95`
    : VARIANTS[variant || "primary"]

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium
        transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${colorClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
