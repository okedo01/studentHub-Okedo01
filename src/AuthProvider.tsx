import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  email: string;
  role: 'admin' | 'student';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on init
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role === 'admin' || parsedUser.role === 'student') {
          setUser(parsedUser);
        }
      } catch (e) {
        console.error('Invalid user in localStorage');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid credentials');

    const userData: User = {
      email: found.email,
      role: (found.role === 'admin' || found.role === 'student') ? found.role : 'student',
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const signup = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.some((u: any) => u.email === email);
    if (exists) throw new Error('User already exists');

    const newUser = { email, password, role: 'student' };
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const userData: User = { email, role: 'student' };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
