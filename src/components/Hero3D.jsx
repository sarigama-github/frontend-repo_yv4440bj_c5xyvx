import { useEffect, useMemo, useState, Suspense } from "react";
import { motion } from "framer-motion";
// Lazy import Spline only when needed to avoid runtime quirks
const LazySpline = (props) => {
  const [Comp, setComp] = useState(null);
  useEffect(() => {
    let mounted = true;
    import("@splinetool/react-spline").then((m) => {
      if (mounted) setComp(() => m.default);
    });
    return () => {
      mounted = false;
    };
  }, []);
  if (!Comp) return null;
  return <Comp {...props} />;
};

function useWebGLSupport() {
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const ok = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setSupported(!!ok);
    } catch (e) {
      setSupported(false);
    }
  }, []);
  return supported;
}

export default function Hero3D() {
  const webgl = useWebGLSupport();
  const prefersReduceMotion = useMemo(
    () => (typeof window !== "undefined" && window.matchMedia)
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
    []
  );

  // Manual toggle to isolate the issue; default to off so fallback is always shown
  const [enable3D, setEnable3D] = useState(false);

  const canRender3D = enable3D && webgl && !prefersReduceMotion;

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      {/* Background base: always visible gradient and blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-sky-50 to-cyan-50" />
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-violet-300/30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl animate-pulse" />

        {/* 3D Layer (optional). No mask/opacity to rule out compositing issues */}
        {canRender3D && (
          <div className="hidden sm:block h-full pointer-events-none">
            <Suspense fallback={null}>
              <LazySpline scene="https://prod.spline.design/4cEoU3prqA1Y9qvZ/scene.splinecode" />
            </Suspense>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-1 text-xs text-gray-700 ring-1 ring-black/5 shadow-sm">
            <span className={`h-2 w-2 rounded-full ${canRender3D ? "bg-emerald-500" : "bg-amber-500"} animate-pulse`} />
            {canRender3D ? "Live demo — 3D cyber graph" : "Fallback mode — 2D visuals active"}
          </div>
          <h1 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight text-gray-900">
            Graph Neural Networks for Cybersecurity
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Explore suspicious connections, anomalous nodes, and attack paths with an interactive hero and a clean, modern interface.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setEnable3D((v) => !v)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 shadow"
            >
              {enable3D ? "Disable 3D" : "Enable 3D"}
            </button>
            {!webgl && (
              <span className="text-xs text-gray-600">WebGL not available</span>
            )}
            {prefersReduceMotion && (
              <span className="text-xs text-gray-600">Reduced motion enabled</span>
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#demo" className="px-5 py-3 rounded-lg text-white bg-gray-900 hover:bg-gray-800 shadow">
              Try the demo
            </a>
            <a href="#features" className="px-5 py-3 rounded-lg text-gray-900 bg-white/80 backdrop-blur hover:bg-white shadow ring-1 ring-black/5">
              Learn more
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade for contrast */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/90 to-transparent z-10" />
    </section>
  );
}
