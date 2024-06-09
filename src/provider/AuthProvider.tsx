import { useEffect, useState, ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebaseSetup";
import { onAuthStateChanged, User } from "firebase/auth";

// Define the props interface, including children
interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  setUserData: Function;
  userData: {
    nama: string;
    nim: string;
    email: string;
    password: string;
    ipk: number;
  };
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState({
    nama: "Gauss Seidel",
    nim: "0000000000",
    email:"dummymail@binus.ac.id",
    password: "xyz123",
    ipk: 0,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{userData, user, setUserData}}>{children}</AuthContext.Provider>;
};
