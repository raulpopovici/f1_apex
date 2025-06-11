"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { useNotifications } from "../hooks/useNotifications";

interface UserDto {
  favoriteTeams: string[];
  favoriteDrivers: string[];
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
  const notificationService = useNotifications({ apiBaseUrl, accessToken });

  useEffect(() => {
    const initializeNotifications = async () => {
      await notificationService.connect();

      if (user) {
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
