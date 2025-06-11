import { useState, useEffect, useCallback, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { toast } from "sonner";

interface NotificationPayload {
  title: string;
  body: string;
  data?: any;
}

interface UseNotificationsProps {
  apiBaseUrl: string;
  accessToken?: string;
  userRole?: "user" | "driver" | "team";
}

export const useNotifications = ({
  apiBaseUrl,
  accessToken,
  userRole,
}: UseNotificationsProps) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);

  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiBaseUrl}/hubs/notifications`, {
        accessTokenFactory: () => accessToken || "",
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      })
      .withAutomaticReconnect()
      .build();

    hubConnection.on("ReceiveNotification", (payload: NotificationPayload) => {
      setNotifications((prev) => [payload, ...prev]);

      // Only show toast notifications for regular users
      if (userRole === "user") {
        toast(payload.title, {
          description: payload.body,
          duration: 5000,
          icon: "🏁",
          action: {
            label: "Dismiss",
            onClick: () => {},
          },
        });
      }
    });

    hubConnection.onclose(() => setIsConnected(false));
    hubConnection.onreconnected(() => setIsConnected(true));

    setConnection(hubConnection);

    return () => {
      hubConnection.stop();
    };
  }, [apiBaseUrl, accessToken, userRole]);

  const connect = useCallback(async () => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Disconnected
    ) {
      try {
        await connection.start();
        setIsConnected(true);
      } catch (error) {
        console.error("Failed to connect to SignalR hub:", error);
      }
    }
  }, [connection]);

  const subscribe = useCallback(
    async (topic: string) => {
      if (connection && isConnected) {
        try {
          await connection.invoke("Subscribe", topic);
        } catch (error) {
          console.error(`Failed to subscribe to topic ${topic}:`, error);
        }
      }
    },
    [connection, isConnected]
  );

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    isConnected,
    notifications,
    connect,
    subscribe,
    clearNotifications,
  };
};
