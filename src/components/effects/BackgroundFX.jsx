import { memo } from "react";

const BackgroundFX = memo(function BackgroundFX() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#050608_0%,#020304_45%,#000000_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_15%,rgba(34,211,238,0.10),transparent_20%),radial-gradient(circle_at_86%_14%,rgba(255,255,255,0.04),transparent_16%),radial-gradient(circle_at_50%_100%,rgba(34,211,238,0.06),transparent_20%)]" />
      <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:88px_88px]" />
      <div className="absolute left-[3%] top-[6%] select-none text-[140px] font-black leading-none tracking-[-0.09em] text-white/[0.018] md:text-[220px]">
        HY
      </div>
      <div className="absolute right-[2%] top-[54%] select-none text-[150px] font-black leading-none tracking-[-0.09em] text-white/[0.012] md:text-[220px]">
        RX
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_36%,rgba(0,0,0,0.32)_100%)]" />
    </div>
  );
});

export default BackgroundFX;