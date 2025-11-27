// components/dashboard/Statistics.tsx
import React from 'react';

const Statistics: React.FC = () => {
  // Données simulées pour les statistiques
  const stats = {
    totalStudents: 150,
    totalSubjects: 12,
    averageGrade: 12.5,
    gradeDistribution: [
      { range: '0-5', count: 5 },
      { range: '6-10', count: 25 },
      { range: '11-15', count: 80 },
      { range: '16-20', count: 40 }
    ]
  };

  return (
    <div className="statistics">
      <h2>Statistiques</h2>
      
      <div className="stats-cards">
        <div className="stat-card">
          <h3>Étudiants</h3>
          <p className="stat-number">{stats.totalStudents}</p>
        </div>
        
        <div className="stat-card">
          <h3>Matières</h3>
          <p className="stat-number">{stats.totalSubjects}</p>
        </div>
        
        <div className="stat-card">
          <h3>Moyenne générale</h3>
          <p className="stat-number">{stats.averageGrade}/20</p>
        </div>
      </div>

      <div className="chart">
        <h3>Distribution des notes</h3>
        <div className="bar-chart">
          {stats.gradeDistribution.map(item => (
            <div key={item.range} className="bar-container">
              <div 
                className="bar" 
                style={{ 
                  height: `${(item.count / stats.totalStudents) * 100}%` 
                }}
              ></div>
              <span className="bar-label">{item.range}</span>
              <span className="bar-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;