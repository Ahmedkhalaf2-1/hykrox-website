import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  MoveUpRight,
  Sparkles,
  ArrowRight,
  BadgeCheck,
  Layers3,
} from "lucide-react";

import PageShell from "../components/layout/PageShell";
import GlassPanel from "../components/ui/GlassPanel";
import ThreeDTiltCard from "../components/ui/ThreeDTiltCard";
import Button from "../components/ui/Button";

const PROJECTS = [
  {
    id: "A1",
    category: "Luxury Skincare",
    title: "Veloura",
    year: "2026",
    description:
      "A premium editorial commerce experience with cinematic rhythm, quiet confidence, and tactile surface design.",
    tag: "E-Commerce",
    align: "left",
    score: "9.8",
    services: ["Editorial UX", "Luxury UI", "E-Commerce Direction"],
    outcome: "Higher perceived brand value through visual restraint and premium flow.",
  },
  {
    id: "B2",
    category: "Fintech Platform",
    title: "Monarc",
    year: "2026",
    description:
      "A data-rich interface rebuilt with sharper hierarchy, cleaner motion, and calmer executive-grade presence.",
    tag: "Dashboard",
    align: "right",
    score: "9.6",
    services: ["Dashboard UX", "System Design", "Executive UI"],
    outcome: "A calmer data experience with clearer hierarchy and faster comprehension.",
  },
  {
    id: "C3",
    category: "Architecture Studio",
    title: "Noir Atelier",
    year: "2026",
    description:
      "A dark immersive showcase system with gallery rhythm, architectural spacing, and luxury typography.",
    tag: "Brand",
    align: "left",
    score: "9.9",
    services: ["Brand Presence", "Showcase Design", "Art Direction"],
    outcome: "A stronger visual identity with atmosphere, space, and memorable presence.",
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

function StatMini({ value, label }) {
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

function ServiceChip({ children }) {
  return (
    <div className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3.5 py-2 text-[11px] tracking-[0.14em] text-white/56">
      {children}
    </div>
  );
}

function ProjectMock({ title, align, tag }) {
  return (
    <ThreeDTiltCard intensity={9}>
      <GlassPanel className="p-3.5" tilt>
        <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#070a0d] p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_22%),linear-gradient(180deg,#0c1115_0%,#050608_100%)]" />
          <div className="absolute right-[-40px] top-[-40px] h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-[10px] tracking-[0.18em] text-white/36">
                CASE PREVIEW
              </p>

              <span className="rounded-full border border-cyan-300/16 bg-cyan-300/[0.08] px-2.5 py-1 text-[10px] tracking-[0.16em] text-cyan-300">
                {tag}
              </span>
            </div>

            <div
              className={cn(
                "grid gap-3",
                align === "right"
                  ? "md:grid-cols-[0.72fr_1.28fr]"
                  : "md:grid-cols-[1.28fr_0.72fr]"
              )}
            >
              <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.035] p-4">
                <p className="text-[10px] tracking-[0.18em] text-white/38">
                  PROJECT
                </p>

                <h4 className="mt-2.5 text-[24px] font-semibold leading-[1.02] tracking-[-0.05em] text-white">
                  {title}
                </h4>

                <div className="mt-4 space-y-2.5">
                  <div className="h-2.5 w-20 rounded-full bg-cyan-300/65" />
                  <div className="h-2.5 w-full rounded-full bg-white/[0.08]" />
                  <div className="h-2.5 w-10/12 rounded-full bg-white/[0.08]" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <div className="h-20 rounded-[14px] border border-white/[0.07] bg-white/[0.025]" />
                  <div className="h-20 rounded-[14px] border border-white/[0.07] bg-cyan-300/[0.09]" />
                </div>
              </div>

              <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.035] p-3">
                <div className="grid h-full grid-cols-2 gap-2.5">
                  <div className="space-y-2.5">
                    <div className="h-20 rounded-[14px] border border-white/[0.07] bg-white/[0.025]" />
                    <div className="h-16 rounded-[14px] border border-white/[0.07] bg-white/[0.025]" />
                  </div>

                  <div className="space-y-2.5">
                    <div className="h-14 rounded-[14px] border border-white/[0.07] bg-cyan-300/[0.09]" />
                    <div className="h-24 rounded-[14px] border border-white/[0.07] bg-white/[0.025]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-[16px] border border-white/[0.08] bg-white/[0.03] px-4 py-3">
              <div className="flex items-center gap-2 text-white/58">
                <Layers3 size={14} className="text-cyan-300" />
                <span className="text-[11px] tracking-[0.15em]">PREMIUM LAYOUT SYSTEM</span>
              </div>

              <MoveUpRight size={15} className="text-cyan-300" />
            </div>
          </div>
        </div>
      </GlassPanel>
    </ThreeDTiltCard>
  );
}

function ProjectInfo({ project }) {
  return (
    <GlassPanel className="p-6 md:p-7" tilt>
      <div className="mb-1 flex items-center gap-3">
        <p className="text-[10px] tracking-[0.22em] text-cyan-300/80">
          {project.category} / {project.year}
        </p>

        <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[9px] tracking-[0.18em] text-white/45">
          {project.tag}
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <AnimatedHeading
          text={project.title}
          className="text-[32px] font-semibold leading-[0.98] tracking-[-0.05em] text-white md:text-[44px]"
          as="h4"
        />

        <div className="rounded-full border border-cyan-300/18 bg-cyan-300/[0.08] px-3 py-2 text-cyan-300">
          <span className="text-[12px] font-semibold tracking-[0.14em]">
            {project.score}
          </span>
        </div>
      </div>

      <p className="mt-4 max-w-[520px] text-[14px] leading-8 text-white/58">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.services.map((item) => (
          <ServiceChip key={item}>{item}</ServiceChip>
        ))}
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/16 bg-cyan-300/[0.08] text-cyan-300">
            <BadgeCheck size={14} />
          </div>
          <p className="text-[10px] tracking-[0.18em] text-white/34">
            OUTCOME
          </p>
          <p className="mt-2 text-[14px] leading-7 text-white/68">
            {project.outcome}
          </p>
        </div>

        <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="text-[10px] tracking-[0.18em] text-white/34">
            DELIVERY FEEL
          </p>
          <h5 className="mt-2 text-[20px] font-semibold tracking-[-0.04em] text-white">
            Refined, calm, and high-end
          </h5>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-cyan-300/55 via-cyan-300 to-cyan-200/70" />
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <Button variant="secondary" icon={<MoveUpRight size={15} />}>
          VIEW CASE STUDY
        </Button>

        <Button icon={<ArrowRight size={15} />}>START SIMILAR PROJECT</Button>
      </div>
    </GlassPanel>
  );
}

export default function WorkPage() {
  return (
    <PageShell>
      <Section className="relative overflow-hidden pt-14">
        <div className="pointer-events-none absolute left-[-120px] top-[-80px] h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-80px] top-[20%] h-[220px] w-[220px] rounded-full bg-cyan-300/10 blur-3xl" />

        <SectionEyebrow>FEATURED WORK</SectionEyebrow>

        <AnimatedHeading
          text="Selected projects with presence, precision, and story."
          highlight={["presence", "precision", "story"]}
          className="mt-4 max-w-[900px] text-[40px] font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-[72px]"
        />

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-[760px] text-[15px] leading-8 text-white/58 md:text-[16px]"
        >
          A curated selection of premium digital experiences shaped with calm
          surfaces, stronger hierarchy, cinematic rhythm, and luxury-grade
          visual control.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 grid max-w-[700px] gap-4 sm:grid-cols-3"
        >
          <StatMini value="03" label="FEATURED CASES" />
          <StatMini value="AAA" label="VISUAL STANDARD" />
          <StatMini value="9.8" label="AVERAGE FEEL SCORE" />
        </motion.div>
      </Section>

      <div className="mt-14 space-y-8">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.14 }}
            transition={{
              duration: 0.52,
              delay: 0.04 * i,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-center"
          >
            <div
              className={cn(
                "order-2",
                project.align === "right" ? "lg:order-2" : "lg:order-1"
              )}
            >
              <ProjectInfo project={project} />
            </div>

            <div
              className={cn(
                "order-1",
                project.align === "right" ? "lg:order-1" : "lg:order-2"
              )}
            >
              <ProjectMock
                title={project.title}
                align={project.align}
                tag={project.tag}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}