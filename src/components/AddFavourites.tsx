"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface F1Team {
  id: string;
  name: string;
  fullName: string;
  color: string;
  logo?: string;
}

const f1Teams: F1Team[] = [
  {
    id: "ferrari",
    name: "Ferrari",
    fullName: "Scuderia Ferrari",
    color: "#DC143C",
  },
  {
    id: "mercedes",
    name: "Mercedes",
    fullName: "Mercedes-AMG Petronas F1 Team",
    color: "#00D2BE",
  },
  {
    id: "redbull",
    name: "Red Bull",
    fullName: "Oracle Red Bull Racing",
    color: "#0600EF",
  },
  {
    id: "mclaren",
    name: "McLaren",
    fullName: "McLaren Formula 1 Team",
    color: "#FF8700",
  },
  {
    id: "aston_martin",
    name: "Aston Martin",
    fullName: "Aston Martin Aramco Cognizant F1 Team",
    color: "#006F62",
  },
  {
    id: "alpine",
    name: "Alpine",
    fullName: "BWT Alpine F1 Team",
    color: "#0090FF",
  },
  {
    id: "williams",
    name: "Williams",
    fullName: "Williams Racing",
    color: "#005AFF",
  },
  {
    id: "alphatauri",
    name: "RB",
    fullName: "Visa Cash App RB Formula One Team",
    color: "#6692FF",
  },
  {
    id: "kick_sauber",
    name: "Kick Sauber",
    fullName: "Stake F1 Team Kick Sauber",
    color: "#52E252",
  },
  {
    id: "haas",
    name: "Haas",
    fullName: "MoneyGram Haas F1 Team",
    color: "#FFFFFF",
  },
];

export function AddFavourites() {
  const [followedTeams, setFollowedTeams] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load followed teams from localStorage
    const saved = localStorage.getItem("followedTeams");
    if (saved) {
      setFollowedTeams(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleFollow = (teamId: string) => {
    const newFollowedTeams = new Set(followedTeams);

    if (newFollowedTeams.has(teamId)) {
      newFollowedTeams.delete(teamId);
    } else {
      newFollowedTeams.add(teamId);
    }

    setFollowedTeams(newFollowedTeams);
    localStorage.setItem(
      "followedTeams",
      JSON.stringify(Array.from(newFollowedTeams))
    );
  };

  const isFollowing = (teamId: string) => followedTeams.has(teamId);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Follow F1 Teams</h2>
        <p className="text-sm text-gray-400">
          {followedTeams.size} team{followedTeams.size !== 1 ? "s" : ""}{" "}
          followed
        </p>
      </div>

      <div className="grid gap-3">
        {f1Teams.map((team) => (
          <Card key={team.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Team Color Indicator */}
                  <div
                    className="w-4 h-4 rounded-full border border-gray-600"
                    style={{ backgroundColor: team.color }}
                  />
                  <div>
                    <h3 className="font-semibold text-white">{team.name}</h3>
                    <p className="text-sm text-gray-400">{team.fullName}</p>
                  </div>
                </div>

                <Button
                  onClick={() => toggleFollow(team.id)}
                  variant={isFollowing(team.id) ? "outline" : "default"}
                  className={`
                    ${
                      isFollowing(team.id)
                        ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }
                  `}
                >
                  {isFollowing(team.id) ? "Following" : "Follow"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {followedTeams.size > 0 && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">
            Your Followed Teams:
          </h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(followedTeams).map((teamId) => {
              const team = f1Teams.find((t) => t.id === teamId);
              return team ? (
                <span
                  key={teamId}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded-full flex items-center space-x-2"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: team.color }}
                  />
                  <span>{team.name}</span>
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
