import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      const value = height > 0 ? scrollTop / height : 0;
      setProgress(value);
    };

    window.addEventListener("scroll", update);
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[2px]">
      <div
        className="h-full bg-cyan-300 transition-all duration-150"
        style={{
          width: `${progress * 100}%`,
          boxShadow: "0 0 12px rgba(34,211,238,0.6)",
        }}
      />
    </div>
  );
}