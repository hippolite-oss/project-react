// components/dashboard/Dashboard.tsx
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  BarChart3, 
  FileText, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import type { User } from '../../types';
import StudentForm from '../forms/StudentForm';
import SubjectForm from '../forms/SubjectForm';
import GradeForm from '../forms/GradeForm';
import StudentList from '../lists/StudentList';
import SubjectList from '../lists/SubjectList';
import GradeList from '../lists/GradeList';
import Statistics from './Statistics';
import Bulletin from './Bulletin';
import './Dashboard.css';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

type ViewType = 'students' | 'subjects' | 'grades' | 'statistics' | 'bulletin';

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState<ViewType>('students');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, view: 'statistics' },
    { id: 'students', label: 'Étudiants', icon: Users, view: 'students' },
    { id: 'subjects', label: 'Matières', icon: BookOpen, view: 'subjects' },
    { id: 'grades', label: 'Notes', icon: BarChart3, view: 'grades' },
    { id: 'bulletin', label: 'Bulletins', icon: FileText, view: 'bulletin' },
  ];

  const handleMenuItemClick = (view: ViewType) => {
    setCurrentView(view);
    if (window.innerWidth < 768) {
      setMobileMenuOpen(false);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'students':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">Gestion des Étudiants</h2>
              <p className="section-subtitle">Ajoutez et gérez les étudiants du système</p>
            </div>
            <div className="content-grid">
              <div className="card form-card">
                <StudentForm />
              </div>
              <div className="card">
                <StudentList />
              </div>
            </div>
          </div>
        );
      case 'subjects':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">Gestion des Matières</h2>
              <p className="section-subtitle">Configurez les matières et leurs coefficients</p>
            </div>
            <div className="content-grid">
              <div className="card form-card">
                <SubjectForm />
              </div>
              <div className="card">
                <SubjectList />
              </div>
            </div>
          </div>
        );
      case 'grades':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">Gestion des Notes</h2>
              <p className="section-subtitle">Saisissez et gérez les notes des étudiants</p>
            </div>
            <div className="content-grid">
              <div className="card form-card">
                <GradeForm />
              </div>
              <div className="card">
                <GradeList />
              </div>
            </div>
          </div>
        );
      case 'statistics':
        return <Statistics />;
      case 'bulletin':
        return <Bulletin />;
      default:
        return <Statistics />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <LayoutDashboard size={32} />
            {sidebarOpen && <span className="logo-text">GradeMaster</span>}
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '‹' : '›'}
          </button>
        </div>

        <div className="user-info">
          <div className="user-avatar">
            {user.email.charAt(0).toUpperCase()}
          </div>
          {sidebarOpen && (
            <div className="user-details">
              <span className="user-email">{user.email}</span>
              <span className="user-role">Administrateur</span>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    className={`nav-item ${currentView === item.view ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick(item.view as ViewType)}
                  >
                    <Icon size={20} />
                    {sidebarOpen && <span>{item.label}</span>}
                    {sidebarOpen && currentView === item.view && (
                      <div className="active-indicator" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button 
            className="logout-btn"
            onClick={onLogout}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h1 className="page-title">
              {currentView === 'students' && 'Étudiants'}
              {currentView === 'subjects' && 'Matières'}
              {currentView === 'grades' && 'Notes'}
              {currentView === 'statistics' && 'Statistiques'}
              {currentView === 'bulletin' && 'Bulletins'}
            </h1>
          </div>
          <div className="topbar-right">
            <div className="current-date">
              {new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;