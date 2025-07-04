import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Button } from './components/ui/button';
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
    <div className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 py-2 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/">
          <img
            src="/studentHub.png"
            alt="studentHub"
            className="w-20 h-20 rounded-full cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/">
                  <Button className="bg-white text-blue-900 text-lg hover:bg-gray-200">
                    Home
                  </Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/about">
                  <Button className="bg-white text-blue-900 text-lg hover:bg-gray-200">
                    About
                  </Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/contact">
                  <Button className="bg-white text-blue-900 text-lg hover:bg-gray-200">
                    Contact Us
                  </Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {user && (
              <>
                <section className="flex flex-col items-center">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span className="text-sm">{user.displayName || user.email}</span>
                </section>
                <NavigationMenuItem>
                  <Button
                    onClick={handleLogout}
                    className="bg-white text-red-600 text-sm hover:bg-gray-200"
                  >
                    Logout
                  </Button>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Toggle */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 px-4 pb-4">
          <ul className="flex flex-col gap-3">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                Contact Us
              </Link>
            </li>

            {user && (
              <>
                {user.photoURL && (
                  <li className="flex items-center gap-2 mt-2">
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{user.displayName || user.email}</span>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-white bg-red-600 px-3 py-1 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
