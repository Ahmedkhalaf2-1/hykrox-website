import { memo } from "react";
import ThreeDTiltCard from "./ThreeDTiltCard";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const GlassPanel = memo(function GlassPanel({
  children,
  className = "",
  tilt = false,
}) {
  const Wrapper = tilt ? ThreeDTiltCard : "div";

  return (
    <Wrapper
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.045] backdrop-blur-[22px] shadow-[0_12px_45px_rgba(0,0,0,0.28)]",
        className
      )}
    >
      {/* base surface tint */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02)_38%,rgba(255,255,255,0.015)_100%)]" />

      {/* top edge highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[inherit] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* subtle corner glow */}
      <div className="pointer-events-none absolute -left-10 top-[-30px] h-24 w-24 rounded-full bg-white/[0.06] blur-2xl" />

      {/* cyan aura */}
      <div className="pointer-events-none absolute right-[-30px] top-[-30px] h-28 w-28 rounded-full bg-cyan-300/[0.08] blur-3xl" />

      {/* inner soft glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-70" />

      {/* subtle vignette for depth */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top_center,transparent_0%,transparent_45%,rgba(0,0,0,0.14)_100%)]" />

      {/* content */}
      <div className="relative z-10">
        {children}
      </div>
    </Wrapper>
  );
});

export default GlassPanel;