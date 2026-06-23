import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    if (!email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email';
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate network request for premium feel (no obvious demo)
    await new Promise((resolve) => setTimeout(resolve, 650));

    login();
    // Small delay so the button loading state is visible, then navigate
    navigate('/client');
  };

  const clearError = () => {
    if (error) setError('');
  };

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 min-h-[100dvh] flex items-center justify-center relative bg-[#050507] overflow-hidden">
      {/* Background accents consistent with the rest of the site */}
      <div className="absolute inset-0 bg-[radial-gradient(#1a1f2e_0.7px,transparent_1px)] bg-[length:4px_4px] opacity-50" />
      <div className="absolute -top-24 -left-12 w-[520px] h-[520px] rounded-full bg-accent-purple/10 blur-[140px]" />
      <div className="absolute -bottom-20 -right-16 w-[460px] h-[460px] rounded-full bg-accent-blue/8 blur-[120px]" />

      <div className="relative w-full max-w-[420px] z-10">
        <div className="text-center mb-8">
          <div className="inline-block mb-3 px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] tracking-[2.5px] font-mono text-accent-blue">
            SECURE ACCESS
          </div>
          <h1 className="text-[52px] sm:text-6xl tracking-[-2.8px] font-display font-semibold leading-none mb-2">
            Welcome back.
          </h1>
          <p className="text-gray-text text-lg">Sign in to manage your servers.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-7 sm:p-9 border border-white/10 shadow-2xl"
        >
          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label className="block text-[10px] tracking-[2px] uppercase text-gray-text mb-1.5 pl-0.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text/70" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError();
                  }}
                  placeholder="you@apoliak.host"
                  className="w-full bg-black/40 border border-white/10 focus:border-accent-blue rounded-2xl pl-11 pr-4 py-3.5 text-[17px] placeholder:text-gray-text/40 transition-colors"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5 px-0.5">
                <label className="text-[10px] tracking-[2px] uppercase text-gray-text">Password</label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link would be sent (demo disabled per your request).')}
                  className="text-xs text-accent-blue hover:text-white transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text/70" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearError();
                  }}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 focus:border-accent-blue rounded-2xl pl-11 pr-12 py-3.5 text-[17px] placeholder:text-gray-text/40 transition-colors"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-text/70 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-accent-red bg-accent-red/10 border border-accent-red/30 rounded-2xl px-4 py-2.5"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-black font-semibold text-[17px] active:scale-[0.985] transition-all disabled:opacity-70 disabled:active:scale-100"
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in <ArrowRight size={19} />
                </>
              )}
            </button>
          </form>

          {/* Social options for premium feel (non-functional as per no-demo request) */}
          <div className="mt-6">
            <div className="relative text-center text-[10px] tracking-widest text-gray-text/60 mb-3">
              <span className="bg-[#0c0e14] px-3 relative z-10">OR</span>
              <div className="absolute left-0 top-1/2 h-px w-full bg-white/10 -z-0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => alert('Discord sign-in would be connected in production.')}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/15 hover:bg-white/5 text-sm font-medium active:scale-[0.985] transition-all"
              >
                <span>Discord</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Google sign-in would be connected in production.')}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/15 hover:bg-white/5 text-sm font-medium active:scale-[0.985] transition-all"
              >
                <span>Google</span>
              </button>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-sm mt-6 text-gray-text">
          New here?{' '}
          <Link to="/register" className="text-white font-medium underline underline-offset-4 hover:text-accent-blue transition-colors">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
