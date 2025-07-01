import type { Students } from "./Types"

type studentContextType = {
    students: Students[]
    addStudent: (students: Students) => void
    editStudent: (updated: Students) => void
    deleteStudent: (id: number) => void
}