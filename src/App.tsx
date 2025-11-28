// App.tsx
import React, { useState } from 'react';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './components/dashboard/Dashboard';
import { User } from './types';

type AuthView = 'login' | 'register';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<AuthView>('login');

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleRegister = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setAuthView('login');
  };

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="app">
      {authView === 'login' && (
        <LoginForm 
          onLogin={handleLogin} 
          onSwitchToRegister={() => setAuthView('register')} 
        />
      )}
      {authView === 'register' && (
        <RegisterForm 
          onRegister={handleRegister} 
          onSwitchToLogin={() => setAuthView('login')} 
        />
      )}
    </div>
  );
};

export default App;