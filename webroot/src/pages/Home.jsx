import Hero from '../components/Hero';
import Features from '../components/Features';
import GamesCarousel from '../components/GamesCarousel';
import Pricing from '../components/Pricing';
import GlobalNetwork from '../components/GlobalNetwork';
import FAQ from '../components/FAQ';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Check, Zap, Globe, Shield } from 'lucide-react';

// Reusable ultra-smooth animated counter
function AnimatedCounter({ to, suffix = "", duration = 1.8 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(0, to, {
            duration,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setDisplay(Math.floor(v)),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className="count-up tabular-nums">
      {display.toLocaleString()}{suffix}
    </span>
  );
}

// Global live stats bar - constantly "growing"
function GlobalLiveBar() {
  const [players, setPlayers] = useState(124870);
  const [servers, setServers] = useState(41872);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers(p => p + Math.floor(Math.random() * 3) + 1);
      if (Math.random() > 0.7) setServers(s => s + 1);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-y border-white/10 bg-black/40 py-3 text-xs font-mono tracking-[1.5px] text-gray-text/80">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-1">
        <div><span className="text-emerald-400">●</span> <span className="text-white font-medium">{players.toLocaleString()}</span> PLAYERS ONLINE RIGHT NOW</div>
        <div><span className="text-white font-medium">{servers.toLocaleString()}</span> SERVERS ACTIVE</div>
        <div>AVG PING <span className="text-white font-medium">19ms</span></div>
        <div className="text-accent-blue">NEW SERVER EVERY 41 SECONDS</div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "Pick a game", sub: "Choose from 50+ titles or bring your own" },
    { num: "02", title: "Choose power", sub: "Instant pricing. Scale up or down anytime" },
    { num: "03", title: "One click deploy", sub: "Server is ready in ~19 seconds. Seriously." },
    { num: "04", title: "Invite your crew", sub: "Share IP or use our built-in mod manager" },
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-6 md:px-12">
      <div className="text-center mb-12">
        <div className="text-accent-blue font-mono tracking-[3px] text-xs mb-2">FOUR STEPS. ZERO PAIN.</div>
        <h2 className="section-header text-6xl tracking-[-2px]">Launch in under a minute.</h2>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {steps.map((step, i) => (
          <div key={i} className="glass-dark rounded-3xl p-7 border border-white/5 tilt-card">
            <div className="font-mono text-6xl tracking-[-3px] text-white/10 mb-2">{step.num}</div>
            <div className="font-semibold text-2xl tracking-tight mb-1.5">{step.title}</div>
            <div className="text-gray-text text-[15px]">{step.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { quote: "Best hosting we've ever used. 120 players with zero rubberbanding. The support team is unreal.", name: "Lukas • Rustafied", role: "5.4k concurrent" },
    { quote: "Deployed our full modded 1.21 server in 14 seconds. My entire community moved overnight.", name: "Mina K.", role: "Minecraft SMP owner" },
    { quote: "The only host that actually feels enterprise at these prices. Global pings are stupidly good.", name: "Viktor S.", role: "DayZ & Arma clan lead" },
    { quote: "Switched from three other hosts. This is the first one that actually feels like enterprise hardware at these prices.", name: "Jonas • Valheim community", role: "2.8k concurrent" },
  ];

  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[index];

  return (
    <section className="py-24 border-y border-white/10 bg-black/30">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="font-mono text-xs tracking-widest text-accent-purple mb-1">REAL COMMUNITIES</div>
            <h3 className="section-header text-5xl tracking-tight">Loved by the people who run the servers.</h3>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={prev} className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5">←</button>
            <button onClick={next} className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5">→</button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-dark rounded-3xl p-10 md:p-12 border border-white/5 tilt-card"
            >
              <div className="max-w-3xl">
                <div className="text-3xl md:text-4xl leading-tight tracking-tight text-white/95">“{t.quote}”</div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-xl font-bold"> 
                    {t.name[0]} 
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-gray-text">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex justify-center gap-2 md:hidden">
          <button onClick={prev} className="px-4 py-2 rounded-xl border border-white/15">←</button>
          <button onClick={next} className="px-4 py-2 rounded-xl border border-white/15">→</button>
        </div>
      </div>
    </section>
  );
}

function Infrastructure() {
  const locations = [
    { city: "Frankfurt", ping: "12ms", load: 68 },
    { city: "Amsterdam", ping: "18ms", load: 54 },
    { city: "London", ping: "21ms", load: 71 },
    { city: "New York", ping: "38ms", load: 49 },
    { city: "Singapore", ping: "64ms", load: 33 },
    { city: "Tokyo", ping: "71ms", load: 41 },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
      <div className="text-center mb-12">
        <div className="font-mono tracking-[3px] text-xs text-accent-purple mb-2">THE BACKBONE</div>
        <h2 className="section-header text-6xl tracking-[-2.2px]">Enterprise infrastructure.<br />Consumer pricing.</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {locations.map((loc, i) => (
          <div key={i} className="glass-dark rounded-3xl p-6 border border-white/5 tilt-card">
            <div className="flex justify-between mb-6">
              <div className="font-semibold text-xl">{loc.city}</div>
              <div className="text-xs px-2 py-0.5 bg-white/5 rounded font-mono self-start">{loc.ping}</div>
            </div>
            <div className="text-[10px] text-gray-text mb-1.5">CURRENT LOAD</div>
            <div className="h-1 bg-white/10 rounded mb-2">
              <div className="h-1 bg-gradient-to-r from-accent-blue to-accent-purple rounded transition-all" style={{ width: `${loc.load}%` }} />
            </div>
            <div className="text-right text-xs font-mono text-white/70">{loc.load}%</div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-xs text-gray-text/70 tracking-widest">TIER-1 NETWORK • ANYCAST • 480Gbps+ PER LOCATION • AUTOMATIC FAILOVER</div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="pt-20">
      <Hero />

      <GlobalLiveBar />

      <GamesCarousel />

      <Features />

      {/* Modern Pricing right on the homepage (Minecraft focused) */}
      <div id="pricing" className="pt-8 pb-10">
        <Pricing />
      </div>

      <HowItWorks />

      <Infrastructure />

      <Testimonials />

      <GlobalNetwork />

      {/* Final massive CTA - bigger and bolder */}
      <div className="max-w-5xl mx-auto text-center py-24 px-6 border-t border-white/10">
        <h2 className="text-7xl md:text-8xl font-display font-semibold tracking-[-3.2px] leading-none mb-6">The only host<br />your players will notice.</h2>
        <p className="text-2xl text-gray-text max-w-lg mx-auto mb-10">Join the 41k+ communities who stopped compromising on performance.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
          <Link to="/minecraft" className="group px-14 py-4 rounded-2xl bg-white text-[#050507] text-xl font-semibold active:scale-[0.985] flex items-center justify-center gap-3 transition-all hover:bg-white/90">
            Deploy in 19 seconds <Zap className="group-hover:rotate-12 transition" />
          </Link>
          <Link to="/vps" className="px-10 py-4 rounded-2xl border border-white/20 text-xl font-medium hover:bg-white/5 transition flex items-center justify-center gap-2">
            Explore VPS <Globe size={20} />
          </Link>
        </div>
        <div className="text-[10px] tracking-[2px] text-gray-text/50">NO CREDIT CARD • 72-HOUR REFUNDS • CANCEL ANYTIME</div>
      </div>

      <FAQ />
    </div>
  );
}
