import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import { Exercises, ExerciseAnswers } from '@/Types';

interface Props {
  courseID: number;
  studentID: string;
  onClose: () => void;
}

const CourseProgress: React.FC<Props> = ({ courseID, studentID, onClose }) => {
  const questions = Exercises[courseID] || [];
  const correctAnswers = ExerciseAnswers[courseID] || [];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadAnswers = async () => {
      const docRef = doc(db, 'registrations', studentID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.answers) setAnswers(data.answers);
        if (data.progress) setSubmitted(true);
      }
    };
    loadAnswers();
  }, [studentID]);

  const handleChange = (question: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async () => {
    // Check correct answers count
    let correctCount = 0;
    questions.forEach((question, idx) => {
      if (
        answers[question]?.trim().toLowerCase() ===
        correctAnswers[idx]?.trim().toLowerCase()
      ) {
        correctCount++;
      }
    });

    const progress = Math.round((correctCount / questions.length) * 100);
    setScore(progress);

    await updateDoc(doc(db, 'registrations', studentID), {
      answers,
      progress,
    });
    setSubmitted(true);
    alert(`Answers submitted! Your score: ${progress}%`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">📘 Course Exercises</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Question</th>
            <th className="border px-2 py-1">Your Answer</th>
            <th className="border px-2 py-1">Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, idx) => (
            <tr key={question}>
              <td className="border px-2 py-1">{idx + 1}</td>
              <td className="border px-2 py-1">{question}</td>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  value={answers[question] || ''}
                  onChange={(e) => handleChange(question, e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  disabled={submitted}
                />
              </td>
              <td className="border px-2 py-1 text-green-700 font-semibold">
                {submitted
                  ? correctAnswers[idx]
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Answers
        </button>
      )}

      {submitted && (
        <p className="mt-4 font-semibold text-green-700">
          Your progress: {score}%
        </p>
      )}

      <button
        className="mt-2 bg-gray-500 text-white px-3 py-1 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default CourseProgress;
