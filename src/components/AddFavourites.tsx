"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useUser } from "@/hooks/useUser";
import { apiService, UserDto } from "@/services/apiService";

interface FollowableUser {
  userId: string;
  username: string;
  role: "driver" | "team";
  displayName: string;
}

export function AddFavourites() {
  const { user, updateFavorites } = useUser();
  const [followableUsers, setFollowableUsers] = useState<FollowableUser[]>([]);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchFollowableUsers = async () => {
      try {
        setIsLoadingData(true);
        const allUsers = await apiService.getAllUsers();

        // Filter to only show drivers and teams
        const driversAndTeams = allUsers
          .filter(
            (apiUser) => apiUser.role === "driver" || apiUser.role === "team"
          )
          .map((apiUser) => ({
            userId: apiUser.userId,
            username: apiUser.username,
            role: apiUser.role as "driver" | "team",
            displayName: apiUser.username,
          }));

        setFollowableUsers(driversAndTeams);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchFollowableUsers();
  }, []);

  useEffect(() => {
    // Initialize with user's current favorites
    if (user) {
      const allFavorites = new Set([
        ...user.favoriteTeams,
        ...user.favoriteDrivers,
      ]);
      setFollowedUsers(allFavorites);
    }
  }, [user]);

  const toggleFollow = async (followableUser: FollowableUser) => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    setIsLoading(true);

    try {
      const newFollowedUsers = new Set(followedUsers);

      if (newFollowedUsers.has(followableUser.userId)) {
        newFollowedUsers.delete(followableUser.userId);
      } else {
        newFollowedUsers.add(followableUser.userId);
      }

      // Update local state immediately for better UX
      setFollowedUsers(newFollowedUsers);

      // Separate teams and drivers
      const teams: string[] = [];
      const drivers: string[] = [];

      Array.from(newFollowedUsers).forEach((userId) => {
        const followableUserData = followableUsers.find(
          (fu) => fu.userId === userId
        );
        if (followableUserData) {
          if (followableUserData.role === "team") {
            teams.push(userId);
          } else if (followableUserData.role === "driver") {
            drivers.push(userId);
          }
        }
      });

      // Keep existing favorites that aren't in our followableUsers list
      const existingTeams = user.favoriteTeams.filter(
        (teamId) =>
          !followableUsers.some(
            (fu) => fu.userId === teamId && fu.role === "team"
          )
      );
      const existingDrivers = user.favoriteDrivers.filter(
        (driverId) =>
          !followableUsers.some(
            (fu) => fu.userId === driverId && fu.role === "driver"
          )
      );

      // Call API to update favorites
      await updateFavorites(
        [...existingTeams, ...teams],
        [...existingDrivers, ...drivers]
      );
    } catch (error) {
      console.error("Failed to update favorites:", error);
      // Revert local state on error
      if (user) {
        const allFavorites = new Set([
          ...user.favoriteTeams,
          ...user.favoriteDrivers,
        ]);
        setFollowedUsers(allFavorites);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isFollowing = (userId: string) => followedUsers.has(userId);

  if (!user) {
    return (
      <div className="text-center text-gray-400">
        Please log in to manage your favorites.
      </div>
    );
  }

  if (isLoadingData) {
    return (
      <div className="text-center text-gray-400">
        Loading drivers and teams...
      </div>
    );
  }

  const drivers = followableUsers.filter((user) => user.role === "driver");
  const teams = followableUsers.filter((user) => user.role === "team");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Follow Drivers & Teams</h2>
        <p className="text-sm text-gray-400">{followedUsers.size} followed</p>
      </div>

      {drivers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <span className="text-green-500 mr-2">🏁</span>
            Drivers
          </h3>
          <div className="grid gap-3">
            {drivers.map((driver) => (
              <Card key={driver.userId} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                      <div>
                        <h4 className="font-semibold text-white">
                          {driver.displayName}
                        </h4>
                        <p className="text-sm text-gray-400">F1 Driver</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => toggleFollow(driver)}
                      disabled={isLoading}
                      variant={
                        isFollowing(driver.userId) ? "outline" : "default"
                      }
                      className={`
                        ${
                          isFollowing(driver.userId)
                            ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        }
                        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                      `}
                    >
                      {isLoading
                        ? "..."
                        : isFollowing(driver.userId)
                        ? "Following"
                        : "Follow"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {teams.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <span className="text-purple-500 mr-2">🏆</span>
            Teams
          </h3>
          <div className="grid gap-3">
            {teams.map((team) => (
              <Card key={team.userId} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-purple-500" />
                      <div>
                        <h4 className="font-semibold text-white">
                          {team.displayName}
                        </h4>
                        <p className="text-sm text-gray-400">F1 Team</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => toggleFollow(team)}
                      disabled={isLoading}
                      variant={isFollowing(team.userId) ? "outline" : "default"}
                      className={`
                        ${
                          isFollowing(team.userId)
                            ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        }
                        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                      `}
                    >
                      {isLoading
                        ? "..."
                        : isFollowing(team.userId)
                        ? "Following"
                        : "Follow"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {followableUsers.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          No drivers or teams available to follow.
        </div>
      )}

      {followedUsers.size > 0 && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">
            Your Followed Users:
          </h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(followedUsers).map((userId) => {
              const followedUser = followableUsers.find(
                (u) => u.userId === userId
              );
              return followedUser ? (
                <span
                  key={userId}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded-full flex items-center space-x-2"
                >
                  <span
                    className={
                      followedUser.role === "driver"
                        ? "text-green-300"
                        : "text-purple-300"
                    }
                  >
                    {followedUser.role === "driver" ? "🏁" : "🏆"}
                  </span>
                  <span>{followedUser.displayName}</span>
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
