import { useState, useEffect } from 'react';
import { CreditCard, Settings, Package, User, Lock, Play, Trash2, RotateCw, X, Terminal, Activity, HardDrive } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export default function ClientArea() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectedServer, setSelectedServer] = useState(null);
  const [serverTab, setServerTab] = useState('overview');
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [activity, setActivity] = useState([
    { id: 1, time: 'just now', text: 'Welcome to your new control panel' }
  ]);
  const [editingName, setEditingName] = useState(null);
  const [tempName, setTempName] = useState('');
  const [scaleValue, setScaleValue] = useState(100);
  
  const { servers, removeServer, restartServer, addServer, updateServer } = useAuth();

  const onlineCount = servers.filter(s => s.status === 'online').length;
  // Stable demo players count based on servers (prevents flickering)
  const totalPlayers = servers.length > 0 
    ? servers.reduce((sum, s) => sum + (s.status === 'online' ? 65 : 0), 120) 
    : 0;

  const pushActivity = (text) => {
    setActivity(prev => [{ id: Date.now(), time: 'just now', text }, ...prev].slice(0, 9));
  };

  const handleDelete = (server) => {
    removeServer(server.id);
    pushActivity(`Deleted ${server.name}`);
    setConfirmDelete(null);
    if (selectedServer?.id === server.id) setSelectedServer(null);
  };

  const handleRestart = (server) => {
    restartServer(server.id);
    pushActivity(`Restarted ${server.name}`);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.82 } });
  };

  const startRename = (server) => {
    setEditingName(server.id);
    setTempName(server.name);
  };

  const saveRename = (server) => {
    const newName = tempName.trim() || server.name;
    updateServer(server.id, { name: newName });
    pushActivity(`Renamed server to "${newName}"`);
    setEditingName(null);
  };

  const handleScale = (server) => {
    updateServer(server.id, { 
      // Simulate resource scale by adjusting displayed cpu/mem a bit
      cpu: Math.min(95, Math.floor(server.cpu * (scaleValue / 100))),
      mem: Math.min(95, Math.floor(server.mem * (scaleValue / 100)))
    });
    pushActivity(`Scaled ${server.name} resources to ${scaleValue}%`);
    confetti({ particleCount: 55, spread: 50 });
  };

  const openServer = (server) => {
    setSelectedServer(server);
    setServerTab('overview');
    setScaleValue(100);
    setConsoleLogs([]);
  };

  // Live streaming console logs when the console tab is open
  useEffect(() => {
    if (!selectedServer || serverTab !== 'console') {
      return;
    }

    const baseLogs = [
      `[INFO] Server ${selectedServer.name} online`,
      '[INFO] Listening on 0.0.0.0:25565',
      '[INFO] Mods loaded: 14/14',
    ];

    setConsoleLogs(baseLogs.map((text, i) => ({ id: i, time: 'just now', text })));

    const extra = [
      '> Player connected: Notch',
      '> [Chat] Notch: gg wp',
      '> Player left: Notch',
    ];

    let idx = 0;
    const timer = setInterval(() => {
      if (idx >= extra.length) return;
      setConsoleLogs(prev => [
        ...prev,
        { id: Date.now() + idx, time: 'just now', text: extra[idx] }
      ]);
      idx++;
    }, 1400);

    return () => clearInterval(timer);
  }, [selectedServer, serverTab]);

  const renderDashboard = () => (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="uppercase tracking-[3px] text-xs text-accent-blue mb-1">CONTROL PANEL</div>
          <h1 className="text-6xl font-display tracking-[-2.6px] font-semibold">Welcome back.</h1>
          <div className="text-gray-text mt-1">Everything is running smoothly.</div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-right text-sm">
          <div>
            <div className="text-gray-text/70 text-xs">ONLINE PLAYERS</div>
            <div className="text-3xl font-semibold tabular-nums tracking-tighter text-white">{totalPlayers.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-text/70 text-xs">SERVERS ONLINE</div>
            <div className="text-3xl font-semibold tabular-nums tracking-tighter text-emerald-400">{onlineCount}</div>
          </div>
        </div>
      </div>

      <div className="mb-9 flex flex-wrap gap-3">
        <Link to="/minecraft" className="px-7 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-2 text-sm font-medium active:scale-[0.985]">
          <Play size={16} /> New Minecraft Server
        </Link>
        <Link to="/vps" className="px-7 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-2 text-sm font-medium active:scale-[0.985]">
          <Play size={16} /> New VPS
        </Link>
      </div>

      <div>
        <div className="flex justify-between items-baseline mb-4 px-1">
          <div className="text-xl font-semibold tracking-tight">Your Servers</div>
          <div className="text-xs text-gray-text/70 font-mono">{servers.length} TOTAL</div>
        </div>

        {servers.length === 0 ? (
          <div className="glass-dark border border-white/5 rounded-3xl p-16 text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-accent-blue/10 flex items-center justify-center mb-6">
              <Package size={42} className="text-accent-blue" />
            </div>
            <div className="text-2xl font-semibold mb-2 tracking-tight">No servers yet</div>
            <p className="text-gray-text max-w-sm mx-auto mb-8">Deploy a server from the homepage or games section. It will appear here instantly with live metrics.</p>
            <Link to="/minecraft" className="inline-block bg-white text-black px-8 py-3 rounded-2xl font-semibold active:scale-[0.985]">Deploy your first server</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnimatePresence>
              {servers.map((server) => {
                const isOnline = server.status === 'online';
                return (
                  <motion.div
                    key={server.id}
                    layout
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    whileHover={{ y: -2 }}
                    onClick={() => openServer(server)}
                    className="tilt-card glass-dark rounded-3xl p-7 border border-white/5 hover:border-white/15 cursor-pointer active:scale-[0.995] transition-all group"
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-400 status-online' : 'bg-yellow-400'}`} />
                          <div className="font-semibold text-2xl tracking-[-0.6px] truncate group-hover:text-accent-blue transition-colors">{server.name}</div>
                        </div>
                        <div className="text-xs text-gray-text mt-0.5 ml-6 font-mono tracking-widest">{server.game} • {server.plan}</div>
                      </div>
                      <div className={`text-[10px] self-start px-3.5 py-px font-mono tracking-widest rounded-full ${isOnline ? 'bg-emerald-400/10 text-emerald-400' : 'bg-yellow-400/10 text-yellow-400'}`}>
                        {server.status.toUpperCase()}
                      </div>
                    </div>

                    <div className="my-6 ml-6 flex gap-8 text-sm">
                      <div><span className="text-gray-text text-xs block">RAM</span><span className="font-medium">{server.ram}</span></div>
                      <div><span className="text-gray-text text-xs block">STORAGE</span><span className="font-medium">{server.storage}</span></div>
                      <div><span className="text-gray-text text-xs block">LOCATION</span><span className="font-medium">{server.location}</span></div>
                    </div>

                    <div className="ml-6 space-y-3.5">
                      <div>
                        <div className="flex justify-between text-xs mb-1.5 text-gray-text"><span>CPU</span><span className="font-mono text-white/80">{server.cpu}%</span></div>
                        <div className="h-1 bg-white/10 rounded overflow-hidden"><div className="h-1 bg-accent-blue rounded transition-all duration-700" style={{width: `${server.cpu}%`}} /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1.5 text-gray-text"><span>MEMORY</span><span className="font-mono text-white/80">{server.mem}%</span></div>
                        <div className="h-1 bg-white/10 rounded overflow-hidden"><div className="h-1 bg-accent-purple rounded transition-all duration-700" style={{width: `${server.mem}%`}} /></div>
                      </div>
                    </div>

                    <div className="mt-7 ml-6 flex gap-2 text-xs" onClick={e => e.stopPropagation()}>
                      <button onClick={() => handleRestart(server)} disabled={!isOnline} className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 flex items-center gap-1.5 disabled:opacity-40"><RotateCw size={14} /> Restart</button>
                      <button onClick={() => setConfirmDelete(server)} className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-red-400/90 flex items-center gap-1.5">Delete</button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="mt-10">
        <div className="text-sm flex items-center gap-2 mb-3 px-1 text-gray-text"><Activity size={15} /> Activity</div>
        <div className="glass-dark rounded-2xl border border-white/5 text-sm divide-y divide-white/5">
          {activity.map(a => (
            <div key={a.id} className="px-5 py-[13px] flex justify-between text-gray-text/90">
              <span>{a.text}</span>
              <span className="text-[10px] text-gray-text/60 font-mono tracking-widest">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="max-w-3xl">
      <h1 className="text-5xl font-display tracking-tighter mb-3">Billing</h1>
      <p className="text-gray-text mb-8">Preview mode — all charges paused. In production this would show invoices and usage.</p>
      <div className="glass-dark rounded-3xl p-8 border border-white/5">No invoices. Your servers are running on the house during this demo.</div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-xl">
      <h1 className="text-5xl tracking-tighter font-display mb-8">Account</h1>
      <div className="glass-dark p-8 rounded-3xl space-y-6">
        <div>
          <div className="text-xs text-gray-text mb-1.5">NAME</div>
          <input defaultValue="Demo User" className="bg-black/40 w-full rounded-2xl border border-white/10 px-5 py-3.5 text-lg" />
        </div>
        <div>
          <div className="text-xs text-gray-text mb-1.5">EMAIL</div>
          <input defaultValue="demo@apoliak.host" className="bg-black/40 w-full rounded-2xl border border-white/10 px-5 py-3.5 text-lg" />
        </div>
        <button className="w-full py-3.5 rounded-2xl bg-white/10 font-medium active:bg-white/15">Save changes</button>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Package },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="pt-20 pb-16 px-5 md:px-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 text-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-sm font-bold">A</div>
          <div className="font-semibold tracking-tight">ApoliakHost</div>
        </div>
        <div className="text-gray-text/70 font-mono text-xs hidden md:block">PREVIEW • ALL ACTIONS SIMULATED • DATA IS IN-MEMORY</div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-60 flex-shrink-0">
          <div className="glass-dark sticky top-20 rounded-3xl border border-white/5 p-2">
            <div className="px-4 pt-4 pb-3 border-b border-white/10 mb-1">
              <div className="text-[10px] text-gray-text">LOGGED IN AS</div>
              <div className="font-medium">demo@apoliak.host</div>
            </div>
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-2xl mb-0.5 transition-all ${activeTab === tab.id ? 'bg-white/5 text-white font-medium' : 'text-gray-text hover:bg-white/5 hover:text-white'}`}>
                  <Icon size={17} /> {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'billing' && renderBilling()}
              {activeTab === 'settings' && renderSettings()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedServer && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[300] flex items-start justify-center pt-12 pb-12 px-4" onClick={() => setSelectedServer(null)}>
            <motion.div 
              initial={{ scale: 0.96, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="glass-strong w-full max-w-[860px] rounded-3xl border border-white/10 overflow-hidden"
            >
              <div className="px-8 py-5 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${selectedServer.status === 'online' ? 'bg-emerald-400 status-online' : 'bg-yellow-400'}`} />
                  <div>
                    <div className="font-semibold text-3xl tracking-[-0.6px]">{selectedServer.name}</div>
                    <div className="text-xs font-mono text-gray-text tracking-widest">{selectedServer.game} • {selectedServer.location} • {selectedServer.plan}</div>
                  </div>
                </div>
                <button onClick={() => setSelectedServer(null)} className="text-gray-text hover:text-white p-1"><X size={22} /></button>
              </div>

              <div className="flex text-sm border-b border-white/10 px-8 bg-black/20">
                {['overview', 'console', 'resources'].map(t => (
                  <button key={t} onClick={() => setServerTab(t)} className={`py-4 px-7 capitalize tracking-wide transition ${serverTab === t ? 'text-white border-b-2 border-accent-blue' : 'border-transparent text-gray-text hover:text-white/80'}`}>
                    {t}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {serverTab === 'overview' && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-9">
                      <div className="glass p-5 rounded-2xl"><div className="text-xs text-gray-text mb-1">PLAN</div><div className="text-2xl font-semibold">{selectedServer.plan}</div></div>
                      <div className="glass p-5 rounded-2xl"><div className="text-xs text-gray-text mb-1">RAM</div><div className="text-2xl font-semibold">{selectedServer.ram}</div></div>
                      <div className="glass p-5 rounded-2xl"><div className="text-xs text-gray-text mb-1">STORAGE</div><div className="text-2xl font-semibold">{selectedServer.storage}</div></div>
                    </div>

                    <div className="mb-8">
                      <div className="text-xs text-gray-text mb-2">SERVER NAME</div>
                      {editingName === selectedServer.id ? (
                        <div className="flex gap-3">
                          <input value={tempName} onChange={e=>setTempName(e.target.value)} className="flex-1 bg-black/40 border border-white/20 rounded-2xl px-6 py-3 text-xl" autoFocus />
                          <button onClick={() => saveRename(selectedServer)} className="px-9 rounded-2xl bg-accent-blue text-black font-semibold">Save</button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <div className="text-3xl font-semibold tracking-tight">{selectedServer.name}</div>
                          <button onClick={() => startRename(selectedServer)} className="text-xs px-4 py-2 border border-white/20 rounded-xl hover:bg-white/5">RENAME</button>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => handleRestart(selectedServer)} className="flex-1 py-3.5 rounded-2xl bg-white/5 border border-white/10 flex justify-center items-center gap-2 font-medium"><RotateCw size={17} /> Restart</button>
                      <button onClick={() => setConfirmDelete(selectedServer)} className="flex-1 py-3.5 rounded-2xl border border-red-500/40 text-red-400 flex justify-center items-center gap-2 font-medium">Delete Server</button>
                    </div>
                  </div>
                )}

                {serverTab === 'console' && (
                  <div>
                    <div className="font-mono text-sm bg-[#0a0b10] border border-white/10 rounded-2xl p-6 h-80 overflow-auto leading-[1.55] mb-4">
                      {consoleLogs.length > 0 ? (
                        consoleLogs.map((log, i) => (
                          <div key={i} className="text-emerald-400/90">{log.text}</div>
                        ))
                      ) : (
                        <div className="text-emerald-400">[INFO] Connecting to console...</div>
                      )}
                      <div className="text-white/60 mt-2">&gt; _</div>
                    </div>
                    <div className="text-xs text-gray-text">Live console simulation. In a real panel you would type commands here.</div>
                  </div>
                )}

                {serverTab === 'resources' && (
                  <div>
                    <div className="mb-8">
                      <div className="flex justify-between mb-2 text-sm"><span>CPU</span><span className="font-mono">{selectedServer.cpu}%</span></div>
                      <div className="h-2.5 bg-white/10 rounded"><div className="h-2.5 bg-accent-blue rounded transition-all" style={{width: `${selectedServer.cpu}%`}} /></div>
                    </div>
                    <div className="mb-8">
                      <div className="flex justify-between mb-2 text-sm"><span>MEMORY</span><span className="font-mono">{selectedServer.mem}%</span></div>
                      <div className="h-2.5 bg-white/10 rounded"><div className="h-2.5 bg-accent-purple rounded transition-all" style={{width: `${selectedServer.mem}%`}} /></div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="text-sm mb-3">Scale resources (live preview)</div>
                      <input type="range" min="40" max="220" value={scaleValue} onChange={e => setScaleValue(+e.target.value)} className="w-full accent-accent-blue" />
                      <div className="flex justify-between text-xs text-gray-text mt-1">
                        <div>40%</div><div className="font-mono text-accent-blue">{scaleValue}%</div><div>220%</div>
                      </div>
                      <button onClick={() => handleScale(selectedServer)} className="mt-4 w-full py-3 rounded-2xl border border-white/20 active:bg-white/5">Apply new resource allocation</button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDelete && (
          <div className="fixed inset-0 bg-black/90 z-[400] flex items-center justify-center p-6" onClick={() => setConfirmDelete(null)}>
            <div onClick={e=>e.stopPropagation()} className="glass-strong rounded-3xl p-9 max-w-sm text-center">
              <div className="text-3xl tracking-tight mb-2">Delete <span className="font-semibold">{confirmDelete.name}</span>?</div>
              <p className="text-sm text-gray-text mb-8">This cannot be undone. All data will be permanently removed.</p>
              <div className="flex gap-4">
                <button onClick={() => setConfirmDelete(null)} className="flex-1 py-3 rounded-2xl border border-white/20">Keep it</button>
                <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-3 rounded-2xl bg-red-500/90 text-white font-medium">Delete forever</button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
