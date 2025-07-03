export interface Courses {
    id: number
    title: string
    description: string
    duration: string
    category: string
    experience: string
}

// export type Students = {
//   id: number
//   name: string
//   email: string
//   course: string
//   courseID: number
// }

export type Student = {
  id: string;             
  name: string;
  email: string;
  courseId: string;      
  courseTitle: string;     
  timestamp: Date;
};
