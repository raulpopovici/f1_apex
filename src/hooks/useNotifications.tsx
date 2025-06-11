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
  const connectionRef = useRef<signalR.HubConnection | null>(null);

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

    hubConnection.onclose(() => {
      setIsConnected(false);
      console.log("SignalR connection closed");
    });

    hubConnection.onreconnected(() => {
      setIsConnected(true);
      console.log("SignalR reconnected");
    });

    connectionRef.current = hubConnection;
    setConnection(hubConnection);

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, [apiBaseUrl, accessToken, userRole]);

  const connect = useCallback(async () => {
    if (
      connectionRef.current &&
      connectionRef.current.state === signalR.HubConnectionState.Disconnected
    ) {
      try {
        console.log("Starting SignalR connection...");
        await connectionRef.current.start();
        setIsConnected(true);
        console.log("SignalR connected successfully");
      } catch (error) {
        console.error("Failed to connect to SignalR hub:", error);
        setIsConnected(false);
      }
    }
  }, []);

  const subscribe = useCallback(async (topic: string) => {
    if (!connectionRef.current) {
      console.error(`Cannot subscribe to ${topic}: No connection available`);
      return;
    }

    if (connectionRef.current.state !== signalR.HubConnectionState.Connected) {
      console.error(
        `Cannot subscribe to ${topic}: Connection not in Connected state (current: ${connectionRef.current.state})`
      );
      return;
    }

    try {
      console.log(`Subscribing to topic: ${topic}`);
      await connectionRef.current.invoke("Subscribe", topic);
      console.log(`Successfully subscribed to topic: ${topic}`);
    } catch (error) {
      console.error(`Failed to subscribe to topic ${topic}:`, error);
    }
  }, []);

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
