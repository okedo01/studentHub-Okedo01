// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useParams } from 'react-router-dom'
// import type { Courses } from './Types'
// import Swal from 'sweetalert2'

// type formData = {
//     email: string
//     password: string
//     confirmPassword: string
// }

// const Register: React.FC = () => {
//     const [courses, setCourses] = useState<Courses | null>(null);

//     const { id } = useParams();
//     const courseID = Number(id);

//     useEffect(() => {
//         fetch("/data.json")
//             .then(resource => {
//                 if (!resource.ok) {
//                     throw new Error("Failed to fetch data");
//                 }
//                 return resource.json();
//             })
//             .then((data: Courses[]) => {
//                 const foundCourse = data.find(course => course.id === courseID);
//                 setCourses(foundCourse || null);
//             })
//     })

//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting },
//         reset,
//         getValues,
//     } = useForm<formData>();

//     const onSubmit = async (data: formData) => {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         Swal.fire({
//             title: '🎉 Congratulations!',
//             text: `You have been successfully enrolled for ${courses?.title} course`,
//             icon: 'success',
//             confirmButtonText: 'Awesome 🚀',
//         });
//         reset();
//     }

//     return (
//         <div>
//             <h1>Register For {courses?.title}</h1>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <input {
//                     ...register("email", {
//                         required: "Email is required",
//                     })
//                 }
//                     type="email" placeholder='Enter email' />
//                 {errors.email && (
//                     <p className='error'>{`${errors.email.message}`}</p>
//                 )}
//                 <input {
//                     ...register("password", {
//                         required: "Password is required",
//                         minLength: {
//                             value: 7,
//                             message: "Password must be 7 characters"
//                         }
//                     })
//                 }
//                     type="password" placeholder='Enter password' />
//                 {errors.password && (
//                     <p className='error'>{`${errors.password.message}`}</p>
//                 )}
//                 <input {
//                     ...register("confirmPassword", {
//                         required: "Confirm password is required",
//                         validate: (value) =>
//                             value === getValues("password") || "Passwords do not match"

//                     })
//                 }
//                     type="password" placeholder='Confirm password' />
//                 {errors.confirmPassword && (
//                     <p className='error'>{`${errors.confirmPassword.message}`}</p>
//                 )}
//                 <button type='submit' disabled={isSubmitting}>Submit</button>
//             </form>
//         </div>
//     )
// }

// export default Register


import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import type { Courses } from './Types'
import { useStudentContext } from './StudentProvider'
import Swal from 'sweetalert2'

type formData = {
  email: string
  password: string
  confirmPassword: string
}

const Register: React.FC = () => {
  const [course, setCourse] = useState<Courses | null>(null)
  const { id } = useParams()
  const courseID = Number(id)
  const navigate = useNavigate()
  const { addStudent } = useStudentContext()

  useEffect(() => {
    fetch('/data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data')
        return res.json()
      })
      .then((data: Courses[]) => {
        const found = data.find((c) => c.id === courseID)
        setCourse(found || null)
      })
  }, [courseID])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<formData>()

  const onSubmit = async (data: formData) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Add student
    addStudent({
      id: Date.now(),
      name: data.email.split('@')[0],
      email: data.email,
      course: course?.title || '',
      courseID: courseID,
    })

    // SweetAlert with "View Students" button
    Swal.fire({
      title: '🎉 Registration Successful!',
      text: `You are now enrolled in "${course?.title}"`,
      icon: 'success',
      confirmButtonText: 'View Students',
      showCancelButton: true,
      cancelButtonText: 'Stay Here',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/students/${courseID}`)
      }
    })

    reset()
  }

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
  )
}

export default Register
