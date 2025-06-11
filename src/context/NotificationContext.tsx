"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { useNotifications } from "../hooks/useNotifications";

interface UserDto {
  favoriteTeams: string[];
  favoriteDrivers: string[];
  role?: "user" | "driver" | "team";
}

interface NotificationContextType {
  isConnected: boolean;
  notifications: any[];
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
  apiBaseUrl: string;
  accessToken?: string;
  user?: UserDto;
}

export const NotificationProvider = ({
  children,
  apiBaseUrl,
  accessToken,
  user,
}: NotificationProviderProps) => {
  const notificationService = useNotifications({
    apiBaseUrl,
    accessToken,
    userRole: user?.role,
  });

  useEffect(() => {
    const initializeNotifications = async () => {
      // First, establish the connection
      await notificationService.connect();

      // Wait for connection to be established (with timeout)
      const maxWaitTime = 5000; // 5 seconds max wait
      const checkInterval = 100; // check every 100ms
      let waitTime = 0;

      while (!notificationService.isConnected && waitTime < maxWaitTime) {
        await new Promise((resolve) => setTimeout(resolve, checkInterval));
        waitTime += checkInterval;
      }

      if (user && notificationService.isConnected) {
        console.log("Starting topic subscriptions for user:", user);

        // Auto-subscribe to user's favorite teams
        for (const teamId of user.favoriteTeams) {
          await notificationService.subscribe(teamId);
        }

        // Auto-subscribe to user's favorite drivers
        for (const driverId of user.favoriteDrivers) {
          await notificationService.subscribe(driverId);
        }

        // Subscribe to F1 session types
        await notificationService.subscribe("fp1");
        await notificationService.subscribe("fp2");
        await notificationService.subscribe("fp3");
        await notificationService.subscribe("qualifying");
        await notificationService.subscribe("race");

        console.log("All topic subscriptions completed");
      } else if (!notificationService.isConnected) {
        console.error(
          "Failed to establish SignalR connection within timeout period"
        );
      } else {
        console.log("Skipping subscriptions - no user provided");
      }
    };

    initializeNotifications();
  }, [user, notificationService]);

  return (
    <NotificationContext.Provider value={notificationService}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};
