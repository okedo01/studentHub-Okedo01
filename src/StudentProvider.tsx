import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import type { Students } from './Types'

type studentContextType = {
  students: Students[]
  addStudent: (student: Students) => void
  editStudent: (updated: Students) => void
  deleteStudent: (id: number) => void
}

const studentContext = createContext<studentContextType | undefined>(undefined)

export const useStudentContext = () => {
  const ctx = useContext(studentContext)
  if (!ctx) {
    throw new Error("StudentContext must be used within a StudentProvider")
  }
  return ctx
}

const LOCAL_KEY = 'studenthub_students'

const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Students[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY)
    if (stored) {
      setStudents(JSON.parse(stored))
    }
  }, [])

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(students))
  }, [students])

  const addStudent = (student: Students) => {
    setStudents(prev => [...prev, student])
  }

  const editStudent = (updated: Students) => {
    setStudents(prev => prev.map(std => (std.id === updated.id ? updated : std)))
  }

  const deleteStudent = (id: number) => {
    setStudents(prev => prev.filter(std => std.id !== id))
  }

  return (
    <studentContext.Provider value={{ students, addStudent, editStudent, deleteStudent }}>
      {children}
    </studentContext.Provider>
  )
}

export default StudentProvider
