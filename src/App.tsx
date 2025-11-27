// App.tsx
import React, { useState } from 'react';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './components/dashboard/Dashboard.tsx';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'login' | 'dashboard'>('login');

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  return (
    <div className="app">
      {currentView === 'login' && <LoginForm onLogin={handleLogin} />}
      {currentView === 'dashboard' && user && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;