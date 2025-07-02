import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">👨‍💼 Admin Dashboard</h1>

      <p className="text-lg text-gray-800 mb-6">
        Welcome, Admin! You have access to advanced tools and data to manage the platform efficiently.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">📚 Course Management</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>View all courses</li>
            <li>Add or edit course details</li>
            <li>Manage course availability</li>
          </ul>
        </div>

        <div className="border rounded-lg p-4 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">👥 Student Overview</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>View enrolled students</li>
            <li>Filter by course or email</li>
            <li>Export student data</li>
          </ul>
        </div>

        <div className="border rounded-lg p-4 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">🔒 User Roles</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Assign or revoke admin roles</li>
            <li>Manage login access</li>
          </ul>
        </div>

        <div className="border rounded-lg p-4 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">📈 Reports & Analytics</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>View registration statistics</li>
            <li>Analyze course popularity</li>
            <li>Monitor user activity</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
