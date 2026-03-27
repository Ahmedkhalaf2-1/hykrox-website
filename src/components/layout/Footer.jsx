import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Sparkles,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

import Button from "../ui/Button";
import GlassPanel from "../ui/GlassPanel";
import ThreeDTiltCard from "../ui/ThreeDTiltCard";
import AnimatedHeading from "../common/AnimatedHeading";
import Section from "../common/Section";

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

function ContactLine({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3 text-[14px] text-white/65 transition-colors duration-300 hover:text-white">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.035] text-cyan-300">
        <Icon size={14} />
      </span>
      <span>{children}</span>
    </div>
  );
}

function SocialButton({ Icon }) {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ duration: 0.22 }}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.035] text-white/65 transition-colors duration-300 hover:border-cyan-300/28 hover:text-cyan-300"
    >
      <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
    </motion.button>
  );
}

function MiniStat({ value, label }) {
  return (
    <ThreeDTiltCard intensity={7}>
      <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] px-4 py-4">
        <p className="text-[24px] font-bold tracking-[-0.05em] text-white">
          {value}
        </p>
        <p className="mt-1 text-[10px] tracking-[0.18em] text-white/36">
          {label}
        </p>
      </div>
    </ThreeDTiltCard>
  );
}

export default memo(function Footer() {
  return (
    <Section className="mt-28 pb-6">
      <GlassPanel className="relative overflow-hidden p-7 md:p-9" tilt>
        <div className="pointer-events-none absolute left-[-80px] top-[-60px] h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-40px] bottom-[-60px] h-40 w-40 rounded-full bg-cyan-300/8 blur-3xl" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-300/[0.08] px-4 py-2 text-[10px] font-semibold tracking-[0.24em] text-cyan-300/80">
              <Sparkles size={12} />
              READY TO BUILD SOMETHING UNFORGETTABLE?
            </div>

            <AnimatedHeading
              text="HYKROX"
              className="mt-5 text-[42px] font-semibold leading-[0.9] tracking-[-0.08em] text-white md:text-[78px]"
              as="h3"
            />

            <p className="mt-4 max-w-[540px] text-[15px] leading-8 text-white/58">
              A luxury digital studio aesthetic built on structure, restraint,
              and material depth. Designed to feel expensive, never excessive.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact">
                <Button icon={<ArrowRight size={15} />}>
                  START A PROJECT
                </Button>
              </Link>

              <Button variant="secondary" icon={<Play size={14} />}>
                PLAY REEL
              </Button>
            </div>

            <div className="mt-8 grid max-w-[520px] gap-3 sm:grid-cols-3">
              <MiniStat value="24H" label="FAST REPLY" />
              <MiniStat value="AAA" label="PREMIUM FEEL" />
              <MiniStat value="1:1" label="DIRECT FLOW" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <GlassPanel className="p-5" tilt>
              <p className="text-[10px] tracking-[0.2em] text-white/35">CONTACT</p>

              <div className="mt-4 space-y-3">
                <ContactLine icon={Mail}>hello@hykrox.studio</ContactLine>
                <ContactLine icon={Phone}>+20 000 000 0000</ContactLine>
                <ContactLine icon={MapPin}>Cairo, Egypt</ContactLine>
              </div>
            </GlassPanel>

            <GlassPanel className="p-5" tilt>
              <p className="text-[10px] tracking-[0.2em] text-white/35">SOCIAL</p>

              <div className="mt-4 flex items-center gap-2.5">
                <SocialButton Icon={InstagramIcon} />
                <SocialButton Icon={LinkedInIcon} />
                <SocialButton Icon={DribbbleIcon} />
              </div>

              <p className="mt-4 text-[12px] leading-6 text-white/38">
                Follow the studio’s visual language, process, and selected work.
              </p>
            </GlassPanel>

            <div className="sm:col-span-2">
              <GlassPanel className="p-5" tilt>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <p className="text-[10px] tracking-[0.22em] text-white/30">
                    © 2026 HYKROX STUDIO
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-[0.2em] text-white/38">
                    <span className="cursor-pointer transition-colors hover:text-white/70">
                      PRIVACY
                    </span>
                    <span className="cursor-pointer transition-colors hover:text-white/70">
                      TERMS
                    </span>
                    <span className="cursor-pointer transition-colors hover:text-white/70">
                      STYLEBOOK
                    </span>
                  </div>
                </div>
              </GlassPanel>
            </div>
          </div>
        </div>
      </GlassPanel>
    </Section>
  );
});