// import React, { createContext, useContext, useState } from 'react'

// type AuthContextType = {
//   isAuthenticated: boolean
//   login: () => void
//   logout: () => void
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }

// const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
//     return localStorage.getItem('isAuthenticated') === 'true'
//   })

//   const login = () => {
//     setIsAuthenticated(true)
//     localStorage.setItem('isAuthenticated', 'true')
//   }

//   const logout = () => {
//     setIsAuthenticated(false)
//     localStorage.removeItem('isAuthenticated')
//   }

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthProvider



// AuthProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  username: string;
  role: 'admin' | 'student';
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('auth_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
