// import React, { useState } from 'react'
// import { useStudentContext } from './StudentProvider'
// import EditStudentForm from './EditStudentForm';
// import ConfirmationModal from './ConfirmationModal';

// const StudentList: React.FC = () => {
//     const { students, deleteStudent } = useStudentContext();
//     const [editID, setEditID] = useState<number | null>(null)
//     const [deleteID, setDeleteID] = useState<number | null>(null);

//     return (
//         <div>
//             <h2>Student List</h2>
//             {students.length === 0 ? (
//                 <p>No student enrolled yet</p>
//             ) : (
//             students.map(student => (
//                 <div key={student.id}>
//                     <div>
//                         <p>{student.name}</p>
//                         <p>{student.email}</p>
//                         <p>{student.course}</p>
//                     </div>
//                     <div>
//                         <button onClick={() => setEditID(student.id)}>Edit</button>
//                         <button onClick={() => setDeleteID(student.id)}>Delete</button>
//                     </div>
//                 </div>
//                 )
//             ))} 

//             { editID !== null && (
//                 <EditStudentForm id={editID} closeForm={() => setEditID(null)} />
//             )}

//             { deleteID !== null && (
//                 <ConfirmationModal
//                     message="Are you sure you want to delete this student?"
//                     onConfirm={() => {
//                         deleteStudent(deleteID);
//                         setDeleteID(null);
//                     }}
//                     onCancel={() => setDeleteID(null)} 
//                 />
//             )} 
//         </div>
//     )
// }

// export default StudentList


import React from 'react'
import { useParams } from 'react-router-dom'
import { useStudentContext } from './StudentProvider'

const StudentList: React.FC = () => {
  const { id } = useParams()
  const courseID = Number(id)
  const { students } = useStudentContext()

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
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Course:</strong> {student.course}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default StudentList
