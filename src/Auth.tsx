import React, { useEffect, useState } from "react";
import { app } from "./firebase";

interface ChildrenObject {
    children: React.ReactNode
}

export const AuthContext = React.createContext<firebase.User | null>(null);

export const AuthProvider = ({ children }:ChildrenObject) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
    });
  }, []);

  return (
    <AuthContext.Provider
      value={
        currentUser
      }
    >
      {children}
    </AuthContext.Provider>
  );
};