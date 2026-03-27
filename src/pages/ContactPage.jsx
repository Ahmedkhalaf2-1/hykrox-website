import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Mail,
  Phone,
  MapPin,
  Clock3,
  Sparkles,
  BadgeCheck,
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

function InputField({ label, type = "text", as = "input", rows = 5 }) {
  const base =
    "w-full rounded-[18px] border border-white/[0.08] bg-white/[0.035] px-4 py-4 text-[14px] text-white placeholder:text-white/28 outline-none transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.05] focus:border-cyan-300/25 focus:bg-white/[0.055]";

  return (
    <label className="block">
      <span className="mb-2.5 block text-[10px] tracking-[0.2em] text-white/34">
        {label}
      </span>

      {as === "textarea" ? (
        <textarea
          rows={rows}
          placeholder={label}
          className={cn(base, "resize-none")}
        />
      ) : (
        <input type={type} placeholder={label} className={base} />
      )}
    </label>
  );
}

function MiniStat({ value, label }) {
  return (
    <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] px-4 py-4">
      <p className="text-[22px] font-bold tracking-[-0.05em] text-white">
        {value}
      </p>
      <p className="mt-1 text-[10px] tracking-[0.18em] text-white/38">
        {label}
      </p>
    </div>
  );
}

function DirectItem({ icon: Icon, text, subtle }) {
  return (
    <div className="flex items-start gap-3">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-cyan-300">
        <Icon size={15} />
      </span>

      <div>
        <p className="text-[14px] text-white/78 transition-colors hover:text-white">
          {text}
        </p>
        {subtle ? (
          <p className="mt-1 text-[12px] text-white/38">{subtle}</p>
        ) : null}
      </div>
    </div>
  );
}

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6.94 8.5a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12ZM5.6 9.82h2.68V18H5.6V9.82Zm4.34 0h2.57v1.12h.04c.36-.68 1.23-1.4 2.54-1.4 2.72 0 3.22 1.79 3.22 4.12V18h-2.67v-3.83c0-.91-.02-2.09-1.27-2.09-1.28 0-1.48 1-1.48 2.03V18H9.94V9.82Z" />
  </svg>
);

const DribbbleIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M7 7.5c3 2 6 6.5 7.5 10.5" />
    <path d="M16.8 6.8c-2.4 2-7.3 3-11.3 2.8" />
    <path d="M20.2 13.2c-2.7-.8-6.6-.5-10.4 1.2" />
  </svg>
);

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback((e) => {
    e?.preventDefault?.();
    setSent(true);
    window.setTimeout(() => setSent(false), 2800);
  }, []);

  return (
    <PageShell>
      <Section className="relative overflow-hidden pt-14">
        <div className="pointer-events-none absolute left-[-120px] top-[-80px] h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-80px] top-[20%] h-[220px] w-[220px] rounded-full bg-cyan-300/10 blur-3xl" />

        <SectionEyebrow>CONTACT</SectionEyebrow>

        <AnimatedHeading
          text="Let’s build something unforgettable."
          highlight={["unforgettable"]}
          className="max-w-[900px] text-[40px] font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-[72px]"
        />

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-[760px] text-[15px] leading-8 text-white/58 md:text-[16px]"
        >
          Share your idea, product, or brand direction and we’ll shape a
          premium digital experience with clarity, presence, and stronger
          visual control.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 grid max-w-[720px] gap-4 sm:grid-cols-3"
        >
          <MiniStat value="24H" label="FAST RESPONSE FLOW" />
          <MiniStat value="AAA" label="PREMIUM STANDARD" />
          <MiniStat value="1:1" label="DIRECT COLLABORATION" />
        </motion.div>
      </Section>

      <Section className="mt-14 grid gap-7 lg:grid-cols-[1.02fr_0.98fr]">
        <GlassPanel className="relative overflow-hidden p-6 md:p-7" tilt>
          <div className="absolute right-[-50px] top-[-50px] h-28 w-28 rounded-full bg-cyan-300/10 blur-3xl" />

          <div className="relative z-10">
            <p className="text-[10px] tracking-[0.22em] text-cyan-300/75">
              START A PROJECT
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <InputField label="Your Name" />
                <InputField label="Email Address" type="email" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <InputField label="Project Type" />
                <InputField label="Estimated Budget" />
              </div>

              <InputField label="Project Details" as="textarea" rows={6} />

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-300/[0.08] px-4 py-2 text-[13px] text-cyan-300"
                    >
                      <Check size={16} />
                      Inquiry sent! We’ll be in touch soon.
                    </motion.div>
                  ) : (
                    <motion.div
                      key="btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Button
                        icon={<ArrowRight size={15} />}
                        type="submit"
                      >
                        SEND INQUIRY
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-[12px] text-white/34">
                  Usually replies within one business day.
                </p>
              </div>
            </form>
          </div>
        </GlassPanel>

        <div className="grid gap-7">
          <GlassPanel className="relative overflow-hidden p-6 md:p-7" tilt>
            <div className="absolute right-[-40px] top-[-40px] h-24 w-24 rounded-full bg-cyan-300/8 blur-3xl" />

            <div className="relative z-10">
              <p className="text-[10px] tracking-[0.22em] text-white/38">
                DIRECT
              </p>

              <div className="mt-5 space-y-4">
                <DirectItem
                  icon={Mail}
                  text="hello@hykrox.studio"
                  subtle="For project inquiries and collaborations"
                />
                <DirectItem
                  icon={Phone}
                  text="+20 000 000 0000"
                  subtle="Available for selected client calls"
                />
                <DirectItem
                  icon={MapPin}
                  text="Cairo, Egypt"
                  subtle="Working with regional and global clients"
                />
                <DirectItem
                  icon={Clock3}
                  text="Mon - Fri / 10:00 - 18:00"
                  subtle="Structured communication, premium delivery"
                />
              </div>

              <div className="mt-7 rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="text-[10px] tracking-[0.2em] text-white/34">
                  WHAT HAPPENS NEXT
                </p>

                <div className="mt-4 space-y-3">
                  {[
                    "We review your inquiry and goals",
                    "We align on scope, direction, and tone",
                    "We propose a premium execution path",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-cyan-300/16 bg-cyan-300/[0.08] text-cyan-300">
                        <BadgeCheck size={13} />
                      </span>
                      <p className="text-[13px] text-white/62">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6 md:p-7" tilt>
            <p className="text-[10px] tracking-[0.22em] text-white/38">
              SOCIAL
            </p>

            <div className="mt-5 grid gap-3.5 sm:grid-cols-3">
              {[
                { label: "Instagram", Icon: InstagramIcon },
                { label: "LinkedIn", Icon: LinkedInIcon },
                { label: "Dribbble", Icon: DribbbleIcon },
              ].map(({ label, Icon }) => (
                <ThreeDTiltCard key={label} intensity={8}>
                  <div className="group rounded-[20px] border border-white/[0.08] bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/[0.05]">
                    <Icon className="h-5 w-5 text-cyan-300" />
                    <p className="mt-4 text-[13px] text-white/65">{label}</p>
                  </div>
                </ThreeDTiltCard>
              ))}
            </div>
          </GlassPanel>
        </div>
      </Section>
    </PageShell>
  );
}