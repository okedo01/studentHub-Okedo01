import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import type { Courses } from './Types'

type formData = {
    email: string
    password: string
    confirmPassword: string
}

const Register: React.FC = () => {
    const [ courses, setCourses ] = useState<Courses | null>(null);

    const { id } = useParams();
    const courseID = Number(id);

    useEffect(() => {
        fetch("/data.json")
            .then(resource => {
                if(!resource.ok) {
                    throw new Error("Failed to fetch data");
                }
                return resource.json();
            })
            .then((data: Courses[]) => {
                const foundCourse = data.find(course => course.id === courseID);
                setCourses(foundCourse || null);
            })
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
    } = useForm<formData>();

    const onSubmit = async (data: formData) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert(`You have been registered for ${courses?.title}`);
        reset();
    }

    return (
        <div>
            <h1>Register For {courses?.title}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {
                    ...register("email", {
                        required: "Email is required",
                    })
                }
                    type="email" placeholder='Enter email' />
                {errors.email && (
                    <p className='error'>{`${errors.email.message}`}</p>
                )}
                <input {
                    ...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 7,
                            message: "Password must be 7 characters"
                        }
                    })
                }
                    type="password" placeholder='Enter password' />
                {errors.password && (
                    <p className='error'>{`${errors.password.message}`}</p>
                )}
                <input {
                    ...register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: (value) =>
                            value === getValues("password") || "Passwords do not match"

                    })
                }
                    type="password" placeholder='Confirm password' />
                {errors.confirmPassword && (
                    <p className='error'>{`${errors.confirmPassword.message}`}</p>
                )}
                <button type='submit' disabled={isSubmitting}>Submit</button>
            </form>
        </div>
    )
}

export default Register