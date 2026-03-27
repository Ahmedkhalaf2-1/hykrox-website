import { memo, useRef, useCallback } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ThreeDTiltCard = memo(function ThreeDTiltCard({
  children,
  className = "",
  intensity = 12,
}) {
  const ref = useRef(null);

  const handleMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const rotateY = (px - 0.5) * intensity;
      const rotateX = (0.5 - py) * intensity;

      el.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.01)`;
    },
    [intensity]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transform =
      "perspective(1400px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "relative transition-transform duration-300 will-change-transform [transform-style:preserve-3d]",
        className
      )}
      style={{
        transform: "perspective(1400px) rotateX(0deg) rotateY(0deg)",
      }}
    >
      {children}
    </div>
  );
});

export default ThreeDTiltCard;