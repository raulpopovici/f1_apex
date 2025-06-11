"use client";

import { ReactNode } from "react";
import { UserProvider } from "@/context/UserContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { useUser } from "@/hooks/useUser";

function NotificationWrapper({ children }: { children: ReactNode }) {
  const { user } = useUser();

  // Convert user data to format expected by NotificationProvider
  const userData = user
    ? {
        favoriteTeams: user.favoriteTeams,
        favoriteDrivers: user.favoriteDrivers,
        role: user.role,
      }
    : undefined;

  return (
    <NotificationProvider apiBaseUrl="http://localhost:5047" user={userData}>
      {children}
    </NotificationProvider>
  );
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <NotificationWrapper>{children}</NotificationWrapper>
    </UserProvider>
  );
}
