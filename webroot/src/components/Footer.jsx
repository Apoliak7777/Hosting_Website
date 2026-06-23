import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 pt-16 pb-8 bg-black/50 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-blue to-accent-purple flex items-center justify-center">
              <span className="font-bold text-white">A</span>
            </div>
            <span className="font-display font-bold text-xl text-white">
              Apoliak<span className="text-accent-blue">Host</span>
            </span>
          </div>
          <p className="text-gray-text text-sm leading-relaxed">
            Premium game hosting built for communities that demand the highest performance and reliability.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/minecraft" className="text-gray-text hover:text-white transition-colors">Minecraft Hosting</Link></li>
              <li><Link to="/vps" className="text-gray-text hover:text-white transition-colors">VPS Hosting</Link></li>
              <li><span className="text-gray-text hover:text-white transition-colors cursor-pointer">Dedicated Servers</span></li>
              <li><span className="text-gray-text hover:text-white transition-colors cursor-pointer">Web Hosting</span></li>
            </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><span className="text-gray-text hover:text-white transition-colors cursor-pointer">About Us</span></li>
              <li><span className="text-gray-text hover:text-white transition-colors cursor-pointer">Contact</span></li>
              <li><span className="text-gray-text hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="text-gray-text hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
            </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Support</h4>
          <ul className="space-y-3">
            <li><span className="text-gray-text hover:text-white transition-colors cursor-pointer">Knowledge Base</span></li>
            <li><span className="text-gray-text hover:text-white transition-colors cursor-pointer">Submit Ticket</span></li>
            <li><span className="text-gray-text hover:text-white transition-colors cursor-pointer">Discord Community</span></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-text">
        &copy; {new Date().getFullYear()} ApoliakHost. All rights reserved. Designed with React.
      </div>
    </footer>
  );
}

