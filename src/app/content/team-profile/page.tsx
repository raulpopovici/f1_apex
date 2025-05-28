"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { VerifiedCheckIcon } from "@/components/icons/verified-icon";
import { EllipsisIcon } from "@/components/icons/ellipsis-icon";
import { ChatBubbleLeftIcon } from "@/components/icons/chat-bubble-left-icon";
import { HeartIcon } from "@/components/icons/heart-icon";
import { ArrowPathRoundedSquareIcon } from "@/components/icons/arrow-square-icon";
import { PaperAirplaneIcon } from "@/components/icons/paper-airplane-icon";

const posts = [
  {
    id: 1,
    content: "10 million sign ups in seven hours.",
    time: "33m",
    replies: 26,
    likes: 112,
  },
  {
    id: 2,
    content: "Just passed 5 million sign ups in the first four hours...",
    time: "7h",
    replies: 26,
    likes: 112,
  },
  {
    id: 3,
    content: "Threads just passed 2 million sign ups in the first two hours.",
    time: "9h",
    replies: 26,
    likes: 112,
  },
];

export default function TeamProfilePage() {
  return (
    <div className="bg-black text-white min-h-screen pt-16 pb-24 px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Scuderia Ferrari</h1>
          <p className="text-gray-300 text-sm flex items-center gap-1">
            scuderiaferrari
            <VerifiedCheckIcon className="w-4 h-4 text-red-500" />
          </p>
          <div className="flex items-center mt-2 space-x-1">
            {/* Example avatars */}
            {[1, 2, 3].map((i) => (
              <Image
                key={i}
                src="/ferrari-icon.png"
                alt="Follower"
                width={20}
                height={20}
                className="rounded-full border-2 border-black"
              />
            ))}
            <p className="text-sm text-gray-400 ml-2">412k followers</p>
          </div>
        </div>
        <Image
          src="/ferrari-icon.png"
          alt="Team Logo"
          width={64}
          height={64}
          className="rounded-full"
        />
      </div>
      <Button className="w-full bg-red-600 text-white mt-4">Follow</Button>
      <div className="flex justify-around mt-6 border-b border-zinc-700">
        <div className="py-2 border-b-2 border-white font-semibold">Posts</div>
        <div className="py-2 text-gray-500">Statistics</div>
      </div>

      <div className="mt-4 space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="border-b border-zinc-800 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Image
                  src="/ferrari-icon.png"
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="flex items-center gap-1 font-bold text-sm">
                    scuderiaferrari
                    <VerifiedCheckIcon className="w-4 h-4 text-red-500" />
                    <span className="text-gray-500 font-normal ml-1 text-xs">
                      {post.time}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{post.content}</p>
                </div>
              </div>
              <EllipsisIcon className="w-5 h-5 text-white" />
            </div>

            <div className="flex items-center justify-around text-gray-400 text-sm mt-4 px-6">
              <ChatBubbleLeftIcon className="w-4 h-4" />
              <ArrowPathRoundedSquareIcon className="w-4 h-4" />
              <HeartIcon className="w-4 h-4" />
              <PaperAirplaneIcon className="w-4 h-4" />
            </div>

            <div className="text-xs text-gray-500 mt-2 ml-12">
              {post.replies} replies • {post.likes} likes
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
