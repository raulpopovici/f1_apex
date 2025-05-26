// components/PostCard.tsx
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useState } from "react";

export function ChatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
      />
    </svg>
  );
}

export function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}

export function HeartIconFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="red"
      className="size-6"
    >
      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
    </svg>
  );
}

type Comment = { text: string; user: string; timestamp: string };

interface PostCardProps {
  avatarUrl: string | StaticImageData;
  username: string;
  isVerified?: boolean;
  timestamp: string;
  content: string;
  imageUrl?: string | StaticImageData;
  likes: number;
  replies: number;
  likedPost?: boolean;
}

export function PostCard({
  avatarUrl,
  username,
  isVerified,
  timestamp,
  content,
  likes,
  replies,
  imageUrl,
  likedPost = false,
}: PostCardProps) {
  const [liked, setLiked] = useState<boolean>(likedPost ?? false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      text: "This car is 🔥",
      user: "Max",
      timestamp: "10:01 AM",
    },
    {
      text: "Charles drove like a beast.",
      user: "Anna",
      timestamp: "10:03 AM",
    },
    {
      text: "Where can I get that helmet?",
      user: "Luca",
      timestamp: "10:05 AM",
    },
  ]);

  return (
    <div className="flex px-4 py-6 gap-4 border-b border-gray-800">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Image
          src={avatarUrl}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      {/* Post Content */}
      <div className="flex-1 flex flex-col space-y-3">
        {/* Header */}
        <div className="flex justify-between items-center font-semibold text-sm">
          <div className="flex items-center gap-2">
            <span>{username}</span>
            {isVerified && <span className="text-blue-500">✔️</span>}
          </div>
          <span className="text-xs text-gray-400">{timestamp}</span>
        </div>

        {/* Text */}
        <p className="text-sm text-white">{content}</p>

        {/* Image */}
        {imageUrl && (
          <div className="rounded-xl overflow-hidden">
            <Image
              src={imageUrl}
              alt="post image"
              width={500}
              height={300}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-6 text-gray-400 text-sm">
          {/* Comment */}
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-blue-400"
            onClick={() => setCommentsOpen(!commentsOpen)}
          >
            <ChatIcon className="w-4 h-4" />
            <span>{replies} replies</span>
          </div>

          {/* Like */}
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors"
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <HeartIconFilled className="w-4 h-4 text-red-500" />
            ) : (
              <HeartIcon className="w-4 h-4" />
            )}
            <span>{liked ? likes + 1 : likes} likes</span>
          </div>
        </div>

        {commentsOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-end justify-center">
            {/* Backdrop close */}
            <div
              className="absolute inset-0"
              onClick={() => setCommentsOpen(false)}
            />

            {/* Modal content */}
            <div className="relative z-10 w-full max-w-md h-[80vh] bg-neutral-900 rounded-t-xl shadow-xl flex flex-col">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">Comments</h2>
                <button
                  onClick={() => setCommentsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Comments */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
                {comments.map((comment, index) => (
                  <div key={index} className="space-y-1 mb-5">
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`font-semibold ${
                          comment.user === "You" ? "text-red-500" : "text-white"
                        }`}
                      >
                        {comment.user}
                      </span>
                      <span className="text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-snug break-words">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-gray-700">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-md outline-none placeholder:text-gray-400"
                />
                <button
                  onClick={() => {
                    if (newComment.trim()) {
                      const newEntry: Comment = {
                        text: newComment.trim(),
                        user: "You",
                        timestamp: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                      };
                      setComments((prev) => [...prev, newEntry]);
                      setNewComment("");
                    }
                  }}
                  className="mt-2 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
