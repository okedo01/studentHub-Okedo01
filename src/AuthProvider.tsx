import React, { useContext, useState, type ReactNode } from 'react'
import { createContext } from 'vm';

type AuthContextType = {
    isAuthenticated: boolean
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
        return context;
    }
}

const AuthProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider