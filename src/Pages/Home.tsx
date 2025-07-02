import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-white to-blue-50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl font-bold text-blue-900 leading-tight">
          Welcome to <span className="text-purple-700">StudentHub</span> 🎓
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          StudentHub is a modern platform that helps you explore, register, and manage courses with ease.
          Whether you're just starting your learning journey or adding new skills, we’ve got you covered!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">📚 Easy Course Access</h3>
            <p className="text-gray-700">
              Browse available courses, view details, and register in just a few clicks.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">👩‍🎓 Track Enrollments</h3>
            <p className="text-gray-700">
              Manage your student list and keep track of enrollments with a simple and intuitive interface.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">🛠️ Built for Developers</h3>
            <p className="text-gray-700">
              Powered by React + TypeScript, styled with Tailwind CSS, and form-handling using React Hook Form.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">🌍 Accessible Anywhere</h3>
            <p className="text-gray-700">
              Fully responsive design for both desktop and mobile users — learn and manage on the go.
            </p>
          </div>
        </div>

        <div className="pt-8 space-x-4">
          <Link to="/courses">
            <Button className="text-lg">📖 Browse Courses</Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" className="text-lg">ℹ️ Learn More</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
