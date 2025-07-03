import type { Timestamp } from "firebase/firestore"

export interface Courses {
    id: number
    title: string
    description: string
    duration: string
    category: string
    experience: string
}

export type Student = {
  id?: string; 
  name: string;
  email: string;
  course: string;
  courseID: number;
  registeredAt: Timestamp;
};

