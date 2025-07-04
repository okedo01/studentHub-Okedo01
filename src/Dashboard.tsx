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
