import React from 'react'
import { useStudentContext } from './StudentProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

type editStudentFormProps = {
  docID: string;
  closeForm: () => void;
}

const EditStudentForm: React.FC<editStudentFormProps> = ({ docID, closeForm }) => {
  const { students, editStudent } = useStudentContext();
  const student = students.find(stud => stud.docID === docID);

  const { register, handleSubmit } = useForm({
    defaultValues: student,
  })

  const onSubmit = (data: any) => {
    Swal.fire({
      title: 'Confirm Edit',
      text: 'Are you sure you want to update this student\'s details?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        editStudent({ ...data, docID })
        closeForm()
        Swal.fire('Updated!', 'Student details have been updated.', 'success')
      }
    })
  }


  return (
    <div>
      <h3>Edit Student</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" />
        <input {...register("email")} placeholder="Email" />
        <input {...register("course")} placeholder="Course" />
        <div>
          <button>Update</button>
          <button type="button" onClick={closeForm}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditStudentForm