import { useEffect, useState, memo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Preloader from "./components/Preloader";

import BackgroundFX from "./components/effects/BackgroundFX";
import NoiseOverlay from "./components/effects/NoiseOverlay";
import ScrollProgress from "./components/effects/ScrollProgress";

import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import WorkPage from "./pages/WorkPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

const MemoBackgroundFX = memo(BackgroundFX);
const MemoNoiseOverlay = memo(NoiseOverlay);
const MemoScrollProgress = memo(ScrollProgress);

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence initial={false} mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [showPreloader, setShowPreloader] = useState(() => {
    return sessionStorage.getItem("hykrox-preloader-seen") !== "true";
  });

  return (
    <>
      <AnimatePresence initial={false}>
        {showPreloader && (
          <Preloader onFinish={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      <div
        className={showPreloader ? "pointer-events-none invisible" : "visible"}
        aria-hidden={showPreloader}
      >
        <MemoBackgroundFX />
        <MemoNoiseOverlay />
        <MemoScrollProgress />
        <AppRoutes />
      </div>
    </>
  );
}