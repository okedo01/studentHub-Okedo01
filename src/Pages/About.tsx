import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-blue-50 to-white py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-6 text-center">
          About StudentHub 🎓
        </h1>

        <p className="text-lg text-gray-800 mb-6 leading-relaxed">
          <strong>StudentHub</strong> is a user-friendly platform designed to simplify course registration
          and student management. Whether you're learning new skills or managing your academic path,
          StudentHub is your trusted companion.
        </p>

        <hr className="border-t border-blue-200 my-6" />

        <h2 className="text-2xl font-semibold text-blue-800 mb-3">🚀 Our Mission</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          To empower students through technology by providing fast, modern, and intuitive tools for
          learning, registration, and academic tracking. We believe education should be simple and
          accessible to everyone.
        </p>

        <hr className="border-t border-blue-200 my-6" />

        <h2 className="text-2xl font-semibold text-blue-800 mb-3">💡 What You Can Do</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>📚 Browse a variety of tech and soft skill courses</li>
          <li>📝 Register easily using guided forms with validation</li>
          <li>📋 View and manage your enrolled courses</li>
          <li>🌓 Switch between light & dark modes for better experience</li>
        </ul>

        <hr className="border-t border-blue-200 my-6" />

        <h2 className="text-2xl font-semibold text-blue-800 mb-3">🛠 Built With</h2>
        <p className="text-gray-700 leading-relaxed">
          <strong>StudentHub</strong> is built using:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li>⚛️ <strong>React + TypeScript</strong> for strong frontend architecture</li>
          <li>🎛 <strong>Context API</strong> for global state management</li>
          <li>🧩 <strong>React Hook Form</strong> for seamless form handling</li>
          <li>✅ <strong>Zod/Yup</strong> for schema validation</li>
          <li>🎨 <strong>Tailwind CSS</strong> for utility-first styling and responsiveness</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
