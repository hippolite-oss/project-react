// components/forms/GradeForm.tsx
import React, { useState, useEffect } from 'react';
import type { Grade, Student, Subject } from '../../types';
import { api } from '../../services/api';

const GradeForm: React.FC = () => {
  const [grade, setGrade] = useState<Omit<Grade, 'id'>>({
    etudiantMatricule: '',
    matiereId: '',
    note: 0,
    date: new Date()
  });
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStudents(api.getStudents());
    setSubjects(api.getSubjects());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGrade: Grade = {
      ...grade,
      id: `NOTE${Date.now()}`
    };
    api.saveGrade(newGrade);
    setGrade({
      etudiantMatricule: '',
      matiereId: '',
      note: 0,
      date: new Date()
    });
    alert('Note enregistrée avec succès!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGrade(prev => ({
      ...prev,
      [name]: name === 'note' ? parseFloat(value) : value
    }));
  };

  return (
    <div className="form-container">
      <h3>Ajouter une note</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Étudiant:</label>
          <select
            name="etudiantMatricule"
            value={grade.etudiantMatricule}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner un étudiant</option>
            {students.map(student => (
              <option key={student.matricule} value={student.matricule}>
                {student.prenom} {student.nom}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Matière:</label>
          <select
            name="matiereId"
            value={grade.matiereId}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner une matière</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.libelle}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Note:</label>
          <input
            type="number"
            name="note"
            min="0"
            max="20"
            step="0.5"
            value={grade.note}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={grade.date.toISOString().split('T')[0]}
            onChange={(e) => setGrade({...grade, date: new Date(e.target.value)})}
            required
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default GradeForm;