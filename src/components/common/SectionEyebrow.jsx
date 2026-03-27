import { memo } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SectionEyebrow = memo(function SectionEyebrow({
  children,
  className = "",
}) {
  return (
    <p
      className={cn(
        "text-[10px] font-semibold tracking-[0.26em] text-cyan-300/80",
        className
      )}
    >
      {children}
    </p>
  );
});

export default SectionEyebrow;