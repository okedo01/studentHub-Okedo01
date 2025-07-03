import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import type { Courses, Students } from './Types';
import { useStudentContext } from './StudentProvider';
import Swal from 'sweetalert2';
import { db } from './Firebase/Firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

type formData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
  const [course, setCourse] = useState<Courses | null>(null);
  const { id } = useParams();
  const courseID = Number(id);
  const navigate = useNavigate();
  const { addStudent } = useStudentContext();

  useEffect(() => {
    fetch('/data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data: Courses[]) => {
        const found = data.find((c) => c.id === courseID);
        setCourse(found || null);
      });
  }, [courseID]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<formData>();

  const onSubmit = async (data: formData) => {
    const now = Timestamp.now();

    const student: Students = {
      id: Date.now().toString(), // string id as required
      name: data.email.split('@')[0],
      email: data.email,
      course: course?.title || '',
      courseID,
      registeredAt: now,
    };

    try {
      // Save to context (local state)
      addStudent(student);

      // Save to Firebase Firestore
      await addDoc(collection(db, 'registrations'), student);

      // Success alert
      Swal.fire({
        title: '🎉 Registration Successful!',
        text: `You are now enrolled in "${course?.title}"`,
        icon: 'success',
        confirmButtonText: 'View Students',
        showCancelButton: true,
        cancelButtonText: 'Stay Here',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/students/${courseID}`);
        }
      });

      reset();
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      Swal.fire('Error', 'Registration failed. Try again.', 'error');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">
        Register for {course?.title}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('email', { required: 'Email is required' })}
          type="email"
          placeholder="Enter email"
          className="w-full px-3 py-2 border rounded"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

        <input
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 7, message: 'Min 7 characters' },
          })}
          type="password"
          placeholder="Enter password"
          className="w-full px-3 py-2 border rounded"
        />
        {errors.password && <p className="text-red-600">{errors.password.message}</p>}

        <input
          {...register('confirmPassword', {
            required: 'Confirm password',
            validate: (val) => val === getValues('password') || 'Passwords do not match',
          })}
          type="password"
          placeholder="Confirm password"
          className="w-full px-3 py-2 border rounded"
        />
        {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
