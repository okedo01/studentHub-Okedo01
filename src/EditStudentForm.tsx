import React from 'react';
import { useStudentContext } from './StudentProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

type Student = {
  docID: string;
  name: string;
  email: string;
  course: string;
  courseID: number;
};

type EditStudentFormProps = {
  docID: string;
  closeForm: () => void;
  onSave: (updatedStudent: Student) => Promise<void>; 
};

const EditStudentForm: React.FC<EditStudentFormProps> = ({ docID, closeForm, onSave }) => {
  const { students } = useStudentContext();
  const student = students.find((s) => s.docID === docID);

  const { register, handleSubmit } = useForm<Student>({
    defaultValues: student,
  });

  const onSubmit = async (data: Student) => {
    Swal.fire({
      title: 'Confirm Edit',
      text: "Are you sure you want to update this student's details?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedStudent = { ...data, docID };
        await onSave(updatedStudent); // ✅ update in Firestore
        closeForm();
        Swal.fire('Updated!', 'Student details have been updated.', 'success');
      }
    });
  };

  if (!student) return <p className="text-red-600">Student not found.</p>;

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md mt-4">
      <h3 className="text-xl font-semibold mb-3">✏️ Edit Student</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register('name')}
          placeholder="Name"
          className="w-full px-3 py-2 border rounded"
        />
        <input
          {...register('email')}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
        />
        <input
          {...register('course')}
          placeholder="Course"
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="number"
          {...register('courseID')}
          placeholder="Course ID"
          className="w-full px-3 py-2 border rounded"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
          <button
            type="button"
            onClick={closeForm}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudentForm;
