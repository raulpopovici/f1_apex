"use client";
import { useEffect, useState } from "react";
import { PostCard } from "../../components/post-card";
import ferrari from "../../assets/ferrari.svg";

type PostDto = {
  id: any;
  avatarUrl?: string;
  username: string;
  isVerified: boolean;
  timestamp: string;
  content: string;
  MediaUrl?: string;
  likes: number;
  replies: number;
  liked: boolean;
  mediaUrl: any;
  reposts: any;
};

export default function FeedPage() {
  const [posts1, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch("http://localhost:5047/api/feed");
        console.log("res is", res);
        if (!res.ok) throw new Error("Failed to fetch feed");
        const data = await res.json();
        setPosts(
          data.map((post: PostDto) => ({
            ...post,
            avatarUrl: post.avatarUrl || ferrari,
          }))
        );
      } catch (err) {
        console.error("Error fetching feed:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full py-4 text-center border-b border-gray-700 sticky top-0 bg-black z-50">
        <h1 className="text-2xl font-bold">Keep the Apex</h1>
      </div>

      <div className="flex flex-col mb-24">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8">No posts found.</div>
        ) : (
          posts1.map(
            (post, index) => (
              console.log("post is", post),
              (
                <PostCard
                  key={post.id || index}
                  {...post}
                  avatarUrl={post.avatarUrl ?? ferrari}
                  mediaUrl={post.mediaUrl ?? ""}
                />
              )
            )
          )
        )}
      </div>
    </div>
  );
}
