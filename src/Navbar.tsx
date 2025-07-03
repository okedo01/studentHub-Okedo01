import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-800 text-white px-4 py-3 shadow-md relative">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold">
          StudentHub
        </Link>

        {/* Mobile toggle button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6 items-center">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/courses" className="hover:underline">Courses</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>

          {user && (
            <li>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                Logout
              </button>
            </li>
          )}

          {user?.photoURL && (
            <li className="flex items-center gap-2">
              <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
              <span className="text-sm">{user.displayName || user.email}</span>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="md:hidden absolute top-full left-0 w-full bg-blue-900 p-4 space-y-4 z-50">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/courses" onClick={() => setIsOpen(false)}>Courses</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          {user && (
            <li>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="bg-red-500 px-3 py-1 rounded">
                Logout
              </button>
            </li>
          )}
          {user?.photoURL && (
            <li className="flex items-center gap-2">
              <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
              <span className="text-sm">{user.displayName || user.email}</span>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
