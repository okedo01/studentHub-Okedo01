import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from "../Firebase/Firebase";
import { Exercises } from '@/Types';

type Props = {
  courseID: number;
  studentID: string;
  onClose: () => void;
};

const CourseProgress: React.FC<Props> = ({ courseID, studentID, onClose }) => {
  const courseExercises = Exercises[courseID] || [];
  const [completed, setCompleted] = useState<string[]>([]);

  const handleToggle = async (exercise: string) => {
    const updated = completed.includes(exercise)
      ? completed.filter((e) => e !== exercise)
      : [...completed, exercise];

    setCompleted(updated);

    const progressPercent = Math.round((updated.length / courseExercises.length) * 100);

    // Save to Firestore
    await updateDoc(doc(db, 'registrations', studentID), {
      progress: progressPercent
    });
  };

  return (
    <div className="p-4 border rounded bg-white shadow-md">
      <h3 className="text-xl font-bold mb-3">📈 Course Exercises</h3>
      {courseExercises.map((exercise) => (
        <div key={exercise} className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={completed.includes(exercise)}
            onChange={() => handleToggle(exercise)}
          />
          <span>{exercise}</span>
        </div>
      ))}
      <button
        className="mt-4 bg-gray-600 text-white px-3 py-1 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default CourseProgress;
