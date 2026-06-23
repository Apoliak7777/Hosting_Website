import Hero from '../components/Hero';
import Pricing from '../components/Pricing';
import { Link } from 'react-router-dom';

export default function Minecraft() {
  return (
    <div className="pt-20">
      <Hero 
        title="Zero lag." 
        highlight="Minecraft at 120+ TPS" 
        subtitle="Full modpack support. Instant plugin installs. The most reliable Minecraft hosting on the market — built for serious communities."
        learnMoreLink="#pricing"
      />

      <Pricing />

      <div className="max-w-5xl mx-auto px-6 pb-20 text-center">
        <div className="text-accent-blue tracking-widest text-xs">WHY MINECRAFTERS CHOOSE US</div>
        <div className="text-4xl tracking-tight mt-3 mb-9 font-semibold">Everything just works.</div>
        
        <div className="grid md:grid-cols-3 gap-4 text-left">
          {['Paper, Purpur, Fabric, Forge, Quilt', 'One-click modpacks & plugins', 'Worlds, backups & rollback in UI', 'Crossplay Java + Bedrock out of the box'].map((f, i) => (
            <div key={i} className="glass-dark px-8 py-8 rounded-3xl border border-white/5 text-lg">{f}</div>
          ))}
        </div>

        <Link to="/client" className="mt-9 inline-block text-sm underline text-gray-text hover:text-white">Or jump straight to dashboard →</Link>
      </div>
    </div>
  );
}

