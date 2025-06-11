import { useNotificationContext } from "../context/NotificationContext";

export const NotificationList = () => {
  const { notifications, clearNotifications, isConnected } =
    useNotificationContext();

  return (
    <div className="notification-list h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Live Notifications</h3>
        <div className="flex items-center gap-2">
          <span
            className={`text-sm ${
              isConnected ? "text-green-400" : "text-red-400"
            }`}
          >
            {isConnected ? "🟢" : "🔴"}
          </span>
          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-400">No notifications yet...</p>
      ) : (
        <div className="space-y-3 h-fulloverflow-y-auto">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg p-3 bg-gray-800 shadow-sm"
            >
              <h4 className="font-semibold text-white">{notification.title}</h4>
              <p className="text-sm text-gray-300 mt-1">{notification.body}</p>
              {notification.data && (
                <div className="mt-2 text-xs text-gray-400">
                  Additional data: {JSON.stringify(notification.data)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
