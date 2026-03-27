import { memo, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TOKENS = {
  ease: [0.22, 1, 0.36, 1],
};

const AnimatedHeading = memo(function AnimatedHeading({
  text,
  className = "",
  highlight = [],
  as: Tag = "h2",
}) {
  const shouldReduceMotion = useReducedMotion();

  const words = useMemo(() => text.split(" "), [text]);
  const highlightSet = useMemo(() => new Set(highlight), [highlight]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: shouldReduceMotion
        ? {}
        : { staggerChildren: 0.035, delayChildren: 0.01 },
    },
  };

  const wordVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.42,
        ease: TOKENS.ease,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.28 }}
      className={className}
    >
      <Tag className="contents">
        {words.map((word, i) => {
          const clean = word.replace(/[.,!?]/g, "");
          const active = highlightSet.has(clean);

          return (
            <span
              key={`${word}-${i}`}
              className="inline-block overflow-hidden align-top"
            >
              <motion.span
                variants={wordVariants}
                className={cn(
                  "inline-block will-change-transform",
                  active && "text-cyan-300"
                )}
              >
                {word}
                <span className="inline-block">&nbsp;</span>
              </motion.span>
            </span>
          );
        })}
      </Tag>
    </motion.div>
  );
});

export default AnimatedHeading;