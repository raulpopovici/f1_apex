"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { apiService } from "@/services/apiService";

export type User = {
  userId: string;
  username: string;
  role: "user" | "driver" | "team";
  favoriteTeams: string[];
  favoriteDrivers: string[];
  repostedPostIds: string[];
  likedPostIds: string[];
  avatarUrl?: string;
};

export type UserContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isDriver: boolean;
  isTeam: boolean;
  isRegularUser: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    fullName: string,
    email: string,
    password: string,
    role?: string
  ) => Promise<boolean>;
  logout: () => void;
  updateFavorites: (
    favoriteTeams: string[],
    favoriteDrivers: string[]
  ) => Promise<void>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error("Failed to parse saved user data:", error);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const userData = await apiService.login(email, password);

      const user: User = {
        userId: userData.userId,
        username: userData.username,
        role: userData.role as "user" | "driver" | "team",
        favoriteTeams: userData.favoriteTeams || [],
        favoriteDrivers: userData.favoriteDrivers || [],
        repostedPostIds: userData.repostedPostIds || [],
        likedPostIds: userData.likedPostIds || [],
        avatarUrl: `/assets/${userData.role}-avatar.jpg`,
      };

      setUser(user);

      localStorage.setItem("currentUser", JSON.stringify(user));

      console.log("Login successful:", user);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
    role: string = "user"
  ): Promise<boolean> => {
    try {
      const userData = await apiService.register(
        fullName,
        email,
        password,
        role
      );

      // Convert API response to our User type
      const user: User = {
        userId: userData.userId,
        username: userData.username,
        role: userData.role as "user" | "driver" | "team",
        favoriteTeams: userData.favoriteTeams || [],
        favoriteDrivers: userData.favoriteDrivers || [],
        repostedPostIds: userData.repostedPostIds || [],
        likedPostIds: userData.likedPostIds || [],
        avatarUrl: `/assets/${userData.role}-avatar.jpg`,
      };

      setUser(user);

      // Save user data to localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));

      console.log("Registration successful:", user);
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const updateFavorites = async (
    favoriteTeams: string[],
    favoriteDrivers: string[]
  ): Promise<void> => {
    if (!user) {
      throw new Error("User not logged in");
    }

    try {
      // Call the API to update favorites
      await apiService.updateFavorites(user.userId, {
        favoriteTeams,
        favoriteDrivers,
      });

      // Update the local user state
      const updatedUser = {
        ...user,
        favoriteTeams,
        favoriteDrivers,
      };

      setUser(updatedUser);

      // Update localStorage
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      console.log("Favorites updated successfully");
    } catch (error) {
      console.error("Failed to update favorites:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isDriver: user?.role === "driver",
        isTeam: user?.role === "team",
        isRegularUser: user?.role === "user",
        login,
        register,
        logout,
        updateFavorites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
