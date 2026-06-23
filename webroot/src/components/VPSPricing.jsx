import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Check, Terminal, Cpu, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';

const vpsPlans = [
  { id: 'starter', name: 'Starter', ram: '4GB', monthly: 15, yearly: 144, vcpu: 2, storage: 50, desc: 'Small projects & testing' },
  { id: 'advanced', name: 'Advanced', ram: '8GB', monthly: 25, yearly: 240, vcpu: 4, storage: 100, isPopular: true, desc: 'Production workloads' },
  { id: 'enterprise', name: 'Enterprise', ram: '16GB', monthly: 45, yearly: 432, vcpu: 8, storage: 200, desc: 'High-traffic & clusters' },
];

export default function VPSPricing() {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();
  const { addServer, isAuthenticated, login } = useAuth();

  const deployVPS = (plan) => {
    const server = addServer({
      game: 'VPS',
      plan: plan.name,
      ram: plan.ram,
      storage: `${plan.storage}GB`,
    });

    confetti({ particleCount: 160, spread: 70, origin: { y: .7 } });

    if (!isAuthenticated) login();

    setTimeout(() => navigate('/client'), 300);
  };

  return (
    <section id="pricing" className="py-20 px-6 md:px-12 max-w-6xl mx-auto relative">
      <div className="text-center mb-12">
        <div className="text-accent-blue text-xs tracking-[3px] font-mono">KVM • FULL ROOT • NVMe</div>
        <h2 className="section-header text-6xl tracking-tighter mt-1">Unleash raw power.</h2>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-full bg-white/5 p-1 text-sm border border-white/10">
          <button onClick={() => setIsYearly(false)} className={`px-6 py-1 rounded-full ${!isYearly ? 'bg-white text-black' : ''}`}>Monthly</button>
          <button onClick={() => setIsYearly(true)} className={`px-6 py-1 rounded-full relative ${isYearly ? 'bg-white text-black' : ''}`}>Yearly <span className="text-[9px] ml-0.5 text-amber-400">—20%</span></button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {vpsPlans.map((plan, i) => (
          <div 
            key={i} 
            onClick={() => deployVPS(plan)}
            className={`glass-dark rounded-3xl p-9 border cursor-pointer transition-all hover:border-white/20 active:scale-[0.985] ${plan.isPopular ? 'border-accent-blue/30 scale-[1.01]' : 'border-white/5'}`}
          >
            {plan.isPopular && <div className="uppercase text-[10px] tracking-widest text-accent-blue mb-1">RECOMMENDED</div>}
            
            <div className="font-display text-4xl tracking-tight mb-1">{plan.name}</div>
            <div className="text-gray-text mb-7">{plan.desc}</div>

            <div className="mb-7">
              <span className="text-6xl tabular-nums font-semibold tracking-[-2.5px]">€{isYearly ? plan.yearly : plan.monthly}</span>
              <span className="text-gray-text text-sm">/{isYearly ? 'year' : 'mo'}</span>
            </div>

            <ul className="space-y-3 text-sm mb-9 text-gray-text">
              <li className="flex gap-2"><Cpu size={17} className="mt-0.5 text-accent-blue flex-shrink-0" /> {plan.vcpu} dedicated vCPU</li>
              <li className="flex gap-2"><Terminal size={17} className="mt-0.5 text-accent-blue flex-shrink-0" /> {plan.ram} dedicated RAM</li>
              <li className="flex gap-2"><Check size={17} className="mt-0.5 text-accent-blue flex-shrink-0" /> {plan.storage} GB NVMe</li>
              <li className="flex gap-2"><Check size={17} className="mt-0.5 text-accent-blue flex-shrink-0" /> Full root + IPv6</li>
            </ul>

            <div className="flex items-center text-accent-blue font-medium text-sm">
              Deploy this VPS now <Rocket size={15} className="ml-2" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
