import { motion } from "framer-motion";
import { Shield, Radar, Link as LinkIcon, Activity } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Threat detection",
    desc: "Spot compromised hosts and malicious edges using graph signals.",
  },
  {
    icon: Radar,
    title: "Anomaly scoring",
    desc: "Rank nodes by degree z-score, PageRank and community outliers.",
  },
  {
    icon: LinkIcon,
    title: "Relationship context",
    desc: "Model lateral movement across devices and accounts.",
  },
  {
    icon: Activity,
    title: "Ready for GNNs",
    desc: "API-first design to plug in PyG or DGL models later.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Purpose-built for security data</h2>
          <p className="mt-3 text-gray-600">Lightweight now, with a clear path to real GNN inference.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group rounded-xl border border-gray-200 p-6 hover:shadow-lg bg-white"
            >
              <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 text-white grid place-items-center shadow-violet-600/30 shadow">
                <f.icon size={20} />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
