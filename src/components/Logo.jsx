function Logo({ width = "100px", className = "" }) {
  // Historically some callers pass "100%" — parseInt reads the leading
  // digits either way, so this degrades gracefully.
  const parsed = parseInt(width, 10)
  const scale = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 60), 160) : 100
  const fontSize = (scale / 100) * 22

  return (
    <div className={`inline-flex items-center gap-2 ${className}`} style={{ fontSize: `${fontSize}px` }}>
      <span
        className="flex items-center justify-center rounded-md bg-ink font-display italic leading-none text-paper"
        style={{ width: "1.7em", height: "1.7em", fontSize: "0.85em" }}
        aria-hidden="true"
      >
        M
      </span>
      <span className="font-display text-[1.2em] italic tracking-tight text-ink">
        MegaBlog
      </span>
    </div>
  )
}

export default Logo
