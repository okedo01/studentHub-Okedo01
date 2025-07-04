// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   type ReactNode,
// } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   signInWithPopup,
//   GoogleAuthProvider,
//   type User as FirebaseUser,
// } from "firebase/auth";
// import { auth } from "./Firebase/Firebase";

// // Define user type
// type AuthContextType = {
//   user: FirebaseUser | null;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (email: string, password: string) => Promise<void>;
//   loginWithGoogle: () => Promise<void>;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// const provider = new GoogleAuthProvider();

// const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<FirebaseUser | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       setUser(firebaseUser);
//     });
//     return unsubscribe;
//   }, []);

//   const signup = async (email: string, password: string) => {
//     await createUserWithEmailAndPassword(auth, email, password);
//   };

//   const login = async (email: string, password: string) => {
//     await signInWithEmailAndPassword(auth, email, password);
//   };

//   const loginWithGoogle = async () => {
//     await signInWithPopup(auth, provider);
//   };

//   const logout = async () => {
//     await signOut(auth);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         signup,
//         login,
//         loginWithGoogle,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;



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

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);

      // Load role from localStorage if exists
      const storedRole = localStorage.getItem("userRole") as Role | null;
      setRole(storedRole);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const assignedRole: Role = email === "eliahmwelangi01@gmail.com" ? "admin" : "student";
    setRole(assignedRole);
    localStorage.setItem("userRole", assignedRole);
    setUser(res.user);
  };

  const login = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const assignedRole: Role = email === "admin@studenthub.com" ? "admin" : "student";
    setRole(assignedRole);
    localStorage.setItem("userRole", assignedRole);
    setUser(res.user);
  };

  const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, provider);
    const assignedRole: Role = "student"; // Google login defaults to student
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
