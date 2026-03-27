import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Sparkles,
  ArrowRight,
  BadgeCheck,
  Layers3,
  Gem,
} from "lucide-react";

import PageShell from "../components/layout/PageShell";
import GlassPanel from "../components/ui/GlassPanel";
import ThreeDTiltCard from "../components/ui/ThreeDTiltCard";
import Button from "../components/ui/Button";

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

function MiniStat({ value, label }) {
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

function PrincipleCard({ Icon, title, body }) {
  return (
    <ThreeDTiltCard intensity={8}>
      <div className="group rounded-[22px] border border-white/[0.08] bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/[0.04]">
        <div className="mb-4 inline-flex rounded-xl border border-cyan-300/18 bg-cyan-300/[0.09] p-3 text-cyan-300">
          <Icon size={20} />
        </div>

        <h4 className="text-[22px] font-semibold tracking-[-0.03em] text-white">
          {title}
        </h4>

        <p className="mt-2.5 text-[13px] leading-7 text-white/55">
          {body}
        </p>
      </div>
    </ThreeDTiltCard>
  );
}

function QualityCard({ label, title, body, extra = "" }) {
  return (
    <GlassPanel className={cn("relative overflow-hidden p-5", extra)} tilt>
      <div className="absolute right-[-40px] top-[-40px] h-24 w-24 rounded-full bg-cyan-300/8 blur-3xl" />

      <div className="relative z-10">
        <p className="text-[10px] tracking-[0.2em] text-white/38">{label}</p>

        <h4 className="mt-2.5 text-[24px] font-semibold leading-[1.04] tracking-[-0.04em] text-white">
          {title}
        </h4>

        <p className="mt-3 text-[13px] leading-7 text-white/55">{body}</p>
      </div>
    </GlassPanel>
  );
}

export default function AboutPage() {
  return (
    <PageShell>
      <Section className="relative overflow-hidden pt-14">
        <div className="pointer-events-none absolute left-[-120px] top-[-80px] h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-80px] top-[20%] h-[220px] w-[220px] rounded-full bg-cyan-300/10 blur-3xl" />

        <SectionEyebrow>ABOUT THE STUDIO</SectionEyebrow>

        <AnimatedHeading
          text="Precision in layout. Luxury in tone. Depth in motion."
          highlight={["Precision", "Luxury", "Depth"]}
          className="mt-4 max-w-[900px] text-[40px] font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-[72px]"
        />

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-[760px] text-[15px] leading-8 text-white/58 md:text-[16px]"
        >
          We shape premium digital experiences through stronger hierarchy,
          calmer surfaces, sharper editorial rhythm, and motion that feels
          expensive without trying too hard.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 grid max-w-[720px] gap-4 sm:grid-cols-3"
        >
          <MiniStat value="10+" label="YEARS OF TASTE" />
          <MiniStat value="AAA" label="VISUAL STANDARD" />
          <MiniStat value="24/7" label="CREATIVE DISCIPLINE" />
        </motion.div>
      </Section>

      <Section className="mt-14 grid gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <GlassPanel className="relative overflow-hidden p-6 md:p-8" tilt>
          <div className="absolute right-[-60px] top-[-60px] h-32 w-32 rounded-full bg-cyan-300/8 blur-3xl" />

          <div className="relative z-10">
            <p className="max-w-[620px] text-[15px] leading-8 text-white/60">
              We shape digital experiences with tighter typography, stronger
              composition, cleaner motion, and material depth that feels
              deliberate. The cyan-black DNA remains, but the execution feels
              sharper, calmer, and much more expensive.
            </p>

            <div className="mt-7 grid gap-3.5 md:grid-cols-2">
              {[
                {
                  Icon: Monitor,
                  title: "Modern Systems",
                  body: "Scalable, structured, and visually aligned across every touchpoint.",
                },
                {
                  Icon: Sparkles,
                  title: "Art Direction",
                  body: "Cleaner composition, stronger materials, and a more cinematic feel.",
                },
              ].map(({ Icon, title, body }) => (
                <PrincipleCard
                  key={title}
                  Icon={Icon}
                  title={title}
                  body={body}
                />
              ))}
            </div>

            <div className="mt-7 rounded-[22px] border border-white/[0.08] bg-white/[0.03] p-5">
              <p className="text-[10px] tracking-[0.2em] text-white/34">
                STUDIO PHILOSOPHY
              </p>

              <h4 className="mt-2 text-[28px] font-semibold tracking-[-0.05em] text-white">
                Quiet surfaces. Strong signal.
              </h4>

              <p className="mt-3 max-w-[560px] text-[14px] leading-8 text-white/58">
                The best premium interfaces do not fight for attention. They
                guide the eye, create trust, and make every section feel
                intentional.
              </p>

              <div className="mt-5">
                <Button icon={<ArrowRight size={15} />}>
                  LET’S BUILD SOMETHING ELEVATED
                </Button>
              </div>
            </div>
          </div>
        </GlassPanel>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.48, delay: 0.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <QualityCard
              label="AESTHETIC"
              title="Controlled glass reflections"
              body="Enough light to feel luxurious, never enough to feel noisy."
              extra="sm:translate-y-10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.48, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <QualityCard
              label="TYPOGRAPHY"
              title="Editorial rhythm and spacing"
              body="Cleaner line breaks, stronger hierarchy, and calmer reading flow."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.48, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <QualityCard
              label="LAYOUT"
              title="Asymmetric composition"
              body="More studio-grade balance, less boxed-in template behavior."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.48, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <QualityCard
              label="PRESENCE"
              title="Quiet confidence on screen"
              body="Premium pages rarely shout. They pull the eye inward."
              extra="sm:-translate-y-10"
            />
          </motion.div>
        </div>
      </Section>

      <Section className="mt-16">
        <GlassPanel className="p-5 md:p-6" tilt>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                Icon: BadgeCheck,
                title: "Refined execution",
                body: "Polished systems with controlled detail and consistent quality.",
              },
              {
                Icon: Layers3,
                title: "Layered depth",
                body: "Surfaces that feel dimensional without becoming visually heavy.",
              },
              {
                Icon: Gem,
                title: "Premium presence",
                body: "A visual tone that feels elevated, modern, and intentional.",
              },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-5 transition duration-300 hover:border-cyan-300/18"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/18 bg-cyan-300/[0.08] text-cyan-300">
                  <Icon size={16} />
                </div>

                <h4 className="text-[18px] font-semibold tracking-[-0.03em] text-white">
                  {title}
                </h4>

                <p className="mt-2 text-[13px] leading-7 text-white/56">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </Section>
    </PageShell>
  );
}