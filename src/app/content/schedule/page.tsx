"use client";

import { useUser } from "@/hooks/useUser";

export default function SchedulePage() {
  const { user, isDriver } = useUser();

  if (!isDriver) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Access denied. Drivers only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full py-4 text-center border-b border-gray-700 sticky top-0 bg-black z-50">
        <h1 className="text-2xl font-bold">Race Schedule</h1>
      </div>

      <div className="px-4 py-6 mb-24">
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="font-semibold text-white mb-2">
              Welcome, {user?.username}!
            </h3>
            <p className="text-gray-400 text-sm">
              This is your personalized race schedule. Here you can view:
            </p>
            <ul className="text-gray-400 text-sm mt-2 list-disc list-inside">
              <li>Upcoming race weekends</li>
              <li>Practice session times</li>
              <li>Qualifying schedules</li>
              <li>Media obligations</li>
              <li>Team meetings</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-red-500 mb-1">Next Race</h4>
            <p className="text-white font-medium">Abu Dhabi Grand Prix</p>
            <p className="text-gray-400 text-sm">
              December 8, 2024 • Yas Marina Circuit
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-yellow-500 mb-1">This Week</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white">Friday Practice</span>
                <span className="text-gray-400">Dec 6 • 2:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Qualifying</span>
                <span className="text-gray-400">Dec 7 • 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Race Day</span>
                <span className="text-gray-400">Dec 8 • 2:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
