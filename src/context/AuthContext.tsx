import { createContext } from "react";
import "firebase/auth";
import { User } from "firebase/auth";

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
  category: string;
  setCategory: Function;
  forumContent: any;
  setForumContent: Function;
}


export const AuthContext = createContext<AuthContextType | null>(null);