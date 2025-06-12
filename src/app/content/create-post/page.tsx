"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifiedCheckIcon } from "@/components/icons/verified-icon";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ferrari from "@/assets/ferrari.svg";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const postSchema = z.object({
  content: z.string().min(1, "Post content is required"),
});

type PostFormData = z.infer<typeof postSchema>;

export default function CreatePostPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { user, logout } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5047/api/media/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to upload image");
      const url = await res.text();
      setMediaUrl(url.replace(/^"|"$/g, ""));
    } catch (err) {
      alert("Image upload failed");
      setPreview(null);
      setMediaUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: PostFormData) => {
    const payload = {
      ...data,
      mediaUrl: mediaUrl,
      AuthorId: user?.userId,
    };
    try {
      const res = await fetch("http://localhost:5047/api/posts", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create post");
      }

      router.push("/content");
      alert("Post created!");
    } catch (error) {
      alert("Error creating post");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-[100dvh] pt-16 pb-24 px-4 bg-black text-white overflow-y-auto"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={ferrari}
            alt="Ferrari"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1 font-bold text-base">
            scuderiaferrari
            <VerifiedCheckIcon className="w-4 h-4 text-red-500" />
          </div>
        </div>
      </div>

      <textarea
        {...register("content")}
        placeholder="Start a post..."
        className="w-full bg-black text-white border-none resize-none placeholder-gray-500 focus:outline-none focus:ring-0 text-sm"
        rows={6}
      />
      {errors.content && (
        <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
      )}

      {/* Image upload button and preview */}
      <div className="my-4 flex items-center gap-3">
        <Button
          type="button"
          className="bg-gray-800 text-white"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Select Image"}
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageSelect}
        />
        {preview && (
          <Image
            src={preview}
            alt="Preview"
            width={48}
            height={48}
            className="rounded-lg object-cover"
          />
        )}
      </div>

      <div className="mt-auto pt-4">
        <Button
          type="submit"
          className="w-full bg-white text-black font-semibold"
          disabled={uploading}
        >
          Post
        </Button>
      </div>
    </form>
  );
}
