import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Check, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';

const plans = [
  { id: 'dirt', name: 'Dirt', ram: '1GB', monthly: 2, yearly: 19.2, vcpu: 1, storage: 5, desc: 'Perfect for small friend groups' },
  { id: 'wood', name: 'Wood', ram: '2GB', monthly: 4, yearly: 38.4, vcpu: 2, storage: 10, desc: 'Growing communities' },
  { id: 'cobble', name: 'Cobble', ram: '4GB', monthly: 8, yearly: 76.8, vcpu: 3, storage: 15, desc: 'Serious modpacks' },
  { id: 'iron', name: 'Iron', ram: '6GB', monthly: 10, yearly: 96, vcpu: 4, storage: 30, isPopular: true, desc: 'The sweet spot' },
  { id: 'gold', name: 'Gold', ram: '8GB', monthly: 14, yearly: 134.4, vcpu: 4, storage: 50, desc: 'Large servers' },
  { id: 'netherite', name: 'Netherite', ram: '14GB', monthly: 20, yearly: 192, vcpu: 4, storage: 80, desc: 'Enterprise / streamers' },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [deploying, setDeploying] = useState(false);
  const navigate = useNavigate();
  const { addServer, isAuthenticated, login } = useAuth();

  const handleQuickDeploy = (plan) => {
    setSelectedPlan(plan);
    setDeploying(true);

    setTimeout(() => {
      const server = addServer({
        game: 'Minecraft',
        plan: plan.name,
        ram: plan.ram,
        storage: `${plan.storage}GB`,
      });

      confetti({ particleCount: 180, spread: 80, origin: { y: 0.65 } });
      
      setDeploying(false);
      setSelectedPlan(null);

      if (!isAuthenticated) login(); // demo convenience

      setTimeout(() => navigate('/client'), 280);
    }, 1280);
  };

  return (
    <section id="pricing" className="py-20 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-y-2">
        <div>
          <div className="font-mono uppercase tracking-[2.5px] text-xs text-accent-blue mb-1">MINECRAFT HOSTING</div>
          <h2 className="section-header text-6xl tracking-[-2.4px] font-semibold">Choose your power.</h2>
        </div>
        
        {/* Elegant billing toggle */}
        <div className="flex items-center bg-white/5 rounded-full p-1 text-sm border border-white/10">
          <button 
            onClick={() => setIsYearly(false)} 
            className={`px-6 py-1.5 rounded-full transition-all ${!isYearly ? 'bg-white text-black font-semibold' : 'text-gray-text'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setIsYearly(true)} 
            className={`px-6 py-1.5 rounded-full transition-all relative ${isYearly ? 'bg-white text-black font-semibold' : 'text-gray-text'}`}
          >
            Yearly
            <span className="absolute -top-1.5 -right-1 text-[9px] bg-accent-yellow text-black px-1 rounded font-bold">SAVE 20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.015 }}
            whileHover={{ y: -5 }}
            onClick={() => handleQuickDeploy(plan)}
            className={`tilt-card premium-card cursor-pointer glass-dark rounded-3xl px-7 py-7 flex flex-col border ${plan.isPopular ? 'border-accent-yellow/40 relative shadow-[0_0_0_1px_rgba(250,204,21,0.1)]' : 'border-white/5 hover:border-white/15'}`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 right-6 bg-accent-yellow text-black text-xs tracking-widest font-bold px-4 py-px rounded-full">MOST POPULAR</div>
            )}

            <div>
              <div className="font-display text-[27px] tracking-[-1.2px] font-semibold">{plan.name}</div>
              <div className="text-gray-text text-sm mb-4">{plan.ram} • {plan.vcpu} vCPU</div>
            </div>

            <div className="flex items-baseline gap-1 mb-2 mt-auto">
              <span className="text-5xl font-semibold tabular-nums tracking-tighter">
                €{isYearly ? plan.yearly.toFixed(0) : plan.monthly}
              </span>
              <span className="text-xs text-gray-text">/{isYearly ? 'yr' : 'mo'}</span>
            </div>

            <div className="text-xs text-gray-text mb-6 h-5">{plan.desc}</div>

            <div className="pt-4 border-t border-white/10 text-sm text-accent-blue font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
              Deploy instantly <Rocket size={15} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deploying overlay / success hint */}
      <AnimatePresence>
        {deploying && selectedPlan && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur z-[210] flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-3 w-3 animate-ping rounded-full bg-white" />
              <div className="font-mono tracking-[3px] text-xs text-white/50">PROVISIONING • {selectedPlan.name.toUpperCase()}</div>
              <div className="text-4xl font-semibold mt-3">Spinning up your server...</div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <p className="text-center text-xs mt-8 text-gray-text tracking-widest">ALL PLANS INCLUDE UNLIMITED SLOTS • FULL MOD SUPPORT • 72H MONEY-BACK</p>
    </section>
  );
}

