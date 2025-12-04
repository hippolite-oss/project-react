// components/forms/StudentForm.tsx
import React, { useState } from 'react';
import type { Student } from '../../types';


const StudentForm: React.FC = () => {
  const [student, setStudent] = useState<Omit<Student, 'matricule'>>({
    nom: '',
    prenom: '',
    dateNaiss: new Date()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Générer un matricule automatique
    const matricule = `ETU${Date.now()}`;
    const newStudent: Student = {
      ...student,
      matricule
    };
    // Ici, vous ajouterez la logique pour sauvegarder l'étudiant
    console.log('Nouvel étudiant:', newStudent);
    // Réinitialiser le formulaire
    setStudent({
      nom: '',
      prenom: '',
      dateNaiss: new Date()
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: name === 'dateNaiss' ? new Date(value) : value
    }));
  };

  return (
    <div className="form-container">
      <h3>Ajouter un étudiant</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            name="nom"
            value={student.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            name="prenom"
            value={student.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date de naissance:</label>
          <input
            type="date"
            name="dateNaiss"
            value={student.dateNaiss.toISOString().split('T')[0]}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default StudentForm;