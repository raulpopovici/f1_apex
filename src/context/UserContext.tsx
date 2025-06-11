"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type UserContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      // Set the hardcoded user
      const hardcodedUser = {
        id: "f1-user-123",
        name: "Lewis Hamilton",
        email: "lewis.hamilton@f1.com",
        avatarUrl: "/assets/lewis-avatar.jpg",
      };
      setUser(hardcodedUser);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Accept any non-empty email and password for demo purposes
    if (email.trim() && password.trim()) {
      const hardcodedUser = {
        id: "f1-user-123",
        name: "Lewis Hamilton",
        email: "lewis.hamilton@f1.com",
        avatarUrl: "/assets/lewis-avatar.jpg",
      };

      setUser(hardcodedUser);
      localStorage.setItem("isLoggedIn", "true");
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
