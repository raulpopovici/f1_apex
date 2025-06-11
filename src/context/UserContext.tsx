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
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      // For demo - you can set different roles here for testing
      const savedRole = localStorage.getItem("userRole") || "user";

      // Set different hardcoded users based on role
      let hardcodedUser: User;

      if (savedRole === "driver") {
        hardcodedUser = {
          userId: "driver-123",
          username: "lewis_hamilton",
          role: "driver",
          favoriteTeams: [],
          favoriteDrivers: [],
          repostedPostIds: [],
          likedPostIds: [],
          avatarUrl: "/assets/lewis-avatar.jpg",
        };
      } else if (savedRole === "team") {
        hardcodedUser = {
          userId: "team-ferrari",
          username: "scuderiaferrari",
          role: "team",
          favoriteTeams: [],
          favoriteDrivers: [],
          repostedPostIds: [],
          likedPostIds: [],
          avatarUrl: "/assets/ferrari-avatar.jpg",
        };
      } else {
        // Use the specific hardcoded user "andreea"
        hardcodedUser = {
          userId: "ra0001",
          username: "andreea",
          role: "user",
          favoriteTeams: ["ferrari", "mclaren"], // Using lowercase IDs to match our component
          favoriteDrivers: ["Hamilton", "Piastri"],
          repostedPostIds: [],
          likedPostIds: [],
          avatarUrl: "/assets/user-avatar.jpg",
        };
      }

      setUser(hardcodedUser);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Accept any non-empty email and password for demo purposes
    if (email.trim() && password.trim()) {
      // For demo, determine role based on email domain or specific emails
      let role: "user" | "driver" | "team" = "user";

      if (email.includes("@f1.com") || email.includes("driver")) {
        role = "driver";
      } else if (email.includes("@team.com") || email.includes("team")) {
        role = "team";
      }

      let hardcodedUser: User;

      if (role === "driver") {
        hardcodedUser = {
          userId: "driver-123",
          username: "lewis_hamilton",
          role: "driver",
          favoriteTeams: [],
          favoriteDrivers: [],
          repostedPostIds: [],
          likedPostIds: [],
          avatarUrl: "/assets/lewis-avatar.jpg",
        };
      } else if (role === "team") {
        hardcodedUser = {
          userId: "team-ferrari",
          username: "scuderiaferrari",
          role: "team",
          favoriteTeams: [],
          favoriteDrivers: [],
          repostedPostIds: [],
          likedPostIds: [],
          avatarUrl: "/assets/ferrari-avatar.jpg",
        };
      } else {
        // Use the specific hardcoded user "andreea"
        hardcodedUser = {
          userId: "ra0001",
          username: "andreea",
          role: "user",
          favoriteTeams: ["ferrari", "mclaren"], // Using lowercase IDs to match our component
          favoriteDrivers: ["Hamilton", "Piastri"],
          repostedPostIds: [],
          likedPostIds: [],
          avatarUrl: "/assets/user-avatar.jpg",
        };
      }

      setUser(hardcodedUser);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", role);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
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
      setUser((prevUser) =>
        prevUser
          ? {
              ...prevUser,
              favoriteTeams,
              favoriteDrivers,
            }
          : null
      );

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
        logout,
        updateFavorites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
