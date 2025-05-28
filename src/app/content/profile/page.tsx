const user = {
  name: "Andreea",
  username: "andreea_miculescu",
  followers: 100,
  avatar: "/assets/andreea.jpg",
  supportsTeams: ["Mercedes-AMG Petronas Team", "Scuderia Ferrari", "McLaren"],
  supportsDrivers: [44, 16, 81, 55, 4],
};

import Image from "next/image";

export default function ProfilePage() {
  const user = {
    name: "Andreea",
    username: "andreea_miculescu",
    followers: 100,
    avatar: "/assets/andreea.jpg",
    supportsTeams: [
      "Mercedes-AMG Petronas Team",
      "Scuderia Ferrari",
      "McLaren",
    ],
    supportsDrivers: [44, 16, 81, 55, 4],
  };

  return (
    <div className="min-h-screen bg-black text-white pb-12 pt-16">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-gray-400">@{user.username}</p>
            <p className="text-sm mt-1">
              <span className="font-medium">{user.followers}</span> followers
            </p>
          </div>

          <Image
            src={user.avatar}
            alt={user.name}
            width={56}
            height={56}
            className="rounded-full border-2 border-white"
          />
        </div>

        {/* Support info */}
        <div className="mt-4 space-y-2 text-sm text-white">
          <div>
            <span className="font-semibold">Supports teams:</span>
            <br />
            {user.supportsTeams.map((team) => (
              <div key={team}>{team}</div>
            ))}
          </div>
          <div>
            <span className="font-semibold">Supports drivers:</span>
            <br />
            {user.supportsDrivers.join(", ")}
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
        You haven’t reposted anything yet.
      </div>
    </div>
  );
}
