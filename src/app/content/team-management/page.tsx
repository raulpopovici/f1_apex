"use client";

import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";

export default function TeamManagementPage() {
  const { user, isTeam } = useUser();

  if (!isTeam) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Access denied. Teams only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full py-4 text-center border-b border-gray-700 sticky top-0 bg-black z-50">
        <h1 className="text-2xl font-bold">Team Management</h1>
      </div>

      <div className="px-4 py-6 mb-24">
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="font-semibold text-white mb-2">
              Welcome, {user?.username}!
            </h3>
            <p className="text-gray-400 text-sm">
              Manage your F1 team operations from here
            </p>
          </div>

          {/* Drivers Section */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-white mb-3">Driver Lineup</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
                <div>
                  <p className="text-white font-medium">Driver #44</p>
                  <p className="text-gray-400 text-sm">Lewis Hamilton</p>
                </div>
                <div className="text-right">
                  <p className="text-green-500 text-sm">Active</p>
                  <p className="text-gray-400 text-xs">156 pts</p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
                <div>
                  <p className="text-white font-medium">Driver #63</p>
                  <p className="text-gray-400 text-sm">George Russell</p>
                </div>
                <div className="text-right">
                  <p className="text-green-500 text-sm">Active</p>
                  <p className="text-gray-400 text-xs">143 pts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Operations */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-white mb-3">Team Operations</h4>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-gray-600 text-white">
                Car Setup
              </Button>
              <Button variant="outline" className="border-gray-600 text-white">
                Strategy
              </Button>
              <Button variant="outline" className="border-gray-600 text-white">
                Pit Crew
              </Button>
              <Button variant="outline" className="border-gray-600 text-white">
                Engineers
              </Button>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-white mb-3">Upcoming Events</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white">Team Meeting</span>
                <span className="text-gray-400">Dec 5 • 10:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Car Development Review</span>
                <span className="text-gray-400">Dec 6 • 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Practice Session</span>
                <span className="text-gray-400">Dec 6 • 2:30 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-white mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Post Team Update
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Schedule Press Conference
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                View Team Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
