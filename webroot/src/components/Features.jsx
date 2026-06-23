import { motion } from 'framer-motion';
import { Shield, Zap, Clock, Globe, Cpu, Lock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "NVMe RAID 10",
    desc: "Up to 7.2 GB/s sequential reads. Everything loads instantly. No more chunk lag or map stutters.",
    accent: "accent-blue",
    span: "md:col-span-2",
  },
  {
    icon: Shield,
    title: "1.2 Tbps DDoS",
    desc: "Always-on enterprise mitigation across all ports. Automatic, invisible, and brutally effective.",
    accent: "accent-purple",
  },
  {
    icon: Clock,
    title: "19-second deploys",
    desc: "From payment to playable server in under 20 seconds. Our record is 11s.",
    accent: "accent-yellow",
  },
  {
    icon: Globe,
    title: "14 Global PoPs",
    desc: "Frankfurt • Amsterdam • London • NYC • Miami • Dallas • LA • São Paulo • Singapore • Tokyo + more.",
    accent: "accent-blue",
    span: "md:col-span-2",
  },
  {
    icon: Cpu,
    title: "AMD EPYC 4th Gen",
    desc: "Dedicated 4.5 GHz+ cores. Never oversold. Consistent frame times even at 120+ players.",
    accent: "accent-purple",
  },
  {
    icon: Lock,
    title: "Full root + snapshots",
    desc: "Complete control. Daily automatic snapshots + one-click restore. Your data is sacred.",
    accent: "accent-yellow",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="max-w-2xl mb-14">
        <div className="uppercase tracking-[3px] text-xs text-accent-blue font-mono mb-3">BUILT DIFFERENT</div>
        <h2 className="section-header text-6xl md:text-7xl font-semibold tracking-tighter mb-5">Performance<br />without compromise.</h2>
        <p className="text-2xl text-gray-text">Everything we do is engineered for one outcome: the smoothest possible experience for you and your players.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map((f, index) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: Math.min(index * 0.025, 0.2), type: "spring", bounce: 0.1 }}
              whileHover={{ y: -6 }}
              className={`premium-card group glass-dark border border-white/5 rounded-3xl p-9 flex flex-col ${f.span || ''}`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-${f.accent}/10 flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`text-${f.accent}`} size={28} />
              </div>
              
              <h3 className="font-display text-3xl tracking-[-1px] font-semibold mb-4 text-white">{f.title}</h3>
              <p className="text-gray-text text-[15px] leading-relaxed flex-1">{f.desc}</p>
              
              <div className="mt-8 h-px bg-gradient-to-r from-white/5 to-transparent" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

