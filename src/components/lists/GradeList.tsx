// components/lists/GradeList.tsx
import React, { useState, useEffect } from 'react';
import type { Grade, Student, Subject } from '../../types';
import { api } from '../../services/api';

const GradeList: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGrades(api.getGrades());
    setStudents(api.getStudents());
    setSubjects(api.getSubjects());
  }, []);

  const getStudentName = (matricule: string): string => {
    const student = students.find(s => s.matricule === matricule);
    return student ? `${student.prenom} ${student.nom}` : 'Inconnu';
  };

  const getSubjectName = (id: string): string => {
    const subject = subjects.find(s => s.id === id);
    return subject ? subject.libelle : 'Inconnue';
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      const updatedGrades = grades.filter(g => g.id !== id);
      setGrades(updatedGrades);
      localStorage.setItem('grades', JSON.stringify(updatedGrades));
    }
  };

  return (
    <div className="list-container">
      <h3>Liste des notes</h3>
      {grades.length === 0 ? (
        <p>Aucune note enregistrée.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Étudiant</th>
              <th>Matière</th>
              <th>Note</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grades.map(grade => (
              <tr key={grade.id}>
                <td>{getStudentName(grade.etudiantMatricule)}</td>
                <td>{getSubjectName(grade.matiereId)}</td>
                <td>{grade.note}/20</td>
                <td>{new Date(grade.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(grade.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GradeList;