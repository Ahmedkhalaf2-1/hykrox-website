import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const TOTAL_DURATION = 4000;
const EXIT_DURATION = 800;

export default function Preloader({ onFinish }) {
  const [exitNow, setExitNow] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const markSeen = () => {
      sessionStorage.setItem("hykrox-preloader-seen", "true");
      setExitNow(true);

      setTimeout(() => {
        onFinish?.();
      }, EXIT_DURATION);
    };

    const timer = setTimeout(markSeen, TOTAL_DURATION);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!exitNow && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#020305]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {/* background */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#020304_50%,#000000_100%)]" />

          {/* grid (خففناه) */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
                `,
                backgroundSize: "52px 52px",
              }}
              animate={{ y: [0, 18, 0] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* center */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* logo */}
            <motion.h1
              className="text-[clamp(44px,8vw,90px)] font-black tracking-[0.28em] text-white"
              initial={{ letterSpacing: "0.4em", opacity: 0.6 }}
              animate={{ letterSpacing: "0.28em", opacity: 1 }}
              transition={{ duration: 1, ease: EASE }}
            >
              <span>HY</span>
              <span className="text-cyan-300">KROX</span>
            </motion.h1>

            {/* line */}
            <motion.div
              className="mx-auto mt-4 h-px w-24 bg-cyan-300/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            />

            {/* subtitle */}
            <motion.p
              className="mt-4 text-[10px] tracking-[0.4em] text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              CREATIVE DIGITAL STUDIO
            </motion.p>
          </motion.div>

          {/* exit sweep */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}