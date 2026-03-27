import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { X, ArrowRight, Sparkles } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NAV_ITEMS = [
  { name: "HOME", to: "/" },
  { name: "SERVICES", to: "/services" },
  { name: "WORK", to: "/work" },
  { name: "ABOUT", to: "/about" },
  { name: "CONTACT", to: "/contact" },
];

const EASE = [0.22, 1, 0.36, 1];

function MobileNavItem({ item, index, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.45, delay: 0.08 + index * 0.06, ease: EASE }}
    >
      <NavLink
        to={item.to}
        onClick={onClose}
        className={({ isActive }) =>
          cn(
            "group relative inline-flex items-center gap-3 text-[30px] font-semibold tracking-[-0.05em] transition-all duration-300 md:text-[36px]",
            isActive ? "text-white" : "text-white/68 hover:text-white"
          )
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.8)] transition-all duration-300",
                isActive
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
              )}
            />

            <span>{item.name}</span>

            <span
              className={cn(
                "translate-y-[1px] transition-all duration-300",
                isActive
                  ? "opacity-100 text-cyan-300"
                  : "opacity-0 -translate-x-1 text-cyan-300 group-hover:translate-x-0 group-hover:opacity-100"
              )}
            >
              <ArrowRight size={18} />
            </span>
          </>
        )}
      </NavLink>
    </motion.div>
  );
}

export default function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(18px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-0 z-[110] bg-black/92 lg:hidden"
        >
          <div className="relative flex h-full flex-col overflow-hidden">
            <div className="pointer-events-none absolute left-[-80px] top-[-60px] h-44 w-44 rounded-full bg-cyan-300/12 blur-3xl" />
            <div className="pointer-events-none absolute right-[-60px] bottom-[12%] h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_26%)]" />

            <div className="relative z-10 flex items-center justify-between px-6 pb-4 pt-6">
              <Link to="/" onClick={onClose} className="group">
                <div className="flex items-center gap-2">
                  <h1 className="text-[28px] font-extrabold tracking-[-0.07em] text-white">
                    HY<span className="text-cyan-300">KROX</span>
                  </h1>

                  <span className="inline-flex rounded-full border border-cyan-300/18 bg-cyan-300/[0.08] p-1.5 text-cyan-300">
                    <Sparkles size={11} />
                  </span>
                </div>

                <p className="mt-1 text-[9px] tracking-[0.28em] text-white/30">
                  CREATIVE DIGITAL STUDIO
                </p>
              </Link>

              <button
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/62 transition-all duration-300 hover:border-cyan-300/25 hover:text-cyan-300"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative z-10 mx-6 border-t border-white/[0.07]" />

            <nav className="relative z-10 flex flex-1 flex-col justify-center px-6">
              <div className="space-y-5">
                {NAV_ITEMS.map((item, i) => (
                  <MobileNavItem
                    key={item.to}
                    item={item}
                    index={i}
                    onClose={onClose}
                  />
                ))}
              </div>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.45, delay: 0.22, ease: EASE }}
              className="relative z-10 px-6 pb-7 pt-3"
            >
              <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-5">
                <p className="text-[10px] tracking-[0.2em] text-white/34">
                  STUDIO PRESENCE
                </p>

                <p className="mt-3 max-w-[320px] text-[13px] leading-7 text-white/56">
                  Premium interfaces, cinematic motion, and controlled visual
                  depth for brands that want stronger presence.
                </p>

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-4">
                  <p className="text-[10px] tracking-[0.2em] text-white/28">
                    © 2026 HYKROX STUDIO
                  </p>

                  <div className="flex items-center gap-3 text-[10px] tracking-[0.18em] text-white/34">
                    <span>PRIVACY</span>
                    <span>TERMS</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}