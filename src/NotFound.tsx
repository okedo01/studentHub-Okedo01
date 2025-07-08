import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-blue-700">404</h1>
        <p className="mt-4 text-xl text-gray-700 font-medium">Page Not Found</p>
        <p className="mt-2 text-gray-500">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
