import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Students } from './Types';
import { Timestamp } from 'firebase/firestore';

type studentContextType = {
  students: Students[];
  addStudent: (student: Students) => void;
  editStudent: (updated: Students) => void;
  deleteStudent: (id: string) => void;
  clearAllStudents: () => void;
};

const studentContext = createContext<studentContextType | undefined>(undefined);

export const useStudentContext = () => {
  const ctx = useContext(studentContext);
  if (!ctx) {
    throw new Error('StudentContext must be used within a StudentProvider');
  }
  return ctx;
};

const LOCAL_KEY = 'studenthub_students';

const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Students[]>([]);

  // Deserialize students from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      try {
        const parsed: Students[] = JSON.parse(stored).map((s: any) => ({
          ...s,
          registeredAt: s.registeredAt
            ? new Timestamp(s.registeredAt.seconds, s.registeredAt.nanoseconds)
            : Timestamp.now(), // fallback in case missing
        }));
        setStudents(parsed);
      } catch (error) {
        console.error('Failed to parse students from localStorage', error);
        setStudents([]);
      }
    }
  }, []);

  // Serialize students to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(students));
  }, [students]);

  const addStudent = (student: Students) => {
    setStudents((prev) => [...prev, student]);
  };

  const editStudent = (updated: Students) => {
    setStudents((prev) =>
      prev.map((std) => (std.id === updated.id ? updated : std))
    );
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((std) => std.id !== id));
  };

  const clearAllStudents = () => {
    setStudents([]);
    localStorage.removeItem(LOCAL_KEY);
  };

  return (
    <studentContext.Provider
      value={{ students, addStudent, editStudent, deleteStudent, clearAllStudents }}
    >
      {children}
    </studentContext.Provider>
  );
};

export default StudentProvider;
