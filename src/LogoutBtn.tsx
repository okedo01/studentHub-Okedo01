import React from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      style={{color: "white"}}
      className="fixed top-4 right-4 bg-gray-700 px-4 py-2 rounded cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
