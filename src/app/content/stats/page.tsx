"use client";

import { useUser } from "@/hooks/useUser";

export default function StatsPage() {
  const { user, isDriver, isTeam } = useUser();

  if (!isDriver && !isTeam) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Access denied. Drivers and Teams only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full py-4 text-center border-b border-gray-700 sticky top-0 bg-black z-50">
        <h1 className="text-2xl font-bold">
          {isDriver ? "Driver Stats" : "Team Stats"}
        </h1>
      </div>

      <div className="px-4 py-6 mb-24">
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="font-semibold text-white mb-2">
              {isDriver
                ? `${user?.username} Performance`
                : `${user?.username} Team Performance`}
            </h3>
            <p className="text-gray-400 text-sm">
              {isDriver
                ? "Track your racing performance and statistics"
                : "Monitor your team's performance across the season"}
            </p>
          </div>

          {isDriver ? (
            <>
              {/* Driver Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                  <p className="text-2xl font-bold text-red-500">156</p>
                  <p className="text-gray-400 text-sm">Points</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                  <p className="text-2xl font-bold text-green-500">P3</p>
                  <p className="text-gray-400 text-sm">Championship</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                  <p className="text-2xl font-bold text-yellow-500">2</p>
                  <p className="text-gray-400 text-sm">Wins</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                  <p className="text-2xl font-bold text-blue-500">5</p>
                  <p className="text-gray-400 text-sm">Podiums</p>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-white mb-2">
                  Recent Performance
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Las Vegas GP</span>
                    <span className="text-green-500">P2 (+18 pts)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Brazil GP</span>
                    <span className="text-yellow-500">P1 (+25 pts)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mexico GP</span>
                    <span className="text-blue-500">P3 (+15 pts)</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Team Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                  <p className="text-2xl font-bold text-red-500">342</p>
                  <p className="text-gray-400 text-sm">Team Points</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                  <p className="text-2xl font-bold text-green-500">P2</p>
                  <p className="text-gray-400 text-sm">Constructors</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                  <p className="text-2xl font-bold text-yellow-500">4</p>
                  <p className="text-gray-400 text-sm">Team Wins</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                  <p className="text-2xl font-bold text-blue-500">12</p>
                  <p className="text-gray-400 text-sm">Podiums</p>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-white mb-2">
                  Driver Performance
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Driver #1</span>
                    <span className="text-white">186 pts (P3)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Driver #2</span>
                    <span className="text-white">156 pts (P5)</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
