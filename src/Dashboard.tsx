// import React from 'react';
// import { useAuth } from './AuthProvider';
// import { useNavigate } from 'react-router-dom';

// const Dashboard: React.FC = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-blue-900 mb-4">📊 Dashboard</h1>

//       <p className="text-gray-700 mb-4">Welcome to your dashboard! From here you can:</p>

//       <ul className="list-disc list-inside text-gray-800 space-y-2 mb-6">
//         <li>👥 View list of registered students</li>
//         <li>➕ Add a new student</li>
//         <li>📚 Browse and register for available courses</li>
//         <li>🔒 Access protected content available only to logged-in users</li>
//       </ul>

//       <div className="space-x-4">
//         <button
//           onClick={() => navigate('/students')}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Manage Students
//         </button>
//         <button
//           onClick={() => navigate('/courses')}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           View Courses
//         </button>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react'
import { useAuth } from './AuthProvider'
import { useNavigate } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-900">🎉 Welcome to the Dashboard</h1>
      <p className="mt-4 text-gray-700">You are now logged in and can access protected content.</p>
      <button onClick={handleLogout} className="mt-6 px-4 py-2 bg-red-500 text-white rounded">Logout</button>
    </div>
  )
}

export default Dashboard
