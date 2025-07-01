import React, { useState } from 'react'
import { useStudentContext } from './StudentProvider'
import EditStudentForm from './EditStudentForm';
import ConfirmationModal from './ConfirmationModal';

const StudentList: React.FC = () => {
    const { students, deleteStudent } = useStudentContext();
    const [editID, setEditID] = useState<number | null>(null)
    const [deleteID, setDeleteID] = useState<number | null>(null);

    return (
        <div>
            <h2>Student List</h2>
            {students.length === 0 ? (
                <p>No student enrolled yet</p>
            ) : (
            students.map(student => (
                <div key={student.id}>
                    <div>
                        <p>{student.name}</p>
                        <p>{student.email}</p>
                        <p>{student.course}</p>
                    </div>
                    <div>
                        <button onClick={() => setEditID(student.id)}>Edit</button>
                        <button onClick={() => setDeleteID(student.id)}>Delete</button>
                    </div>
                </div>
                )
            ))} 

            { editID !== null && (
                <EditStudentForm id={editID} closeForm={() => setEditID(null)} />
            )}

            { deleteID !== null && (
                <ConfirmationModal
                    message="Are you sure you want to delete this student?"
                    onConfirm={() => {
                        deleteStudent(deleteID);
                        setDeleteID(null);
                    }}
                    onCancel={() => setDeleteID(null)} 
                />
            )} 
        </div>
    )
}

export default StudentList