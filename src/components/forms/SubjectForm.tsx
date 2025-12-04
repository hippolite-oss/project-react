// components/forms/SubjectForm.tsx
import React, { useState } from 'react';
import type { Subject } from '../../types';

import { api } from '../../services/api';

const SubjectForm: React.FC = () => {
  const [subject, setSubject] = useState<Omit<Subject, 'id'>>({
    libelle: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubject: Subject = {
      ...subject,
      id: `MAT${Date.now()}`
    };
    api.saveSubject(newSubject);
    setSubject({ libelle: '' });
    alert('Matière enregistrée avec succès!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject({
      ...subject,
      libelle: e.target.value
    });
  };

  return (
    <div className="form-container">
      <h3>Ajouter une matière</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Libellé:</label>
          <input
            type="text"
            name="libelle"
            value={subject.libelle}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default SubjectForm;