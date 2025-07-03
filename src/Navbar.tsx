// import React from 'react'
// import {
//     NavigationMenu,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
// } from "@/components/ui/navigation-menu"
// import { Link } from 'react-router-dom'
// import { Button } from './components/ui/button'

// const Navbar: React.FC = () => {
//     return (
//         <div className="flex justify-between items-center px-4 py-1 mb-8 nav">
//             <header>
//                 <Link to="/">
//                     <img src="/studentHub.png" alt="studentHub" className="w-24 h-24 rounded-full cursor-pointer"/>
//                 </Link>
//             </header>
//             <NavigationMenu>
//                 <NavigationMenuList>
//                     <NavigationMenuItem>
//                             <NavigationMenuLink href="/" className="text-2xl">
//                                 <Button>Home</Button>
//                             </NavigationMenuLink>
//                     </NavigationMenuItem>
//                     <NavigationMenuItem>
//                             <NavigationMenuLink href="/about" className="text-2xl">
//                                 <Button>About</Button>
//                             </NavigationMenuLink>
//                     </NavigationMenuItem>
//                     <NavigationMenuItem>
//                             <NavigationMenuLink href="/contact" className="text-2xl">
//                                 <Button>Contact Us</Button>
//                             </NavigationMenuLink>
//                     </NavigationMenuItem>
//                 </NavigationMenuList>
//             </NavigationMenu>
//         </div>
//     )
// }

// export default Navbar

import { useAuth } from './AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-900 text-white shadow-md">
      <header>
        <Link to="/">
          <img src="/studentHub.png" alt="studentHub" className="w-24 h-24 rounded-full cursor-pointer" />
        </Link>
      </header>

      {user ? (
        <div className="flex items-center gap-4">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <span className="hidden sm:inline">{user.displayName || user.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
