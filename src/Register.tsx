import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

type formData = {
    email: string
    password: string
    confirmPassword: string
}

const Register: React.FC = () => {
    const { id } = useParams();
    const formID = Number(id);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
    } = useForm<formData>();

    const onSubmit = async (data: formData) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert("You have been registered");
        reset();
    }

    return (
        <div>
            <h1>Register for course ID: {formID}</h1>
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