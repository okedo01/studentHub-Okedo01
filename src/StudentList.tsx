import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStudentContext } from './StudentProvider'
import EditStudentForm from './EditStudentForm'

const StudentList: React.FC = () => {
  const { id } = useParams()
  const courseID = Number(id)
  const { students, deleteStudent, clearAllStudents } = useStudentContext()
  const [editID, setEditID] = useState<number | null>(null)

  const filtered = students.filter((s) => s.courseID === courseID)

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Enrolled Students</h2>

      {filtered.length === 0 ? (
        <p className="text-gray-700">No students enrolled in this course yet.</p>
      ) : (
        filtered.map((student) => (
          <div
            key={student.id}
            className="border p-3 mb-3 rounded transition duration-300 ease-in-out hover:shadow-md hover:scale-[1.01]"
          >
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Course:</strong> {student.course}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setEditID(student.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  const confirm = window.confirm(`Are you sure you want to delete ${student.name}?`);
                  if (confirm) deleteStudent(student.id);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {students.length > 0 && (
        <button
          onClick={() => {
            const confirm = window.confirm("Clear all students?");
            if (confirm) clearAllStudents();
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
        >
          Clear All Students
        </button>
      )}

      {editID !== null && (
        <EditStudentForm id={editID} closeForm={() => setEditID(null)} />
      )}
    </div>
  )
}

export default StudentList
