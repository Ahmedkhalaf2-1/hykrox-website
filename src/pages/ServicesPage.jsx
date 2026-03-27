import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoveUpRight,
  PenTool,
  Smartphone,
  LayoutTemplate,
  Layers3,
  Sparkles,
  Check,
  ArrowRight,
} from "lucide-react";

import PageShell from "../components/layout/PageShell";
import GlassPanel from "../components/ui/GlassPanel";
import ThreeDTiltCard from "../components/ui/ThreeDTiltCard";
import Button from "../components/ui/Button";

const SERVICES = [
  {
    id: "01",
    key: "brand-web",
    icon: PenTool,
    label: "Brand & Website Design",
    title: "Editorial websites with luxury digital presence.",
    description:
      "We shape luxury-facing websites with stronger hierarchy, cinematic rhythm, premium glass surfaces, and presence that feels deliberate from the first frame.",
    bullets: [
      "Luxury landing pages",
      "Conversion-aware structure",
      "Editorial visual system",
    ],
    accent: "Luxury web presence",
    score: "9.7",
    meta: ["Premium UX", "High-end branding", "Editorial layouts"],
  },
  {
    id: "02",
    key: "product-app",
    icon: Smartphone,
    label: "Product & App Experience",
    title: "Modern interfaces with clarity, flow, and authority.",
    description:
      "From mobile-first products to dashboard surfaces, we design interfaces that feel refined, confident, and easier to understand at speed.",
    bullets: [
      "Mobile and desktop UX",
      "Premium micro-interactions",
      "Scalable user journeys",
    ],
    accent: "Flow-driven interfaces",
    score: "9.5",
    meta: ["App UX", "Dashboard systems", "Conversion flow"],
  },
  {
    id: "03",
    key: "ui-system",
    icon: LayoutTemplate,
    label: "UI Systems",
    title: "Design systems that keep every screen in one universe.",
    description:
      "Reusable components, spacing logic, consistent motion language, and a coherent visual system that scales without visual chaos.",
    bullets: [
      "Component logic",
      "Visual consistency",
      "Scale-ready foundations",
    ],
    accent: "Unified product language",
    score: "9.8",
    meta: ["Components", "Design tokens", "Scale-ready"],
  },
  {
    id: "04",
    key: "creative-direction",
    icon: Layers3,
    label: "Creative Direction",
    title: "Digital art direction with restraint and atmosphere.",
    description:
      "We create brand worlds with better composition, stronger materiality, and a premium digital tone that feels memorable without becoming noisy.",
    bullets: ["Art direction", "Campaign surfaces", "Premium polish"],
    accent: "Atmosphere with control",
    score: "9.6",
    meta: ["Campaign visuals", "Luxury tone", "Digital storytelling"],
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.02 } },
};

const wordReveal = {
  hidden: { opacity: 0, y: 34, rotateX: -25, transformPerspective: 1200 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transformPerspective: 1200,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function Section({ children, className = "" }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.14 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SectionEyebrow({ children, className = "" }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.26em] text-cyan-300/80",
        className
      )}
    >
      <Sparkles size={12} />
      {children}
    </p>
  );
}

function AnimatedHeading({
  text,
  className = "",
  highlight = [],
  as: Tag = "h2",
}) {
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      className={className}
    >
      <Tag className="contents">
        {words.map((word, i) => {
          const clean = word.replace(/[.,!?]/g, "");
          const active = highlight.includes(clean);

          return (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden">
              <motion.span
                variants={wordReveal}
                className={cn(
                  "inline-block will-change-transform",
                  active &&
                    "text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.22)]"
                )}
              >
                {word}&nbsp;
              </motion.span>
            </span>
          );
        })}
      </Tag>
    </motion.div>
  );
}

function FeatureChip({ children }) {
  return (
    <div className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3.5 py-2 text-[11px] tracking-[0.16em] text-white/58">
      {children}
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] px-4 py-4">
      <p className="text-[24px] font-bold tracking-[-0.05em] text-white">
        {value}
      </p>
      <p className="mt-1 text-[10px] tracking-[0.18em] text-white/38">
        {label}
      </p>
    </div>
  );
}

export default function ServicesPage() {
  const [activeKey, setActiveKey] = useState(SERVICES[0].key);

  const active = useMemo(
    () => SERVICES.find((s) => s.key === activeKey) ?? SERVICES[0],
    [activeKey]
  );

  const Icon = active.icon;

  return (
    <PageShell>
      <Section className="relative overflow-hidden pt-14">
        <div className="pointer-events-none absolute left-[-120px] top-[-80px] h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-80px] top-[20%] h-[220px] w-[220px] rounded-full bg-cyan-300/10 blur-3xl" />

        <SectionEyebrow>SERVICES</SectionEyebrow>

        <AnimatedHeading
          text="A service stack designed for premium products."
          highlight={["premium"]}
          className="mt-4 max-w-[900px] text-[40px] font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-[72px]"
        />

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-[760px] text-[15px] leading-8 text-white/58 md:text-[16px]"
        >
          We build digital experiences with stronger hierarchy, cleaner motion,
          sharper systems, and luxury-grade visual control that feels refined
          across every screen.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-7 flex flex-wrap gap-2.5"
        >
          <FeatureChip>Luxury web direction</FeatureChip>
          <FeatureChip>Premium product UX</FeatureChip>
          <FeatureChip>UI systems</FeatureChip>
          <FeatureChip>Creative direction</FeatureChip>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-8 grid max-w-[700px] gap-4 sm:grid-cols-3"
        >
          <MetricCard label="SERVICE AREAS" value="04" />
          <MetricCard label="PREMIUM STANDARD" value="AAA" />
          <MetricCard label="FOCUSED EXECUTION" value="24/7" />
        </motion.div>
      </Section>

      <Section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          {SERVICES.map((item) => {
            const ItemIcon = item.icon;
            const isActive = item.key === activeKey;

            return (
              <ThreeDTiltCard key={item.key} intensity={8}>
                <button
                  onMouseEnter={() => setActiveKey(item.key)}
                  onClick={() => setActiveKey(item.key)}
                  className={cn(
                    "group relative flex w-full items-start justify-between gap-4 overflow-hidden rounded-[24px] border px-5 py-5 text-left transition-all duration-300",
                    isActive
                      ? "border-cyan-300/25 bg-cyan-300/[0.08] shadow-[0_12px_40px_rgba(34,211,238,0.08)]"
                      : "border-white/[0.08] bg-white/[0.025] hover:border-white/[0.16] hover:bg-white/[0.04]"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="service-bg"
                      className="absolute inset-0 rounded-[24px] bg-[linear-gradient(135deg,rgba(34,211,238,0.09),rgba(255,255,255,0.025))]"
                      transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
                    />
                  )}

                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className={cn(
                        "mt-0.5 inline-flex rounded-2xl border p-3",
                        isActive
                          ? "border-cyan-300/18 bg-cyan-300/[0.09] text-cyan-300"
                          : "border-white/[0.08] bg-white/[0.03] text-white/60"
                      )}
                    >
                      <ItemIcon size={18} />
                    </div>

                    <div>
                      <p className="text-[10px] tracking-[0.2em] text-white/32">
                        {item.id}
                      </p>

                      <h4
                        className={cn(
                          "mt-1.5 text-[18px] font-semibold tracking-[-0.03em]",
                          isActive ? "text-white" : "text-white/74"
                        )}
                      >
                        {item.label}
                      </h4>

                      <p className="mt-2 max-w-[360px] text-[13px] leading-6 text-white/45">
                        {item.accent}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col items-end gap-3">
                    <div className="transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <MoveUpRight
                        size={16}
                        className={cn(
                          isActive
                            ? "text-cyan-300"
                            : "text-white/28 group-hover:text-white/55"
                        )}
                      />
                    </div>

                    <div
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[10px] tracking-[0.16em]",
                        isActive
                          ? "border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300"
                          : "border border-white/[0.08] bg-white/[0.03] text-white/36"
                      )}
                    >
                      {item.score}
                    </div>
                  </div>
                </button>
              </ThreeDTiltCard>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, x: 18, filter: "blur(5px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -18, filter: "blur(5px)" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassPanel className="h-full p-4 md:p-5" tilt>
              <div className="relative h-full overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#07090d] p-5 md:p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_22%),linear-gradient(180deg,#0a0c10_0%,#040506_100%)]" />
                <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-7 flex items-center justify-between gap-4">
                    <div className="inline-flex rounded-2xl border border-cyan-300/18 bg-cyan-300/[0.09] p-3 text-cyan-300">
                      <Icon size={22} />
                    </div>

                    <div className="text-right">
                      <p className="text-[11px] tracking-[0.2em] text-white/30">
                        VISUAL SCORE
                      </p>
                      <p className="mt-1 text-[28px] font-bold tracking-[-0.05em] text-white/90">
                        {active.score}
                      </p>
                    </div>
                  </div>

                  <AnimatedHeading
                    text={active.title}
                    className="max-w-[460px] text-[30px] font-semibold leading-[1.02] tracking-[-0.05em] text-white"
                    as="h4"
                  />

                  <p className="mt-4 max-w-[520px] text-[14px] leading-8 text-white/60">
                    {active.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {active.meta.map((item) => (
                      <div
                        key={item}
                        className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3.5 py-2 text-[11px] tracking-[0.14em] text-white/56"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 grid gap-2.5 sm:grid-cols-3">
                    {active.bullets.map((item) => (
                      <div
                        key={item}
                        className="rounded-[18px] border border-white/[0.08] bg-white/[0.035] px-4 py-4 text-[13px] text-white/70 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/18"
                      >
                        <div className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-cyan-300/16 bg-cyan-300/[0.08] text-cyan-300">
                          <Check size={13} />
                        </div>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] text-white/34">
                          DELIVERY FEEL
                        </p>
                        <h5 className="mt-2 text-[20px] font-semibold tracking-[-0.04em] text-white">
                          Clean, premium, and conversion-aware
                        </h5>
                      </div>

                      <div className="text-cyan-300">
                        <ArrowRight size={18} />
                      </div>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-cyan-300/55 via-cyan-300 to-cyan-200/70" />
                    </div>
                  </div>

                  <div className="mt-7">
                    <Button icon={<ArrowRight size={15} />}>
                      START A PROJECT
                    </Button>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </AnimatePresence>
      </Section>
    </PageShell>
  );
}