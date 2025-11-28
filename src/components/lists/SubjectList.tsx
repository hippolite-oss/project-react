// components/lists/SubjectList.tsx
import React, { useState, useEffect } from 'react';
import { Subject } from '../../types';
import { api } from '../../services/api';

const SubjectList: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    setSubjects(api.getSubjects());
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette matière ?')) {
      const updatedSubjects = subjects.filter(s => s.id !== id);
      setSubjects(updatedSubjects);
      localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
    }
  };

  return (
    <div className="list-container">
      <h3>Liste des matières</h3>
      {subjects.length === 0 ? (
        <p>Aucune matière enregistrée.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Libellé</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map(subject => (
              <tr key={subject.id}>
                <td>{subject.id}</td>
                <td>{subject.libelle}</td>
                <td>
                  <button onClick={() => handleDelete(subject.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubjectList;