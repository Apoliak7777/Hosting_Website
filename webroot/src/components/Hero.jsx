import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero({ 
  title = "Welcome to the Future of", 
  highlight = "Game Hosting", 
  subtitle = "Ultra-low latency. Instant deployment. Military-grade protection. The most advanced game servers on the planet.", 
  learnMoreLink = "#features" 
}) {
  const canvasRef = useRef(null);

  // Subtle premium particle system in hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = Math.min(window.innerHeight * 0.95, 820);
    let particles = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = Math.min(window.innerHeight * 0.95, 820);
    };
    window.addEventListener('resize', resize);

    for (let i = 0; i < 52; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.85,
        r: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.18,
        alpha: Math.random() * 0.5 + 0.15
      });
    }

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.9)';

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 40 || p.y > h * 0.82) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,240,255,${p.alpha})`;
        ctx.fill();
      });

      // very subtle connecting lines between close particles
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.12 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } }
  };

  return (
    <div className="relative min-h-[96vh] pt-16 pb-12 lg:pt-20 lg:pb-20 overflow-hidden flex items-center justify-center px-6 grid-bg">
      <div className="noise absolute inset-0 z-10 pointer-events-none" />

      {/* Enhanced cinematic particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ opacity: 0.65 }}
      />

      {/* Multiple layered orbs for depth - Linear/Vercel inspired */}
      <motion.div 
        className="absolute -top-32 -left-40 w-[680px] h-[680px] rounded-full bg-accent-blue/8 blur-[160px] z-0"
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/4 -right-32 w-[580px] h-[580px] rounded-full bg-accent-purple/8 blur-[150px] z-0"
        animate={{ x: [0, -45, 25, 0], y: [0, 50, -35, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-accent-yellow/5 blur-[110px] z-0"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto text-center relative z-20 pt-6">
        <motion.div 
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-6 py-1.5 mb-9 rounded-full border border-white/10 bg-white/[0.02] text-[11px] tracking-[2px] font-mono uppercase text-gray-text/90"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-online" />
          42,891 SERVERS • 128,473 PLAYERS ONLINE
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show">
          <h1 className="text-[68px] md:text-[92px] lg:text-[108px] leading-[0.88] font-display font-semibold tracking-[-4.8px] mb-6">
            {title} <br className="hidden lg:block" />
            <span className="text-gradient-purple">{highlight}</span>
          </h1>

          <motion.p variants={item} className="max-w-[620px] mx-auto text-[22px] md:text-2xl text-gray-text/95 tracking-[-0.3px] mb-14">
            {subtitle}
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/minecraft"
              className="group inline-flex items-center justify-center gap-3 px-12 py-4.5 rounded-2xl bg-white text-[#050507] text-lg font-semibold tracking-[-0.2px] active:scale-[0.985] hover:bg-white/90 transition-all shadow-2xl shadow-black/50"
            >
              Deploy instantly
              <ArrowRight className="group-hover:translate-x-0.5 transition" size={20} />
            </Link>

            <a 
              href={learnMoreLink}
              className="group inline-flex items-center justify-center gap-3 px-10 py-4.5 rounded-2xl border border-white/15 glass text-white font-semibold text-lg tracking-[-0.2px] hover:border-white/30 active:scale-[0.985] transition-all"
            >
              <Play size={18} className="opacity-70 group-hover:opacity-100" /> See it in action
            </a>
          </div>
        </motion.div>

        {/* Trust bar with real numbers */}
        <div className="mt-16 flex flex-wrap justify-center gap-x-14 gap-y-4 text-sm text-gray-text/80">
          {[
            { label: "avg deploy", value: "19s" },
            { label: "uptime", value: "99.99%" },
            { label: "locations", value: "14" },
            { label: "DDoS", value: "1.2 Tbps" },
          ].map((stat, i) => (
            <div key={i} className="flex items-baseline gap-2 font-medium">
              <span className="font-mono text-xl text-white tracking-tighter">{stat.value}</span>
              <span className="text-gray-text/70">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 2.1, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[3px] text-gray-text/50 flex flex-col items-center z-20"
      >
        SCROLL TO EXPLORE THE PLATFORM
      </motion.div>
    </div>
  );
}
