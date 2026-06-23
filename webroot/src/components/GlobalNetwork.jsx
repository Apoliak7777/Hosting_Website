import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const locations = [
  { id: 'fra', name: 'Frankfurt', country: 'DE', x: '54%', y: '30%', ping: 12, servers: 1240, players: 82400, color: 'accent-blue' },
  { id: 'nyc', name: 'New York', country: 'US', x: '27%', y: '35%', ping: 38, servers: 980, players: 67100, color: 'accent-purple' },
  { id: 'lon', name: 'London', country: 'UK', x: '48%', y: '25%', ping: 18, servers: 760, players: 48900, color: 'accent-blue' },
  { id: 'sgp', name: 'Singapore', country: 'SG', x: '72%', y: '52%', ping: 64, servers: 540, players: 32100, color: 'accent-purple' },
  { id: 'tyo', name: 'Tokyo', country: 'JP', x: '82%', y: '38%', ping: 71, servers: 410, players: 28400, color: 'accent-blue' },
  { id: 'lax', name: 'Los Angeles', country: 'US', x: '18%', y: '42%', ping: 29, servers: 690, players: 41200, color: 'accent-purple' },
];

export default function GlobalNetwork() {
  const [selected, setSelected] = useState(null);

  const handleNodeClick = (loc) => {
    setSelected(loc.id === selected?.id ? null : loc);
  };

  return (
    <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/5">
      <div className="text-center mb-16">
        <div className="font-mono text-xs tracking-[3px] text-accent-blue mb-2">12 DATA CENTERS • ANYCAST ROUTING</div>
        <h2 className="section-header text-6xl tracking-[-2.2px] font-semibold mb-4">Global by design.<br />Local in feel.</h2>
        <p className="text-2xl text-gray-text max-w-2xl mx-auto">
          Sub-20ms for 94% of players worldwide. Automatic failover. Premium routing on every plan.
        </p>
      </div>

      <div className="relative mx-auto max-w-[1100px]">
        <img 
          src="/images/worldmap.png" 
          alt="World Map" 
          className="w-full opacity-40 object-contain max-h-[520px] pointer-events-none select-none"
        />

        {locations.map((loc, index) => {
          const isSelected = selected?.id === loc.id;
          return (
            <motion.div
              key={loc.id}
              className="absolute flex flex-col items-center cursor-pointer group"
              style={{ left: loc.x, top: loc.y, transform: 'translate(-50%, -50%)' }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, type: 'spring', bounce: 0.3 }}
              whileHover={{ scale: 1.15 }}
              onClick={() => handleNodeClick(loc)}
            >
              {/* Tooltip on hover / selected */}
              <AnimatePresence>
                {(isSelected || false) && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute -top-16 bg-black/90 border border-white/10 backdrop-blur-xl rounded-2xl px-5 py-3 text-sm shadow-2xl whitespace-nowrap z-20"
                  >
                    <div className="font-semibold text-white flex items-center gap-2">
                      {loc.name}, {loc.country}
                      <span className="text-[10px] px-2 py-px bg-white/10 rounded font-mono">{loc.ping}ms</span>
                    </div>
                    <div className="text-gray-text text-xs mt-0.5">{loc.servers} servers • {loc.players.toLocaleString()} players online</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Ping dot */}
              <div className={`w-5 h-5 rounded-full bg-${loc.color} shadow-[0_0_18px] relative flex items-center justify-center ring-1 ring-white/30`}>
                <div className={`w-full h-full rounded-full bg-${loc.color} animate-ping absolute`} style={{ animationDelay: `${index * 120}ms` }} />
                <div className={`w-2.5 h-2.5 rounded-full bg-white/90 relative z-10`} />
              </div>

              <div className={`mt-2 text-[10px] font-mono tracking-widest px-3 py-0.5 rounded-full border border-white/10 bg-black/60 text-white/70 group-hover:text-white group-hover:border-white/30 transition-all ${isSelected ? 'text-white border-white/40' : ''}`}>
                {loc.name.toUpperCase()}
              </div>
            </motion.div>
          );
        })}

        {/* Click hint / selected panel */}
        <div className="absolute bottom-0 right-0 text-xs text-gray-text/70 bg-black/40 px-3 py-1 rounded-tl-xl border-t border-l border-white/10">
          {selected ? `${selected.name} • ${selected.ping}ms avg` : 'Click any node for live stats'}
        </div>
      </div>

      <div className="text-center mt-8 text-xs text-gray-text/60 tracking-widest">
        99.99% UPTIME SLA • 480 GBPS+ DDoS PER LOCATION • AUTOMATIC FAILOVER IN &lt; 40MS
      </div>
    </section>
  );
}
