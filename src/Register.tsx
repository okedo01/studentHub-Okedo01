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

    const newStudentData = {
      name: data.email.split('@')[0],
      email: data.email,
      course: course?.title || '',
      courseID,
      registeredAt: now,
    };

    try {
      // Save to Firestore and get the generated document reference
      const docRef = await addDoc(collection(db, 'registrations'), newStudentData);

      // Construct full student object including Firestore docID and numeric id
      const student: Students = {
        docID: docRef.id,       // Firestore doc ID string
        id: Date.now(),         // your numeric student ID (optional)
        ...newStudentData,
      };

      // Save to local context
      addStudent(student);

      // Show success alert
      Swal.fire({
        title: '🎉 Registration Successful!',
        text: `You are now enrolled in "${course?.title}"`,
        icon: 'success',
        confirmButtonText: 'Go Back',
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



// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import type { Courses, Students } from './Types';
// import { useStudentContext } from './StudentProvider';
// import Swal from 'sweetalert2';
// import { db } from './Firebase/Firebase';
// import { collection, addDoc, Timestamp } from 'firebase/firestore';

// const Register: React.FC = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { addStudent } = useStudentContext();
//   const [courses, setCourses] = useState<Courses[]>([]);
//   const [course, setCourse] = useState<Courses | null>(null);

//   const isAdminMode = location.pathname.includes('/dashboard');
//   const courseID = id ? Number(id) : undefined;

//   useEffect(() => {
//     fetch('/data.json')
//       .then((res) => res.json())
//       .then((data: Courses[]) => {
//         setCourses(data);
//         if (courseID) {
//           const found = data.find((c) => c.id === courseID);
//           setCourse(found || null);
//         }
//       });
//   }, [courseID]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//     getValues,
//   } = useForm();

//   const onSubmit = async (data: any) => {
//     const selectedCourseID = isAdminMode ? Number(data.courseID) : courseID;
//     const selectedCourse = courses.find((c) => c.id === selectedCourseID);

//     const newStudentData = {
//       name: data.name || data.email.split('@')[0],
//       email: data.email,
//       course: selectedCourse?.title || '',
//       courseID: selectedCourseID,
//       registeredAt: Timestamp.now(),
//     };

//     try {
//       const docRef = await addDoc(collection(db, 'registrations'), newStudentData);
//       const student: Students = {
//         docID: docRef.id,
//         id: Date.now(),
//         ...newStudentData,
//       };

//       addStudent(student);

//       Swal.fire({
//         title: '✅ Registration Successful!',
//         text: `Student enrolled in "${selectedCourse?.title}"`,
//         icon: 'success',
//         confirmButtonText: 'OK',
//       });

//       if (!isAdminMode) navigate(`/students/${selectedCourseID}`);
//       reset();
//     } catch (error) {
//       console.error('Error saving student:', error);
//       Swal.fire('Error', 'Failed to register student.', 'error');
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4 text-blue-900">
//         {isAdminMode ? 'Register a New Student' : `Register for ${course?.title}`}
//       </h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {isAdminMode && (
//           <>
//             <input
//               {...register('name', { required: 'Name is required' })}
//               placeholder="Student name"
//               className="w-full px-3 py-2 border rounded"
//             />
//             {errors.name && <p className="text-red-600">{errors.name.message}</p>}
//           </>
//         )}

//         <input
//           {...register('email', { required: 'Email is required' })}
//           type="email"
//           placeholder="Enter email"
//           className="w-full px-3 py-2 border rounded"
//         />
//         {errors.email && <p className="text-red-600">{errors.email.message}</p>}

//         <input
//           {...register('password', {
//             required: 'Password is required',
//             minLength: { value: 7, message: 'Min 7 characters' },
//           })}
//           type="password"
//           placeholder="Enter password"
//           className="w-full px-3 py-2 border rounded"
//         />
//         {errors.password && <p className="text-red-600">{errors.password.message}</p>}

//         <input
//           {...register('confirmPassword', {
//             required: 'Confirm password',
//             validate: (val) => val === getValues('password') || 'Passwords do not match',
//           })}
//           type="password"
//           placeholder="Confirm password"
//           className="w-full px-3 py-2 border rounded"
//         />
//         {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}

//         {isAdminMode && (
//           <select {...register('courseID', { required: 'Select a course' })} className="w-full px-3 py-2 border rounded">
//             <option value="">-- Select Course --</option>
//             {courses.map((course) => (
//               <option key={course.id} value={course.id}>{course.title}</option>
//             ))}
//           </select>
//         )}

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
//         >
//           {isAdminMode ? 'Register Student' : 'Submit'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;
