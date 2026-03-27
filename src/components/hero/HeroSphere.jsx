import { memo, useEffect, useRef } from "react";

const HeroSphere = memo(function HeroSphere() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;

    function setCanvasSize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    }

    setCanvasSize();

    const PHI = (1 + Math.sqrt(5)) / 2;

    const baseVerts = [
      [-1, PHI, 0],
      [1, PHI, 0],
      [-1, -PHI, 0],
      [1, -PHI, 0],
      [0, -1, PHI],
      [0, 1, PHI],
      [0, -1, -PHI],
      [0, 1, -PHI],
      [PHI, 0, -1],
      [PHI, 0, 1],
      [-PHI, 0, -1],
      [-PHI, 0, 1],
    ].map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return [x / len, y / len, z / len];
    });

    const edges = [
      [0, 1],
      [0, 5],
      [0, 7],
      [0, 10],
      [0, 11],
      [1, 5],
      [1, 7],
      [1, 8],
      [1, 9],
      [2, 3],
      [2, 4],
      [2, 6],
      [2, 10],
      [2, 11],
      [3, 4],
      [3, 6],
      [3, 8],
      [3, 9],
      [4, 5],
      [4, 9],
      [4, 11],
      [5, 9],
      [5, 11],
      [6, 7],
      [6, 8],
      [6, 10],
      [7, 8],
      [7, 10],
      [8, 9],
      [10, 11],
    ];

    function midpoint(a, b) {
      const v = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
      const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      return [v[0] / len, v[1] / len, v[2] / len];
    }

    const allVerts = [...baseVerts];
    const allEdges = [...edges];

    edges.forEach(([a, b]) => {
      const mid = midpoint(baseVerts[a], baseVerts[b]);
      const idx = allVerts.length;
      allVerts.push(mid);
      allEdges.push([a, idx], [idx, b]);
    });

    let rx = 0.45;
    let ry = 0;
    let t = 0;

    function project([x, y, z]) {
      const cy = Math.cos(ry);
      const sy = Math.sin(ry);
      const x1 = cy * x + sy * z;
      const z1 = -sy * x + cy * z;

      const cx = Math.cos(rx);
      const sx = Math.sin(rx);
      const y1 = cx * y - sx * z1;
      const z2 = sx * y + cx * z1;

      const fov = 3.6;
      const scale = W * 0.39;
      const d = fov / (fov + z2);

      return [W / 2 + x1 * scale * d, H / 2 + y1 * scale * d, z2];
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.004;
      ry = t + mouseRef.current.x * 0.8;
      rx = 0.45 + mouseRef.current.y * 0.45;

      const projected = allVerts.map(project);

      allEdges.forEach(([a, b]) => {
        const [ax, ay, az] = projected[a];
        const [bx, by, bz] = projected[b];
        const avgZ = (az + bz) / 2;
        const alpha = Math.max(0.06, Math.min(0.58, (avgZ + 1.2) * 0.28));
        const isCyan = avgZ > 0.25;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = isCyan
          ? `rgba(34,211,238,${alpha * 1.3})`
          : `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = isCyan ? 1.15 : 0.65;
        ctx.stroke();
      });

      projected.forEach(([x, y, z]) => {
        if (z > 0.25) {
          ctx.beginPath();
          ctx.arc(x, y, 1.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34,211,238,${Math.max(0.10, (z + 0.5) * 0.38)})`;
          ctx.shadowBlur = 14;
          ctx.shadowColor = "rgba(34,211,238,0.4)";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 0.55,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 0.35,
      };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const ro = new ResizeObserver(() => {
      setCanvasSize();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
});

export default HeroSphere;