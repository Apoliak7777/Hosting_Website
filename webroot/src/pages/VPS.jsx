import Hero from '../components/Hero';
import VPSPricing from '../components/VPSPricing';
import GlobalNetwork from '../components/GlobalNetwork';
import { Link } from 'react-router-dom';

export default function VPS() {
  return (
    <div className="pt-20">
      <Hero 
        title="True dedicated" 
        highlight="VPS & Infrastructure" 
        subtitle="Full KVM virtualization. Dedicated cores & RAM. NVMe storage. The perfect foundation for anything you want to run."
        learnMoreLink="#pricing"
      />

      <VPSPricing />

      <div className="max-w-5xl mx-auto px-6 pb-20">
        <GlobalNetwork />
      </div>

      <div className="border-t border-white/10 py-16 text-center">
        <Link to="/client" className="text-accent-blue hover:underline font-medium">Manage everything from the client dashboard →</Link>
      </div>
    </div>
  );
}
