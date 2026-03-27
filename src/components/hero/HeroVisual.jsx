import { memo } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import HeroSphere from "./HeroSphere";
import ThreeDTiltCard from "../ui/ThreeDTiltCard";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const EASE = [0.22, 1, 0.36, 1];

const FloatingOrb = memo(function FloatingOrb() {
  return (
    <motion.div
      className="absolute right-[7%] top-[7%] hidden h-28 w-28 rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.35),rgba(255,255,255,0.04)_34%,rgba(34,211,238,0.16)_54%,rgba(255,255,255,0.02)_76%,transparent)] shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-md lg:block"
      animate={{ y: [0, -14, 0], x: [0, 10, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: EASE }}
    />
  );
});

const AmbientLight = memo(function AmbientLight() {
  return (
    <>
      <div className="pointer-events-none absolute -left-10 top-[10%] h-44 w-44 rounded-full bg-cyan-300/[0.10] blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-[16%] h-36 w-36 rounded-full bg-white/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[8%] left-[12%] h-40 w-40 rounded-full bg-cyan-300/[0.07] blur-3xl" />
    </>
  );
});

const NoiseOverlay = memo(function NoiseOverlay() {
  const noiseSvg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140">
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
      </filter>
      <rect width="140" height="140" filter="url(#n)" opacity="0.9"/>
    </svg>
  `);

  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[30px] opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,${noiseSvg}")`,
        backgroundSize: "140px 140px",
      }}
    />
  );
});

const MetricCard = memo(function MetricCard({ title, value, description }) {
  return (
    <motion.div
      className="rounded-[20px] border border-white/[0.08] bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <p className="text-[10px] tracking-[0.18em] text-white/38">{title}</p>
      <p className="mt-1.5 text-[36px] font-extrabold tracking-[-0.05em] text-white">
        {value}
      </p>
      <p className="text-[13px] leading-6 text-white/50">{description}</p>
    </motion.div>
  );
});

const ProgressBlock = memo(function ProgressBlock() {
  return (
    <motion.div
      className="rounded-[20px] border border-white/[0.08] bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <p className="text-[10px] tracking-[0.18em] text-white/38">LAYOUT RHYTHM</p>

      <div className="mt-3 space-y-2.5">
        {[100, 80, 62].map((w, i) => (
          <motion.div
            key={i}
            className={cn(
              "h-2.5 rounded-full",
              i === 1
                ? "bg-cyan-300/60 shadow-[0_0_16px_rgba(34,211,238,0.18)]"
                : "bg-white/[0.08]"
            )}
            initial={{ width: 0, opacity: 0.4 }}
            whileInView={{ width: `${w}%`, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.15 + i * 0.12,
              ease: EASE,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
});

const ApproachBlock = memo(function ApproachBlock() {
  const items = [
    "Luxury-facing visual tone",
    "Controlled motion language",
    "Low-noise composition",
  ];

  return (
    <motion.div
      className="rounded-[20px] border border-white/[0.08] bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <p className="text-[10px] tracking-[0.18em] text-white/38">APPROACH</p>

      <div className="mt-3 space-y-2.5">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2.5 text-[12px] text-white/62"
          >
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-300/22 bg-cyan-300/[0.09] text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.08)]">
              <Check size={12} />
            </span>
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
});

const PreviewPanel = memo(function PreviewPanel() {
  return (
    <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <p className="text-[10px] tracking-[0.2em] text-white/38">FEATURED EXPERIENCE</p>

      <h4 className="mt-2.5 text-[26px] font-semibold leading-[1.03] tracking-[-0.05em] text-white">
        Liquid material.
        <br />
        Editorial precision.
      </h4>

      <div className="mt-5 h-[200px] overflow-hidden rounded-[18px] border border-white/[0.07] bg-[linear-gradient(135deg,rgba(18,231,242,0.12),rgba(255,255,255,0.03)_38%,rgba(0,0,0,0.14))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="grid h-full grid-cols-[1fr_80px] gap-2.5 rounded-[14px] border border-white/[0.08] bg-white/[0.03] p-3">
          <div className="rounded-[12px] border border-white/[0.08] bg-white/[0.03] p-3">
            <div className="h-2.5 w-14 rounded-full bg-cyan-300/75 shadow-[0_0_14px_rgba(34,211,238,0.25)]" />

            <div className="mt-3 space-y-2.5">
              {[88, 74, 82].map((w, i) => (
                <motion.div
                  key={i}
                  className="h-2.5 rounded-full bg-white/[0.08]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${w}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                />
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <div className="h-[78px] rounded-[10px] border border-white/[0.07] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]" />
              <div className="h-[78px] rounded-[10px] border border-white/[0.07] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]" />
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="h-[52px] rounded-[12px] border border-white/[0.07] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]" />
            <div className="h-[72px] rounded-[12px] border border-white/[0.07] bg-cyan-300/[0.12] shadow-[0_0_20px_rgba(34,211,238,0.12)]" />
            <div className="h-[64px] rounded-[12px] border border-white/[0.07] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]" />
          </div>
        </div>
      </div>
    </div>
  );
});

const HeroVisual = memo(function HeroVisual() {
  return (
    <div className="relative w-full max-w-[650px]">
      <FloatingOrb />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-12 opacity-80">
          <HeroSphere />
        </div>

        <div className="absolute inset-0 -z-10 blur-[90px] opacity-70 bg-cyan-300/10" />
        <AmbientLight />
      </div>

      <motion.div
        whileHover={{ scale: 1.015, y: -3 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <ThreeDTiltCard intensity={14}>
          <div className="relative rounded-[30px] border border-white/[0.12] bg-white/[0.04] p-3 backdrop-blur-[30px] shadow-[0_30px_90px_rgba(0,0,0,0.46)]">
            <NoiseOverlay />

            <div className="absolute inset-0 rounded-[30px] bg-[linear-gradient(135deg,rgba(255,255,255,0.11),rgba(255,255,255,0.03)_38%,rgba(255,255,255,0.01))]" />

            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#060a0e] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.06),transparent_20%),radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.6),transparent_70%),linear-gradient(180deg,#0b1117_0%,#05070a_60%,#020304_100%)]" />

              <motion.div
                className="absolute -top-12 right-[-20px] h-40 w-40 rounded-full bg-cyan-300/[0.08] blur-3xl"
                animate={{ x: [0, -12, 0], y: [0, 16, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: EASE }}
              />

              <motion.div
                className="absolute left-[-30px] top-[22%] h-32 w-32 rounded-full bg-white/[0.04] blur-3xl"
                animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: EASE }}
              />

              <div className="relative z-10 p-4 md:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.22em] text-cyan-300/80">
                      HYKROX STUDIO
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/35">
                      Signature premium environment
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-cyan-300/70 shadow-[0_0_14px_rgba(34,211,238,0.7)]" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
                  <PreviewPanel />

                  <div className="grid gap-3">
                    <MetricCard
                      title="PERFORMANCE"
                      value="98%"
                      description="Brand consistency across premium touchpoints."
                    />

                    <ProgressBlock />

                    <ApproachBlock />
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.24))]" />
            </div>
          </div>
        </ThreeDTiltCard>
      </motion.div>
    </div>
  );
});

export default HeroVisual;