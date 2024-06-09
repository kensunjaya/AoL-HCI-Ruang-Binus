import React from "react";
import "firebase/auth";
import { User } from "firebase/auth";

export const AuthContext = React.createContext<User | null>(null);