import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Button } from './components/ui/button';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center px-4 py-1 mb-8 bg-blue-900 text-white shadow-md sticky top-0 right-0">
      <header>
        <Link to="/">
          <img
            src="/studentHub.png"
            alt="studentHub"
            className="w-24 h-24 rounded-full cursor-pointer"
          />
        </Link>
      </header>

      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/">
                <Button variant="default" className="text-white text-lg outline-none">
                  Home
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/about">
                <Button variant="ghost" className="text-white text-lg">
                  About
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/contact">
                <Button variant="ghost" className="text-white text-lg">
                  Contact Us
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {user && (
            <>
              <section className="flex flex-col items-center">
                <NavigationMenuItem>
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <span className="text-sm">{user.displayName || user.email}</span>
                </NavigationMenuItem>
              </section>
              <NavigationMenuItem>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="text-white text-sm"
                >
                  Logout
                </Button>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
