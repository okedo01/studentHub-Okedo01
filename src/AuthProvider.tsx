import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "./Firebase/Firebase";

// Define role types
type Role = "admin" | "student";

// Define user with role
type AuthContextType = {
  user: FirebaseUser | null;
  role: Role | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const provider = new GoogleAuthProvider();

// Add your admin emails here
const adminEmails = ["eliahmwelangi01@gmail.com, marvelokedo01@gmail.com"];

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const isAdmin = adminEmails.includes(firebaseUser.email || "");
        const assignedRole: Role = isAdmin ? "admin" : "student";
        setRole(assignedRole);
        localStorage.setItem("userRole", assignedRole);
      } else {
        setRole(null);
        localStorage.removeItem("userRole");
      }
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const assignedRole: Role = adminEmails.includes(email) ? "admin" : "student";
    setRole(assignedRole);
    localStorage.setItem("userRole", assignedRole);
    setUser(res.user);
  };

  const login = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const assignedRole: Role = adminEmails.includes(email) ? "admin" : "student";
    setRole(assignedRole);
    localStorage.setItem("userRole", assignedRole);
    setUser(res.user);
  };

  const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, provider);
    const email = res.user.email || "";
    const assignedRole: Role = adminEmails.includes(email) ? "admin" : "student";
    setRole(assignedRole);
    localStorage.setItem("userRole", assignedRole);
    setUser(res.user);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        signup,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
