import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { X, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';

// Premium mouse-follow 3D tilt hook
function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-120, 120], [9, -9]);
  const rotateY = useTransform(x, [-120, 120], [-14, 14]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width - 0.5) * 240;
    const py = ((e.clientY - rect.top) / rect.height - 0.5) * 240;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
}

const games = [
  { 
    name: 'Minecraft', 
    src: '/images/games_banner/minecraft.png', 
    players: '142k', 
    category: 'Sandbox',
    tag: 'Java + Bedrock', 
    desc: 'The king of sandbox. Mods, plugins, massive worlds.',
    specs: 'AMD EPYC • NVMe RAID10 • 1.2Tbps DDoS • Instant modpack installs'
  },
  { 
    name: 'Rust', 
    src: '/images/games_banner/rust.png', 
    players: '89k', 
    category: 'Survival',
    tag: 'Survival', 
    desc: 'Brutal PvP. Wipe days. Unmatched performance under load.',
    specs: 'High tick rate • Custom map support • Oxide/uMod ready'
  },
  { 
    name: 'Counter-Strike 2', 
    src: '/images/games_banner/csgo.png', 
    players: '67k', 
    category: 'Shooter',
    tag: 'Competitive', 
    desc: '128-tick servers. Perfect netcode. Faceit & ESEA ready.',
    specs: '128 tick • GOTV • RCON + demo recording • Anti-cheat tuned'
  },
  { 
    name: 'ARK: Survival Ascended', 
    src: '/images/games_banner/ark.png', 
    players: '41k', 
    category: 'Survival',
    tag: 'Dinosaurs', 
    desc: 'Tame. Breed. Dominate. Massive clusters supported.',
    specs: 'Crossplay • Mods • Cluster support • Auto backups'
  },
  { 
    name: 'Valheim', 
    src: '/images/games_banner/valheim.png', 
    players: '29k', 
    category: 'Survival',
    tag: 'Vikings', 
    desc: 'Co-op boss rushing in beautiful procedurals.',
    specs: 'Dedicated seed control • World modifiers • Fast travel tweaks'
  },
  { 
    name: 'DayZ', 
    src: '/images/games_banner/dayz.png', 
    players: '18k', 
    category: 'Hardcore',
    tag: 'Hardcore', 
    desc: 'Post-apoc survival. Zero compromise performance.',
    specs: '1.26+ • Mods • Full persistence • Battle metrics ready'
  },
];

const categories = ['All', 'Sandbox', 'Survival', 'Shooter', 'Hardcore'];

export default function GamesCarousel() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [deploying, setDeploying] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();
  const { addServer, isAuthenticated, login } = useAuth();

  const filteredGames = activeCategory === 'All' 
    ? games 
    : games.filter(g => g.category === activeCategory);

  const [deployProgress, setDeployProgress] = useState(0);
  const [deployStep, setDeployStep] = useState('');

  const handleDeploy = (game) => {
    setDeploying(true);
    setDeployProgress(0);
    setDeployStep('Allocating resources');

    const steps = [
      { progress: 18, text: 'Allocating resources' },
      { progress: 39, text: 'Mounting NVMe storage' },
      { progress: 61, text: 'Applying 1.2 Tbps DDoS rules' },
      { progress: 82, text: 'Starting game services' },
      { progress: 100, text: 'Finalizing' },
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        
        const server = addServer({
          game: game.name,
          plan: 'Iron',
          ram: '6GB',
          location: 'Frankfurt'
        });

        confetti({ particleCount: 260, spread: 95, origin: { y: 0.6 } });
        confetti({ particleCount: 140, angle: 65, spread: 70, origin: { x: 0.1, y: 0.72 } });

        setTimeout(() => {
          setDeploying(false);
          setSelectedGame(null);
          setDeployProgress(0);
          setDeployStep('');

          if (!isAuthenticated) login();
          navigate('/client');
        }, 420);
        return;
      }

      setDeployProgress(steps[i].progress);
      setDeployStep(steps[i].text);
      i++;
    }, 520);
  };

  return (
    <section className="py-20 border-y border-white/10 bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="font-mono tracking-[2px] text-xs text-accent-blue mb-1">SUPPORTED GAMES</div>
            <h2 className="section-header text-6xl tracking-[-2.2px] font-semibold">Built for the games<br />you actually play.</h2>
          </div>
          <p className="text-gray-text max-w-sm text-lg">Click any title to deploy instantly with full mod support.</p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-1.5 rounded-full text-sm border transition ${activeCategory === cat ? 'bg-white text-black border-white' : 'border-white/15 hover:border-white/40 text-gray-text'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredGames.map((game, idx) => {
            const tilt = useTilt();
            return (
            <motion.button
              key={idx}
              style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onMouseMove={tilt.handleMouseMove}
              onMouseLeave={tilt.handleMouseLeave}
              onClick={() => setSelectedGame(game)}
              className="tilt-card glass-dark group rounded-3xl p-6 text-left border border-white/5 hover:border-white/10 flex flex-col cursor-pointer will-change-transform"
            >
              <div className="mb-6 flex-1">
                <img src={game.src} alt={game.name} className="w-14 h-14 object-contain mb-5 grayscale-[0.2] group-hover:grayscale-0 transition" />
                <div className="font-display text-2xl tracking-tight font-semibold mb-1">{game.name}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-accent-blue mb-2">{game.tag}</div>
                <div className="text-sm text-gray-text leading-tight line-clamp-2">{game.desc}</div>
              </div>
              <div className="flex justify-between text-xs text-gray-text/70">
                <span>{game.players} playing</span>
                <span className="font-medium text-accent-blue group-hover:underline">Deploy →</span>
              </div>
            </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedGame && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl" onClick={() => !deploying && setSelectedGame(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              onClick={e => e.stopPropagation()}
              className="glass-strong w-full max-w-xl rounded-3xl p-9 border border-white/10 relative"
            >
              <button onClick={() => setSelectedGame(null)} disabled={deploying} className="absolute top-6 right-6 text-gray-text hover:text-white">
                <X size={22} />
              </button>

              <div className="flex gap-6 mb-8">
                <img src={selectedGame.src} alt="" className="w-20 h-20 object-contain" />
                <div>
                  <div className="text-accent-blue text-xs tracking-widest font-mono">{selectedGame.tag}</div>
                  <div className="text-5xl tracking-[-1.6px] font-display font-semibold">{selectedGame.name}</div>
                  <div className="text-gray-text">{selectedGame.players} players online</div>
                </div>
              </div>

              <p className="text-xl text-white/90 mb-8">{selectedGame.desc}</p>

              <div className="mb-8 p-5 bg-black/40 rounded-2xl text-sm text-gray-text border border-white/5">{selectedGame.specs}</div>

              {deploying ? (
                <div className="deploy-progress p-8 rounded-2xl border border-white/10">
                  <div className="text-center mb-6">
                    <div className="text-2xl font-semibold tracking-tight">{deployStep}</div>
                    <div className="font-mono text-xs text-gray-text mt-1">STEP {Math.ceil(deployProgress / 20)} / 5</div>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                    <motion.div 
                      className="h-1.5 bg-gradient-to-r from-accent-blue via-white to-accent-purple" 
                      animate={{ width: `${deployProgress}%` }} 
                      transition={{ ease: [0.22,1,0.36,1] }}
                    />
                  </div>
                  <div className="text-right text-xs font-mono text-accent-blue">{deployProgress}%</div>
                </div>
              ) : (
                <>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleDeploy(selectedGame)} 
                      className="flex-1 py-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-2 text-lg active:scale-[0.985]"
                    >
                      Deploy {selectedGame.name} <Rocket size={18} />
                    </button>
                    <button onClick={() => setSelectedGame(null)} className="px-8 py-4 rounded-2xl border border-white/20">Cancel</button>
                  </div>
                  <div className="text-center text-[10px] text-gray-text/50 mt-5 tracking-[1.5px]">INSTANT SETUP • 72H MONEY BACK</div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
