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
  updateDoc,
} from 'firebase/firestore';
import EditStudentForm from './EditStudentForm';
import LogoutButton from './LogoutBtn';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Exercises, type Students } from './Types';

type GroupedStudents = {
  [courseName: string]: Students[];
};

const StudentList: React.FC = () => {
  const { id } = useParams();
  const courseID = id ? Number(id) : null;
  const [students, setStudents] = useState<Students[]>([]);
  const [editID, setEditID] = useState<string | null>(null);
  const [viewProgressID, setViewProgressID] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const q = courseID
          ? query(collection(db, 'registrations'), where('courseID', '==', courseID))
          : collection(db, 'registrations');

        const querySnapshot = await getDocs(q);
        const results: Students[] = [];
        const emails = new Set<string>();

        querySnapshot.forEach((docSnap) => {
          const studentData = docSnap.data() as Omit<Students, 'docID'>;
          if (!emails.has(studentData.email)) {
            emails.add(studentData.email);
            results.push({ docID: docSnap.id, ...studentData });
          }
        });

        setStudents(results);
      } catch (error) {
        toast.error('Failed to fetch students');
      }
    };

    fetchStudents();
  }, [courseID]);

  const handleDelete = async (studentId: string, studentName: string) => {
    const confirm = window.confirm(`Are you sure you want to delete ${studentName}?`);
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'registrations', studentId));
      setStudents((prev) => prev.filter((s) => s.docID !== studentId));
      toast.success('Student deleted successfully');
    } catch (err) {
      console.error('Failed to delete student:', err);
      toast.error('Error deleting student');
    }
  };

  const groupByCourse = (students: Students[]): GroupedStudents => {
    return students.reduce((acc, student) => {
      if (!acc[student.course]) acc[student.course] = [];
      acc[student.course].push(student);
      return acc;
    }, {} as GroupedStudents);
  };

  const handleStudentUpdate = async (updatedStudent: Students) => {
    try {
      const studentRef = doc(db, 'registrations', updatedStudent.docID!);
      const snapshot = await getDoc(studentRef);
      if (snapshot.exists()) {
        await updateDoc(studentRef, {
          name: updatedStudent.name,
          email: updatedStudent.email,
          course: updatedStudent.course,
          courseID: updatedStudent.courseID,
          progress: updatedStudent.progress || 0,
          registeredAt: updatedStudent.registeredAt,
          id: updatedStudent.id,
        });
        setStudents((prev) =>
          prev.map((s) => (s.docID === updatedStudent.docID ? updatedStudent : s))
        );
        toast.success('Student updated successfully');
      }
    } catch (err) {
      console.error('Failed to update student:', err);
      toast.error('Error updating student');
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = courseID ? null : groupByCourse(filteredStudents);

  const ProgressComponent = ({ progress, courseID }: { progress?: number; courseID?: number }) => {
    const exercisesForCourse = courseID ? Exercises[courseID] || [] : [];
    const completed = Math.floor((progress ?? 0) / 100 * exercisesForCourse.length);

    return (
      <div className="mt-2 p-2 border rounded bg-green-100">
        <p><strong>Progress:</strong> {progress ?? 0}% complete</p>
        <div className="w-full bg-gray-300 rounded-full h-2.5 mt-1">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${progress ?? 0}%` }}
          ></div>
        </div>
        <ul className="mt-2 list-disc list-inside text-sm">
          {exercisesForCourse.map((ex, idx) => (
            <li key={idx} className={idx < completed ? 'text-green-700' : 'text-gray-500'}>
              {ex} {idx < completed ? '✅' : ''}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <LogoutButton />
      <h2 className="text-3xl font-bold mb-4 text-blue-900">
        {courseID ? 'Enrolled Students in This Course' : 'All Registered Students Grouped by Course'}
      </h2>

      <input
        type="text"
        placeholder="Search by name or course..."
        className="w-full px-3 py-2 mb-4 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredStudents.length === 0 ? (
        <p className="text-gray-700">No students registered yet.</p>
      ) : courseID ? (
        filteredStudents.map((student) => (
          <div
            key={student.docID}
            className="border p-3 mb-3 rounded transition duration-300 ease-in-out hover:shadow-md hover:scale-[1.01]"
          >
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>Progress:</strong> {student.progress ?? 0}%</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setEditID(student.docID!)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student.docID!, student.name)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setViewProgressID(
                  viewProgressID === student.docID ? null : student.docID as string
                )}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                {viewProgressID === student.docID ? 'Hide Progress' : 'View Progress'}
              </button>
            </div>

            {viewProgressID === student.docID && (
              <ProgressComponent
                progress={student.progress}
                courseID={student.courseID}
              />
            )}
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
                <p><strong>Progress:</strong> {student.progress ?? 0}%</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setEditID(student.docID!)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.docID!, student.name)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setViewProgressID(
                      viewProgressID === student.docID ? null : student.docID as string
                    )}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    {viewProgressID === student.docID ? 'Hide Progress' : 'View Progress'}
                  </button>
                </div>

                {viewProgressID === student.docID && (
                  <ProgressComponent
                    progress={student.progress}
                    courseID={student.courseID}
                  />
                )}
              </div>
            ))}
          </div>
        ))
      )}

      {editID !== null && (
        <EditStudentForm
          docID={editID}
          closeForm={() => setEditID(null)}
          onSave={handleStudentUpdate as any}
        />
      )}
    </div>
  );
};

export default StudentList;
