// services/api.ts
import { Student, Subject, Grade } from '../types';

// Simulation de stockage local
const STORAGE_KEYS = {
  STUDENTS: 'students',
  SUBJECTS: 'subjects',
  GRADES: 'grades'
};

export const api = {
  // Étudiants
  getStudents: (): Student[] => {
    const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return data ? JSON.parse(data) : [];
  },

  saveStudent: (student: Student): void => {
    const students = api.getStudents();
    students.push(student);
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  },

  // Matières
  getSubjects: (): Subject[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
    return data ? JSON.parse(data) : [];
  },

  saveSubject: (subject: Subject): void => {
    const subjects = api.getSubjects();
    subjects.push(subject);
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  },

  // Notes
  getGrades: (): Grade[] => {
    const data = localStorage.getItem(STORAGE_KEYS.GRADES);
    return data ? JSON.parse(data) : [];
  },

  saveGrade: (grade: Grade): void => {
    const grades = api.getGrades();
    grades.push(grade);
    localStorage.setItem(STORAGE_KEYS.GRADES, JSON.stringify(grades));
  }
};