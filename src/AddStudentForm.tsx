import React from 'react'
import { useStudentContext } from './StudentProvider'
import { useForm } from 'react-hook-form';

const AddStudentForm: React.FC = () => {
    const { addStudent } = useStudentContext();

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data: any) => {
        addStudent({
            id: Date.now(),
            ...data,
        });
        reset();
    }
  return (
    <div>
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input { ...register("name")} placeholder="Name" />
            <input { ...register("course")} placeholder="Email" />
            <input { ...register("course")} placeholder="Course" />
            <button type="submit">Add</button>
        </form>
    </div>
  )
}

export default AddStudentForm