// components/dashboard/Dashboard.tsx
import React, { useState } from 'react';
import { User } from '../../types';
import StudentForm from '../forms/StudentForm';
import SubjectForm from '../forms/SubjectForm';
import GradeForm from '../forms/GradeForm';
import StudentList from '../lists/StudentList';
import SubjectList from '../lists/SubjectList';
import GradeList from '../lists/GradeList';
import Statistics from './Statistics';
import Bulletin from './Bulletin';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

type ViewType = 'students' | 'subjects' | 'grades' | 'statistics' | 'bulletin';

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState<ViewType>('students');

  const renderContent = () => {
    switch (currentView) {
      case 'students':
        return (
          <div>
            <StudentForm />
            <StudentList />
          </div>
        );
      case 'subjects':
        return (
          <div>
            <SubjectForm />
            <SubjectList />
          </div>
        );
      case 'grades':
        return (
          <div>
            <GradeForm />
            <GradeList />
          </div>
        );
      case 'statistics':
        return <Statistics />;
      case 'bulletin':
        return <Bulletin />;
      default:
        return <StudentList />;
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Gestion des Notes - Dashboard</h1>
        <div>
          <span>Bienvenue, {user.email}</span>
          <button onClick={onLogout}>Déconnexion</button>
        </div>
      </header>
      
      <nav className="dashboard-nav">
        <button onClick={() => setCurrentView('students')}>Étudiants</button>
        <button onClick={() => setCurrentView('subjects')}>Matières</button>
        <button onClick={() => setCurrentView('grades')}>Notes</button>
        <button onClick={() => setCurrentView('statistics')}>Statistiques</button>
        <button onClick={() => setCurrentView('bulletin')}>Bulletins</button>
      </nav>

      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;