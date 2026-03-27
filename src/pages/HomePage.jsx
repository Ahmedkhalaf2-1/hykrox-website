import { memo, useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  MoveRight,
  Star,
  Layers3,
  BadgeCheck,
} from "lucide-react";

import PageShell from "../components/layout/PageShell";
import Button from "../components/ui/Button";
import ThreeDTiltCard from "../components/ui/ThreeDTiltCard";
import GlassPanel from "../components/ui/GlassPanel";
import HeroVisual from "../components/hero/HeroVisual";

const EASE = [0.22, 1, 0.36, 1];

const STATS = [
  {
    value: "300+",
    label: "PROJECTS DELIVERED",
    note: "Across product, brand, and motion systems",
  },
  {
    value: "8.9",
    label: "CLIENT SATISFACTION",
    note: "Measured through long-term partner feedback",
  },
  {
    value: "3K+",
    label: "GLOBAL CUSTOMERS",
    note: "Touchpoints across multiple regions",
  },
  {
    value: "23",
    label: "CORE SPECIALISTS",
    note: "Design, motion, engineering, strategy",
  },
];

const FEATURE_PILLS = [
  "Motion systems",
  "Luxury web direction",
  "Editorial hierarchy",
  "3D interaction",
  "Glass UI",
  "Brand presence",
];

const EXPERIENCE_POINTS = [
  {
    icon: <Layers3 size={16} />,
    title: "Layered depth",
    text: "Interfaces feel dimensional, not crowded.",
  },
  {
    icon: <Sparkles size={16} />,
    title: "Luxury motion",
    text: "Smooth transitions that feel expensive, not noisy.",
  },
  {
    icon: <BadgeCheck size={16} />,
    title: "Clear hierarchy",
    text: "Every block knows its role at first glance.",
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useParallax(distance = 80) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [distance, -distance]
  );

  return { ref, y };
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.02 } },
};

function Section({ children, className = "" }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
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
        "text-[10px] font-semibold tracking-[0.28em] text-cyan-300/80",
        className
      )}
    >
      {children}
    </p>
  );
}

const AnimatedHeading = memo(function AnimatedHeading({
  text,
  className = "",
  highlight = [],
  as: Tag = "h2",
}) {
  const shouldReduceMotion = useReducedMotion();
  const words = useMemo(() => text.split(" "), [text]);

  if (shouldReduceMotion) {
    return (
      <Tag className={className}>
        {words.map((word, i) => {
          const clean = word.replace(/[.,!?]/g, "");
          const active = highlight.includes(clean);

          return (
            <span
              key={`${word}-${i}`}
              className={cn(
                active &&
                  "text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.18)]"
              )}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </Tag>
    );
  }

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
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.48, ease: EASE },
                  },
                }}
                className={cn(
                  "inline-block will-change-transform",
                  active &&
                    "text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.18)]"
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
});

const OutlineStat = memo(function OutlineStat({ value, label, note }) {
  return (
    <ThreeDTiltCard intensity={7}>
      <motion.div
        variants={fadeUp}
        className="group relative overflow-hidden rounded-[24px] border border-white/[0.09] bg-white/[0.03] px-6 py-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.10),transparent_35%)] opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        <p className="relative z-10 text-[40px] font-extrabold tracking-[-0.06em] text-white md:text-[52px]">
          {value}
        </p>

        <p className="relative z-10 mt-1.5 text-[10px] font-semibold tracking-[0.22em] text-white/45">
          {label}
        </p>

        <p className="relative z-10 mt-4 max-w-[260px] text-[13px] leading-6 text-white/52">
          {note}
        </p>
      </motion.div>
    </ThreeDTiltCard>
  );
});

const MarqueeStrip = memo(function MarqueeStrip() {
  const shouldReduceMotion = useReducedMotion();

  const items = [
    "LIQUID GLASS",
    "3D INTERACTION",
    "EDITORIAL SPACING",
    "PREMIUM UX",
    "MICRO MOTION",
    "CINEMATIC DEPTH",
    "BRAND SYSTEMS",
  ];

  const repeated = [...items, ...items];

  return (
    <div className="relative mt-16 overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.035] py-3">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 bg-[linear-gradient(90deg,#040506,transparent)]" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-[linear-gradient(270deg,#040506,transparent)]" />

      <motion.div
        className="flex min-w-max items-center gap-8 whitespace-nowrap"
        animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 22, repeat: Infinity, ease: "linear" }
        }
      >
        {repeated.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-8 px-4">
            <span className="text-[11px] font-semibold tracking-[0.28em] text-white/60">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
});

const FeaturePill = memo(function FeaturePill({ children }) {
  return (
    <div className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-[11px] font-medium tracking-[0.16em] text-white/64 backdrop-blur-md">
      {children}
    </div>
  );
});

const ExperienceCard = memo(function ExperienceCard({ icon, title, text }) {
  return (
    <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-4 transition duration-300 hover:border-cyan-300/18 hover:bg-white/[0.045]">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300">
        {icon}
      </div>
      <h4 className="text-[15px] font-semibold text-white">{title}</h4>
      <p className="mt-2 text-[13px] leading-6 text-white/56">{text}</p>
    </div>
  );
});

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const heroParallax = useParallax(55);
  const blockParallax = useParallax(34);

  const heroVisualY = useTransform(heroParallax.y, (v) =>
    shouldReduceMotion ? 0 : -v * 0.3
  );

  const blockVisualY = useTransform(blockParallax.y, (v) =>
    shouldReduceMotion ? 0 : -v * 0.2
  );

  return (
    <PageShell>
      <section
        ref={heroParallax.ref}
        className="relative overflow-hidden pt-14 lg:pt-20"
      >
        <div className="pointer-events-none absolute left-[-120px] top-[-80px] h-[280px] w-[280px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-80px] top-[20%] h-[240px] w-[240px] rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            style={{ y: heroParallax.y }}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-[680px]"
          >
            <motion.div
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-300/[0.09] px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-cyan-300/85"
            >
              <Sparkles size={13} />
              PREMIUM LIQUID-GLASS EXPERIENCE
            </motion.div>

            <AnimatedHeading
              text="We shape digital identity with depth, motion, and luxury-grade clarity"
              highlight={["depth", "motion", "luxury-grade", "clarity"]}
              className="text-[44px] font-semibold leading-[0.9] tracking-[-0.07em] text-white md:text-[78px]"
            />

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[590px] text-[15px] leading-8 text-white/58 md:text-[16px]"
            >
              A premium digital direction for brands that want stronger
              presence, calmer surfaces, sharper composition, and interfaces
              that feel elevated from the first second.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2">
              {FEATURE_PILLS.map((item) => (
                <FeaturePill key={item}>{item}</FeaturePill>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact">
                <Button icon={<ArrowRight size={15} />}>BUILD WITH US</Button>
              </Link>

              <Link to="/work">
                <Button variant="secondary">VIEW SHOWCASE</Button>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 grid max-w-[520px] grid-cols-2 gap-4 md:grid-cols-3"
            >
              <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] px-4 py-4">
                <p className="text-[24px] font-bold tracking-[-0.05em] text-white">
                  10+
                </p>
                <p className="mt-1 text-[10px] tracking-[0.2em] text-white/42">
                  YEARS OF DISCIPLINE
                </p>
              </div>

              <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] px-4 py-4">
                <p className="text-[24px] font-bold tracking-[-0.05em] text-white">
                  24/7
                </p>
                <p className="mt-1 text-[10px] tracking-[0.2em] text-white/42">
                  CREATIVE THINKING
                </p>
              </div>

              <div className="col-span-2 rounded-[18px] border border-white/[0.08] bg-white/[0.03] px-4 py-4 md:col-span-1">
                <p className="text-[24px] font-bold tracking-[-0.05em] text-white">
                  AAA
                </p>
                <p className="mt-1 text-[10px] tracking-[0.2em] text-white/42">
                  PREMIUM VISUAL STANDARD
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: heroVisualY }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10),transparent_55%)] blur-2xl" />
            <div className="relative">
              <HeroVisual />
            </div>
          </motion.div>
        </div>
      </section>

      <MarqueeStrip />

      <Section className="mt-24 md:mt-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {STATS.map((item) => (
            <OutlineStat
              key={item.label}
              value={item.value}
              label={item.label}
              note={item.note}
            />
          ))}
        </motion.div>
      </Section>

      <Section className="mt-28 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div ref={blockParallax.ref} style={{ y: blockParallax.y }}>
          <SectionEyebrow>WORLD-CLASS DIRECTION</SectionEyebrow>

          <AnimatedHeading
            text="Faster motion. Cleaner hierarchy. Deeper material presence."
            highlight={["Faster", "Cleaner", "Deeper"]}
            className="text-[36px] font-semibold leading-[0.96] tracking-[-0.06em] text-white md:text-[60px]"
            as="h3"
          />

          <p className="mt-6 max-w-[460px] text-[15px] leading-8 text-white/58">
            This direction keeps the cyan-black DNA, but upgrades the visual
            rhythm with stronger layering, calmer surfaces, more intentional
            spacing, and premium motion behavior.
          </p>

          <div className="mt-9 grid gap-3 md:grid-cols-2">
            {[
              "Header-only headline motion",
              "Real route transitions",
              "3D tilt + glass reflections",
              "Sharper spacing & rhythm",
            ].map((item) => (
              <ThreeDTiltCard key={item} intensity={6}>
                <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-[14px] text-white/72 transition duration-300 hover:border-cyan-300/18 hover:bg-white/[0.045]">
                  {item}
                </div>
              </ThreeDTiltCard>
            ))}
          </div>
        </motion.div>

        <motion.div style={{ y: blockVisualY }}>
          <GlassPanel className="relative overflow-hidden p-5 md:p-6" tilt>
            <div className="pointer-events-none absolute right-[-50px] top-[-50px] h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="grid gap-4">
              <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-5">
                <p className="text-[10px] tracking-[0.2em] text-white/38">
                  EXPERIENCE MODEL
                </p>

                <h4 className="mt-2.5 text-[30px] font-semibold leading-[1.02] tracking-[-0.05em] text-white">
                  Calm surface.
                  <br />
                  Strong signal.
                </h4>

                <p className="mt-3 max-w-[420px] text-[14px] leading-7 text-white/58">
                  Premium websites do not scream for attention. They compose the
                  eye, control focus, and create confidence through restraint.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.14em] text-cyan-300/84">
                  EXPLORE SYSTEM
                  <MoveRight size={14} />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {EXPERIENCE_POINTS.map((item) => (
                  <ExperienceCard
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    text={item.text}
                  />
                ))}
              </div>

              <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-white/38">
                      VISUAL SCORE
                    </p>
                    <h5 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] text-white">
                      Premium without heaviness
                    </h5>
                  </div>

                  <div className="inline-flex items-center gap-1 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-2 text-cyan-300">
                    <Star size={14} />
                    <span className="text-[12px] font-semibold">9.8</span>
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyan-300/55 via-cyan-300 to-cyan-200/70" />
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] tracking-[0.16em] text-white/36">
                  <span>CLARITY</span>
                  <span>MOTION</span>
                  <span>DEPTH</span>
                </div>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </Section>
    </PageShell>
  );
}