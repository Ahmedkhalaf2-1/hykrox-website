import { motion, useReducedMotion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

export default function PageShell({ children }) {
  const shouldReduceMotion = useReducedMotion();

  const pageVariants = {
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: 16,
        },
    animate: shouldReduceMotion
      ? {
          opacity: 1,
          transition: { duration: 0.2 },
        }
      : {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          },
        },
    exit: shouldReduceMotion
      ? {
          opacity: 0,
          transition: { duration: 0.18 },
        }
      : {
          opacity: 0,
          y: -10,
          transition: {
            duration: 0.24,
            ease: [0.4, 0, 1, 1],
          },
        },
  };

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 min-h-screen overflow-hidden"
      style={{ willChange: "transform, opacity" }}
    >
      {/* ambient world */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-140px] top-[-120px] h-[280px] w-[280px] rounded-full bg-cyan-300/7 blur-3xl" />
        <div className="absolute right-[-120px] top-[18%] h-[240px] w-[240px] rounded-full bg-cyan-300/6 blur-3xl" />
        <div className="absolute bottom-[-100px] left-[18%] h-[220px] w-[220px] rounded-full bg-white/[0.025] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.035),transparent_30%)]" />
      </div>

      <div className="relative mx-auto max-w-[1260px] px-5 pb-24 pt-6 md:px-8 lg:px-10">
        <Header />

        <div className="relative">
          {children}
        </div>

        <Footer />
      </div>
    </motion.main>
  );
}