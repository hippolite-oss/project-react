// components/dashboard/Bulletin.tsx
import React, { useState } from 'react';
import type { Student, Grade, Subject } from '../../types';

const Bulletin: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [bulletin, setBulletin] = useState<{
    student: Student | null;
    grades: (Grade & { subject: Subject })[];
    moyenne: number;
  } | null>(null);

  const generateBulletin = () => {
    // Simulation de données
    const mockStudent: Student = {
      matricule: selectedStudent,
      nom: 'Dupont',
      prenom: 'Jean',
      dateNaiss: new Date('2000-01-01')
    };

    const mockGrades = [
      {
        id: '1',
        etudiantMatricule: selectedStudent,
        matiereId: 'MATH',
        note: 15,
        date: new Date(),
        subject: { id: 'MATH', libelle: 'Mathématiques' }
      },
      {
        id: '2',
        etudiantMatricule: selectedStudent,
        matiereId: 'PHY',
        note: 12,
        date: new Date(),
        subject: { id: 'PHY', libelle: 'Physique' }
      }
    ];

    const moyenne = mockGrades.reduce((acc, grade) => acc + grade.note, 0) / mockGrades.length;

    setBulletin({
      student: mockStudent,
      grades: mockGrades,
      moyenne
    });
  };

  return (
    <div className="bulletin">
      <h2>Génération du bulletin</h2>
      
      <div className="bulletin-controls">
        <select 
          value={selectedStudent} 
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">Sélectionner un étudiant</option>
          <option value="ETU001">Jean Dupont</option>
          <option value="ETU002">Marie Martin</option>
        </select>
        
        <button onClick={generateBulletin} disabled={!selectedStudent}>
          Générer le bulletin
        </button>
      </div>

      {bulletin && (
        <div className="bulletin-content">
          <h3>Bulletin de notes</h3>
          <div className="student-info">
            <p><strong>Étudiant:</strong> {bulletin.student?.prenom} {bulletin.student?.nom}</p>
            <p><strong>Matricule:</strong> {bulletin.student?.matricule}</p>
          </div>
          
          <table className="grades-table">
            <thead>
              <tr>
                <th>Matière</th>
                <th>Note</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bulletin.grades.map(grade => (
                <tr key={grade.id}>
                  <td>{grade.subject.libelle}</td>
                  <td>{grade.note}/20</td>
                  <td>{grade.date.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="summary">
            <p><strong>Moyenne générale: {bulletin.moyenne.toFixed(2)}/20</strong></p>
            <p>
              <strong>Mention: </strong>
              {bulletin.moyenne >= 16 ? 'Très Bien' :
               bulletin.moyenne >= 14 ? 'Bien' :
               bulletin.moyenne >= 12 ? 'Assez Bien' :
               bulletin.moyenne >= 10 ? 'Passable' : 'Insuffisant'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bulletin;