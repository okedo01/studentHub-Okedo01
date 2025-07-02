import React from 'react'
import { useParams } from 'react-router-dom'
import { useStudentContext } from './StudentProvider'

const StudentList: React.FC = () => {
    const { id } = useParams()
    const courseID = Number(id)
    const { students, deleteStudent, clearAllStudents } = useStudentContext()

    const filtered = students.filter((s) => s.courseID === courseID)

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Enrolled Students</h2>
            {filtered.length === 0 ? (
                <p className="text-gray-700">No students enrolled in this course yet.</p>
            ) : (
                filtered.map((student) => (
                    <div key={student.id} className="border p-3 mb-3 rounded">
                        <p><strong>Name:</strong> {student.name}</p>
                        {/* <p><strong>Email:</strong> {student.email}</p> */}
                        <p><strong>Course:</strong> {student.course}</p>
                    </div>
                ))
            )}

            {students.length > 0 && (
                <button onClick={clearAllStudents} className="bg-gray-400 text-white px-4 py-1 rounded mt-4">
                    Clear All Students
                </button>
            )}
    </div>
    )
}

export default StudentList
