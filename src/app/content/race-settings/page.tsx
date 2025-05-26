'use client';

import { EllipsisIcon } from "@/components/icons/ellipsis-icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const sessions = [
  "Practice 1",
  "Practice 2",
  "Practice 3",
  "Sprint",
  "Qualifications",
  "Race",
];

const teams = [
  "Team",
  "Ferrari",
  "Red Bull",
  "Mercedes",
  "McLaren",
  "Aston Martin",
];

export default function GpSettingsPage() {
  const [selectedTeams, setSelectedTeams] = useState<{ [key: string]: string }>(
    {}
  );

  const handleTeamChange = (session: string, team: string) => {
    setSelectedTeams((prev) => ({ ...prev, [session]: team }));
  };

  return (
    <div className="h-[100dvh] bg-black text-white px-4 pt-16 pb-24">
      <div className="flex justify-between items-center mb-6">
        <div></div>
       <EllipsisIcon className="w-6 h-6 text-white" />
      </div>
      <h1 className="text-red-600 font-bold text-lg mb-6">
        For X Grand Prix
      </h1>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div key={session} className="flex items-center justify-between">
            <span className="font-semibold">{session}</span>
            <Select
              value={selectedTeams[session] || "Team"}
              onValueChange={(value) => handleTeamChange(session, value)}
            >
              <SelectTrigger className="w-[140px] bg-white text-black h-8 px-2 py-0 text-sm">
                <SelectValue placeholder="Team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}
