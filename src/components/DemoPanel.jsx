import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

function randomGraph(n = 20, m = 40) {
  const nodes = Array.from({ length: n }, (_, i) => ({ id: i, score: Math.random() }));
  const edges = [];
  while (edges.length < m) {
    const a = Math.floor(Math.random() * n);
    const b = Math.floor(Math.random() * n);
    if (a !== b && !edges.find(e => (e.a === a && e.b === b) || (e.a === b && e.b === a))) {
      edges.push({ a, b, w: +(Math.random().toFixed(2)) });
    }
  }
  return { nodes, edges };
}

export default function DemoPanel() {
  const [graph, setGraph] = useState(() => randomGraph());

  useEffect(() => {
    const id = setInterval(() => setGraph(randomGraph()), 5000);
    return () => clearInterval(id);
  }, []);

  const maxScore = useMemo(() => Math.max(...graph.nodes.map(n => n.score)), [graph]);

  return (
    <section id="demo" className="relative py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Interactive demo</h3>
            <p className="mt-2 text-gray-600">A tiny synthetic network refreshes periodically to show how suspicious nodes pop with higher scores.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/test" className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800">Check backend</a>
              <a href="#features" className="px-4 py-2 rounded-md bg-white ring-1 ring-gray-200 hover:bg-gray-50">See features</a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-violet-500/10 to-blue-500/10 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
              <svg viewBox="0 0 600 400" className="w-full h-[320px]">
                <defs>
                  <radialGradient id="node" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </radialGradient>
                </defs>
                {graph.edges.map((e, i) => {
                  const ax = 80 + (e.a * 997 % 440);
                  const ay = 60 + (e.a * 733 % 260);
                  const bx = 80 + (e.b * 823 % 440);
                  const by = 60 + (e.b * 613 % 260);
                  return (
                    <motion.line
                      key={i}
                      x1={ax}
                      y1={ay}
                      x2={bx}
                      y2={by}
                      stroke="#c7d2fe"
                      strokeWidth={1 + e.w}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ duration: 0.6 }}
                    />
                  );
                })}
                {graph.nodes.map((n, i) => {
                  const x = 80 + (i * 997 % 440);
                  const y = 60 + (i * 733 % 260);
                  const r = 6 + (n.score / maxScore) * 10;
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={r}
                      fill="url(#node)"
                      stroke="#4f46e5"
                      strokeWidth="1"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.01 }}
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
