import { memo } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Button = memo(function Button({
  children,
  variant = "primary",
  className = "",
  icon,
  onClick,
  type = "button",
}) {
  const base =
    "relative group inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-[11px] font-extrabold tracking-[0.16em] transition-all duration-300 active:scale-[0.96]";

  const styles =
    variant === "primary"
      ? "border border-cyan-300/30 bg-cyan-300 text-black shadow-[0_10px_35px_rgba(34,211,238,0.18)] hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(34,211,238,0.28)]"
      : "border border-white/10 bg-white/[0.04] text-white hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]";

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(base, styles, className)}
    >
      {/* glow layer */}
      <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.35),transparent_60%)]" />
      </span>

      {/* subtle shine sweep */}
      <span className="pointer-events-none absolute left-[-100%] top-0 h-full w-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent)] opacity-0 transition-all duration-700 group-hover:left-[100%] group-hover:opacity-100" />

      {/* content */}
      <span className="relative z-10 flex items-center gap-2">
        <span>{children}</span>

        {icon && (
          <span className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px]">
            {icon}
          </span>
        )}
      </span>
    </button>
  );
});

export default Button;