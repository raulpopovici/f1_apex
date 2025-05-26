"use client";

import { PostCard } from "../../components/post-card";
import ferrari from "../../assets/ferrari.svg";

export default function FeedPage() {
  const posts = [
    {
      avatarUrl: ferrari,
      username: "@scuderiaferrari",
      isVerified: true,
      timestamp: "1h",
      content: "It’s not just about speed — it’s about precision. 🏎️",
      imageUrl: undefined,
      likes: 18400,
      replies: 512,
      liked: true,
    },

    {
      avatarUrl: ferrari,
      username: "@scuderiaferrari",
      isVerified: true,
      timestamp: "5h",
      content: "Behind every lap, there’s a team giving it all. ❤️",
      imageUrl: undefined,
      likes: 9200,
      replies: 331,
      liked: false,
    },
    {
      avatarUrl: ferrari,
      username: "@scuderiaferrari",
      isVerified: true,
      timestamp: "5h",
      content: "Behind every lap, there’s a team giving it all. ❤️",
      imageUrl: undefined,
      likes: 9200,
      replies: 331,
      liked: false,
    },
    {
      avatarUrl: ferrari,
      username: "@scuderiaferrari",
      isVerified: true,
      timestamp: "5h",
      content: "Behind every lap, there’s a team giving it all. ❤️",
      imageUrl: undefined,
      likes: 9200,
      replies: 331,
      liked: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full py-4 text-center border-b border-gray-700 sticky top-0 bg-black z-50">
        <h1 className="text-2xl font-bold">Keep the Apex</h1>
      </div>

      <div className="flex flex-col mb-24">
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
}
