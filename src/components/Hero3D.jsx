import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";

export default function Hero3D() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* Spline scene (3D) - lightweight cloud-hosted scene id, fallback gradient */}
        <div className="hidden sm:block h-full">
          <Spline scene="https://prod.spline.design/4cEoU3prqA1Y9qvZ/scene.splinecode" />
        </div>
        <div className="sm:hidden h-full bg-gradient-to-br from-violet-600/30 via-blue-500/30 to-cyan-400/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs text-gray-700 ring-1 ring-black/5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live demo — 3D cyber graph
          </div>
          <h1 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight text-gray-900">
            Graph Neural Networks for Cybersecurity
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Explore suspicious connections, anomalous nodes, and attack paths with an interactive 3D hero and a clean, modern interface.
          </p>
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

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
    </section>
  );
}
