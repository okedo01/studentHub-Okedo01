import React from 'react'
import { useStudentContext } from './StudentProvider';
import { useForm } from 'react-hook-form';

type editStudentFormProps = {
  id: number;
  closeForm: () => void;
}

const EditStudentForm: React.FC<editStudentFormProps> = ({id, closeForm}) => {
  const { students, editStudent } = useStudentContext();
  const student = students.find(stud => stud.id === id);

  const { register, handleSubmit } = useForm({
    defaultValues: student,
  })

  const onSubmit = (data: any) => {
    editStudent({...data, id})
    closeForm();
  }

  return (
    <div>
      <h3>Edit Student</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input { ...register("name")} placeholder="Name"/>
        <input { ...register("email")} placeholder="Email"/>
        <input { ...register("course")} placeholder="Course"/>
        <div>
          <button>Update</button>
          <button type="button" onClick={closeForm}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditStudentForm