"use client";

import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { apiService, UserDto } from "@/services/apiService";

export default function ProfilePage() {
  const { user, logout } = useUser();
  const router = useRouter();
  const [followedUsersData, setFollowedUsersData] = useState<UserDto[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    const fetchFollowedUsersData = async () => {
      if (
        !user ||
        (!user.favoriteTeams.length && !user.favoriteDrivers.length)
      ) {
        return;
      }

      try {
        setIsLoadingData(true);
        const allUsers = await apiService.getAllUsers();

        // Filter to only get the users that are in the current user's favorites
        const allFavoriteIds = [...user.favoriteTeams, ...user.favoriteDrivers];
        const followedUsers = allUsers.filter((apiUser) =>
          allFavoriteIds.includes(apiUser.userId)
        );

        setFollowedUsersData(followedUsers);
      } catch (error) {
        console.error("Failed to fetch followed users data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchFollowedUsersData();
  }, [user?.favoriteTeams, user?.favoriteDrivers]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Please log in to view your profile.</p>
      </div>
    );
  }

  const followedTeams = followedUsersData.filter((u) => u.role === "team");
  const followedDrivers = followedUsersData.filter((u) => u.role === "driver");

  return (
    <div className="min-h-screen bg-black text-white pb-12 pt-16">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{user.username}</h1>
            <p className="text-gray-400">@{user.username}</p>
            <p className="text-sm mt-1">
              <span className="font-medium">0</span> followers
            </p>
          </div>

          <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Support info */}
        <div className="mt-4 space-y-2 text-sm text-white">
          <div>
            <span className="font-semibold">Following teams:</span>
            <br />
            {isLoadingData ? (
              <div className="text-gray-400 italic">Loading...</div>
            ) : followedTeams.length > 0 ? (
              followedTeams.map((team) => (
                <div key={team.userId} className="flex items-center gap-2">
                  <span className="text-purple-500">🏆</span>
                  <span>{team.username}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-400 italic">No teams followed yet</div>
            )}
          </div>
          <div>
            <span className="font-semibold">Following drivers:</span>
            <br />
            {isLoadingData ? (
              <div className="text-gray-400 italic">Loading...</div>
            ) : followedDrivers.length > 0 ? (
              followedDrivers.map((driver) => (
                <div key={driver.userId} className="flex items-center gap-2">
                  <span className="text-green-500">🏁</span>
                  <span>{driver.username}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-400 italic">
                No drivers followed yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex text-sm text-gray-400 border-b border-gray-700 mt-4 px-4">
        <div className="pb-2 border-b-2 border-white text-white font-semibold">
          Reposts
        </div>
      </div>

      {/* Reposts Feed Placeholder */}
      <div className="px-4 py-6 text-center text-gray-500 text-sm">
        You haven't reposted anything yet.
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-8">
        <Button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 text-lg"
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
