import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-900">About StudentHub 🎓</h1>

      <p className="text-lg text-gray-800 mb-4">
        <strong>StudentHub</strong> is an online platform designed to make learning easier, faster, and more accessible for students from all backgrounds. Whether you're looking to explore new skills or advance your career, StudentHub connects you with quality courses and practical content.
      </p>

      <h2 className="text-2xl font-semibold mb-2 text-blue-800">🚀 Our Mission</h2>
      <p className="text-gray-700 mb-4">
        We aim to empower students by providing a simple and modern platform for course browsing and registration. We believe that education should be accessible to everyone — no matter where they are.
      </p>

      <h2 className="text-2xl font-semibold mb-2 text-blue-800">💡 What You Can Do</h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Explore a wide variety of tech and soft-skill courses</li>
        <li>Register easily using a simple, guided form</li>
        <li>Manage your course list and view what you’ve enrolled in</li>
        <li>Switch between light and dark modes for comfortable viewing</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2 text-blue-800">👩‍💻 Built With</h2>
      <p className="text-gray-700">
        StudentHub is powered by <strong>React + TypeScript</strong>, with global state handled by <strong>Context API</strong> and forms managed using <strong>React Hook Form</strong> and <strong>Zod/Yup</strong> for validation. Styling is handled with <strong>Tailwind CSS</strong> for a clean and responsive UI.
      </p>
    </div>
  );
};

export default About;
