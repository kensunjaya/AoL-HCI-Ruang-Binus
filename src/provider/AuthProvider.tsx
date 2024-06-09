import { useEffect, useState, ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebaseSetup";
import { onAuthStateChanged, User } from "firebase/auth";

// Define the props interface, including children
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
