// components/lists/StudentList.tsx
import React, { useState, useEffect } from 'react';
import { Student } from '../../types';
import { api } from '../../services/api';

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents(api.getStudents());
  }, []);

  const handleDelete = (matricule: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      // Implémentez la suppression ici
      const updatedStudents = students.filter(s => s.matricule !== matricule);
      setStudents(updatedStudents);
      // Mettre à jour le localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
    }
  };

  return (
    <div className="list-container">
      <h3>Liste des étudiants</h3>
      {students.length === 0 ? (
        <p>Aucun étudiant enregistré.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Date de naissance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.matricule}>
                <td>{student.matricule}</td>
                <td>{student.nom}</td>
                <td>{student.prenom}</td>
                <td>{new Date(student.dateNaiss).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(student.matricule)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;