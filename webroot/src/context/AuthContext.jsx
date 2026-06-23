import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Demo servers - persists in memory for the preview session
  const [servers, setServers] = useState([]);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    // Keep servers in demo so user can see them after "re-login"
  };

  // Ultra-premium deploy action
  const addServer = (serverData) => {
    const newServer = {
      id: Date.now(),
      name: serverData.name || `${serverData.game || 'Server'} #${Math.floor(Math.random() * 9000) + 1000}`,
      game: serverData.game || 'Custom',
      plan: serverData.plan || 'Standard',
      ram: serverData.ram || '4GB',
      storage: serverData.storage || '50GB',
      status: 'deploying',
      location: serverData.location || 'Frankfurt',
      createdAt: new Date(),
      cpu: Math.floor(Math.random() * 18) + 8,
      mem: Math.floor(Math.random() * 35) + 22,
    };
    
    setServers(prev => [newServer, ...prev]);

    // Simulate deployment completion with nice timing
    setTimeout(() => {
      setServers(prev =>
        prev.map(s =>
          s.id === newServer.id ? { ...s, status: 'online' } : s
        )
      );
    }, 1850);

    return newServer;
  };

  const removeServer = (id) => {
    setServers(prev => prev.filter(s => s.id !== id));
  };

  const restartServer = (id) => {
    setServers(prev =>
      prev.map(s =>
        s.id === id ? { ...s, status: 'restarting' } : s
      )
    );
    setTimeout(() => {
      setServers(prev =>
        prev.map(s =>
          s.id === id ? { ...s, status: 'online' } : s
        )
      );
    }, 1200);
  };

  const updateServer = (id, updates) => {
    setServers(prev =>
      prev.map(s => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        login, 
        logout, 
        servers, 
        addServer, 
        removeServer, 
        restartServer,
        updateServer 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
