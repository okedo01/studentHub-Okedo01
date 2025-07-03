import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './Firebase/Firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import EditStudentForm from './EditStudentForm';

type Student = {
  id: string;
  name: string;
  email: string;
  course: string;
  courseID: number;
};

const StudentList: React.FC = () => {
  const { id } = useParams();
  const courseID = Number(id);
  const [students, setStudents] = useState<Student[]>([]);
  const [editID, setEditID] = useState<string | null>(null);

  // Fetch students from Firestore based on courseID
  useEffect(() => {
    const fetchStudents = async () => {
      const q = query(collection(db, 'registrations'), where('courseID', '==', courseID));
      const querySnapshot = await getDocs(q);
      const results: Student[] = [];

      querySnapshot.forEach((docSnap) => {
        results.push({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Student, 'id'>),
        });
      });

      setStudents(results);
    };

    fetchStudents();
  }, [courseID]);

  // Delete a student from Firestore
  const handleDelete = async (studentId: string, studentName: string) => {
    const confirm = window.confirm(`Are you sure you want to delete ${studentName}?`);
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'registrations', studentId));
      setStudents((prev) => prev.filter((s) => s.id !== studentId));
    } catch (err) {
      console.error('Failed to delete student:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Enrolled Students</h2>

      {students.length === 0 ? (
        <p className="text-gray-700">No students enrolled in this course yet.</p>
      ) : (
        students.map((student) => (
          <div
            key={student.id}
            className="border p-3 mb-3 rounded transition duration-300 ease-in-out hover:shadow-md hover:scale-[1.01]"
          >
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Course:</strong> {student.course}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setEditID(student.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student.id, student.name)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {editID !== null && (
        <EditStudentForm id={editID} closeForm={() => setEditID(null)} />
      )}
    </div>
  );
};

export default StudentList;
