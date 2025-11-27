// types/index.ts
export interface Student {
  matricule: string;
  nom: string;
  prenom: string;
  dateNaiss: Date;
}

export interface Subject {
  id: string;
  libelle: string;
}

export interface Grade {
  id: string;
  etudiantMatricule: string;
  matiereId: string;
  note: number;
  date: Date;
}

export interface User {
  email: string;
  password: string;
}