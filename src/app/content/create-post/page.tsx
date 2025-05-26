'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerifiedCheckIcon } from "@/components/icons/verified-icon";
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const postSchema = z.object({
  content: z.string().min(1, 'Post content is required'),
});

type PostFormData = z.infer<typeof postSchema>;


export default function NewPost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostFormData) => {
    console.log('Post submitted:', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-[100dvh] pt-16 pb-24 px-4 bg-black text-white overflow-y-auto"
    >
      {/* User Info */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src="/ferrari-icon.png"
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

      {/* Text Area */}
      <textarea
        {...register('content')}
        placeholder="Start a post..."
        className="w-full bg-black text-white border-none resize-none placeholder-gray-500 focus:outline-none focus:ring-0 text-sm"
        rows={6}
      />
      {errors.content && (
        <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
      )}

      {/* Post Button (shadcn) */}
      <div className="mt-auto pt-4">
        <Button type="submit" className="w-full bg-white text-black font-semibold">
          Post
        </Button>
      </div>
    </form>
  );
}
