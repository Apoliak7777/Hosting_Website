import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  // Ultra-premium scroll behavior: hide on down, show on up, stronger glass
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 20);
      
      // Hide navbar when scrolling down (after hero), show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 140) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navClasses = `
    fixed w-full z-[100] top-0 left-0 transition-all duration-300
    ${isScrolled ? 'glass-strong py-3 shadow-2xl' : 'py-5 bg-transparent'}
    ${isVisible ? 'translate-y-0' : '-translate-y-full'}
  `;

  const linkBase = "font-medium text-sm tracking-wide transition-all duration-200 relative group";
  const activeClass = "text-white";
  const inactiveClass = "text-gray-text hover:text-white";

  return (
    <motion.nav 
      className={navClasses}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo - Premium feel */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-accent-blue via-accent-purple to-accent-blue flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.35)] group-hover:scale-105 transition-transform">
            <span className="font-black text-xl tracking-tighter text-white">A</span>
          </div>
          <div>
            <span className="font-display font-semibold text-2xl tracking-[-1.5px] text-white">
              apoliak<span className="font-bold text-accent-blue">host</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-9 text-sm">
          <Link 
            to="/" 
            className={`${linkBase} ${isActive('/') ? activeClass : inactiveClass}`}
          >
            Home
            {isActive('/') && (
              <motion.span 
                layoutId="active-nav" 
                className="absolute -bottom-[3px] left-0 h-px w-full bg-gradient-to-r from-accent-blue to-accent-purple" 
              />
            )}
          </Link>
          <Link 
            to="/minecraft" 
            className={`${linkBase} ${isActive('/minecraft') ? activeClass : inactiveClass}`}
          >
            Minecraft
            {isActive('/minecraft') && (
              <motion.span layoutId="active-nav" className="absolute -bottom-[3px] left-0 h-px w-full bg-gradient-to-r from-accent-blue to-accent-purple" />
            )}
          </Link>
          <Link 
            to="/vps" 
            className={`${linkBase} ${isActive('/vps') ? activeClass : inactiveClass}`}
          >
            VPS
            {isActive('/vps') && (
              <motion.span layoutId="active-nav" className="absolute -bottom-[3px] left-0 h-px w-full bg-gradient-to-r from-accent-blue to-accent-purple" />
            )}
          </Link>

          {/* Auth / Client */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3 ml-3 pl-4 border-l border-white/10">
              <Link 
                to="/client" 
                className="px-5 py-2 text-sm rounded-full font-semibold border border-white/15 hover:bg-white/5 transition-all active:scale-[0.985]"
              >
                Dashboard
              </Link>
              <button 
                onClick={logout} 
                className="text-xs uppercase tracking-[1px] text-gray-text hover:text-white/70 transition-colors px-3 py-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-3 pl-4 border-l border-white/10">
              <Link 
                to="/login" 
                className="text-sm font-semibold text-gray-text hover:text-white px-4 py-2 transition-colors"
              >
                Log in
              </Link>
              <Link 
                to="/register" 
                className="px-6 py-2 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 active:bg-white transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              >
                Get started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger - Animated */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white p-2 -mr-2"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu - Springy and beautiful */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", bounce: 0.05, duration: 0.35 }}
            className="md:hidden glass-dark border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-y-5 text-lg">
              <Link to="/" className={isActive('/') ? "text-white font-semibold" : "text-gray-text"}>Home</Link>
              <Link to="/minecraft" className={isActive('/minecraft') ? "text-white font-semibold" : "text-gray-text"}>Minecraft Hosting</Link>
              <Link to="/vps" className={isActive('/vps') ? "text-white font-semibold" : "text-gray-text"}>VPS Hosting</Link>
              
              <div className="h-px bg-white/10 my-2" />

              {isAuthenticated ? (
                <>
                  <Link to="/client" className="text-accent-blue font-semibold">Client Dashboard</Link>
                  <button onClick={logout} className="text-left text-gray-text hover:text-white text-base">Log out</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-text">Log in</Link>
                  <Link to="/register" className="font-semibold text-accent-blue">Create account — free</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
