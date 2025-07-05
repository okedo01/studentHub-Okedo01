import React from 'react';
import { useStudentContext } from './StudentProvider';
import LogoutButton from './LogoutBtn';

const AdminDashboard: React.FC = () => {
  const { students, deleteStudent } = useStudentContext();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <LogoutButton />
      <h1 className="text-3xl font-bold mb-6 text-blue-900">👨‍💼 Admin Dashboard</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">📚 Manage Students</h2>
        {students.length === 0 ? (
          <p className="text-gray-600">No students enrolled yet.</p>
        ) : (
          students.map((student) => (
            <div
              key={student.docID} 
              className="border p-4 rounded mb-3 bg-white shadow-sm"
            >
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Course:</strong> {student.course}</p>
              <button
                className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => student.docID && deleteStudent(student.docID)} 
                disabled={!student.docID} 
              >
                Delete Student
              </button>
            </div>
          ))
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">📝 Manage Courses</h2>
        <p className="text-gray-600">Course management features can go here (edit, delete, add...)</p>
      </section>
    </div>
  );
};

export default AdminDashboard;
