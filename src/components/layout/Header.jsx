import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { Menu, Search, ArrowRight } from "lucide-react";
import MobileMenu from "../MobileMenu";
import Button from "../ui/Button";

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

const TOKENS = {
  ease: [0.22, 1, 0.36, 1],
};

function NavItem({ item }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        cn(
          "group relative px-3 py-2 text-[11px] font-semibold tracking-[0.18em] transition-colors duration-300",
          isActive ? "text-white" : "text-white/45 hover:text-white/85"
        )
      }
    >
      {({ isActive }) => (
        <>
          <span className="relative z-10">{item.name}</span>

          <span
            className={cn(
              "absolute inset-x-3 bottom-[6px] h-px origin-center bg-cyan-300/90 transition-all duration-300",
              isActive
                ? "scale-x-100 opacity-100"
                : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
            )}
          />
        </>
      )}
    </NavLink>
  );
}

function IconButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/62 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white",
        className
      )}
    >
      {children}
    </button>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: TOKENS.ease }}
        className="sticky top-3 z-[90] mb-4"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-[24px] border px-5 py-3.5 backdrop-blur-[18px] transition-all duration-300",
            scrolled
              ? "border-white/[0.10] bg-black/55 shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
              : "border-white/[0.07] bg-black/26"
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),transparent_42%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/8" />

          <div className="relative z-10 flex items-center justify-between gap-6">
            <Link to="/" className="group shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.55)]" />

                <div>
                  <h1 className="text-[29px] font-black tracking-[-0.08em] text-white transition-transform duration-300 group-hover:translate-x-0.5">
                    HY<span className="text-cyan-300">KROX</span>
                  </h1>

                  <p className="mt-0.5 text-[9px] tracking-[0.30em] text-white/32">
                    CREATIVE DIGITAL STUDIO
                  </p>
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-5 lg:flex">
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.to} item={item} />
              ))}

              <div className="ml-3 flex items-center gap-2">
                <IconButton>
                  <Search size={16} />
                </IconButton>

                <Link to="/contact">
                  <Button icon={<ArrowRight size={15} />}>
                    START PROJECT
                  </Button>
                </Link>
              </div>
            </nav>

            <IconButton
              onClick={() => setMenuOpen(true)}
              className="lg:hidden"
            >
              <Menu size={19} />
            </IconButton>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}