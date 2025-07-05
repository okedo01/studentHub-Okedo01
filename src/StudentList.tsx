import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './Firebase/Firebase';
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import EditStudentForm from './EditStudentForm';
import LogoutButton from './LogoutBtn';

type Student = {
  docID: string;
  name: string;
  email: string;
  course: string;
  courseID: number;
};

type GroupedStudents = {
  [courseName: string]: Student[];
};

const StudentList: React.FC = () => {
  const { id } = useParams();
  const courseID = id ? Number(id) : null;
  const [students, setStudents] = useState<Student[]>([]);
  const [editID, setEditID] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const q = courseID
        ? query(collection(db, 'registrations'), where('courseID', '==', courseID))
        : collection(db, 'registrations');

      const querySnapshot = await getDocs(q);
      const results: Student[] = [];

      querySnapshot.forEach((docSnap) => {
        results.push({
          docID: docSnap.id,
          ...(docSnap.data() as Omit<Student, 'docID'>),
        });
      });

      setStudents(results);
    };

    fetchStudents();
  }, [courseID]);

  const handleDelete = async (studentId: string, studentName: string) => {
    const confirm = window.confirm(`Are you sure you want to delete ${studentName}?`);
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'registrations', studentId));
      setStudents((prev) => prev.filter((s) => s.docID !== studentId));
    } catch (err) {
      console.error('Failed to delete student:', err);
    }
  };

  const groupByCourse = (students: Student[]): GroupedStudents => {
    return students.reduce((acc, student) => {
      if (!acc[student.course]) acc[student.course] = [];
      acc[student.course].push(student);
      return acc;
    }, {} as GroupedStudents);
  };

  const handleStudentUpdate = async (updatedStudent: Student) => {
    try {
      const studentRef = doc(db, 'registrations', updatedStudent.docID);
      const snapshot = await getDoc(studentRef);
      if (snapshot.exists()) {
        await updateDoc(studentRef, {
          name: updatedStudent.name,
          email: updatedStudent.email,
          course: updatedStudent.course,
          courseID: updatedStudent.courseID,
        });
        setStudents((prev) =>
          prev.map((s) => (s.docID === updatedStudent.docID ? updatedStudent : s))
        );
      }
    } catch (err) {
      console.error('Failed to update student:', err);
    }
  };

  const grouped = courseID ? null : groupByCourse(students);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <LogoutButton />
      <h2 className="text-3xl font-bold mb-4 text-blue-900">
        {courseID ? 'Enrolled Students in This Course' : 'All Registered Students Grouped by Course'}
      </h2>

      {students.length === 0 ? (
        <p className="text-gray-700">No students registered yet.</p>
      ) : courseID ? (
        students.map((student) => (
          <div
            key={student.docID}
            className="border p-3 mb-3 rounded transition duration-300 ease-in-out hover:shadow-md hover:scale-[1.01]"
          >
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Course:</strong> {student.course}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setEditID(student.docID)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student.docID, student.name)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        Object.entries(grouped!).map(([courseName, courseStudents]) => (
          <div key={courseName} className="mb-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">📘 {courseName}</h3>
            {courseStudents.map((student) => (
              <div
                key={student.docID}
                className="border p-3 mb-2 rounded bg-white shadow-sm"
              >
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Email:</strong> {student.email}</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setEditID(student.docID)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.docID, student.name)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}

      {editID !== null && (
        <EditStudentForm
          docID={editID}
          closeForm={() => setEditID(null)}
          onSave={handleStudentUpdate}
        />
      )}
    </div>
  );
};

export default StudentList;
