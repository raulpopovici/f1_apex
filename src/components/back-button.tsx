"use client";

import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  return (
    <div
      className="text-sm mb-4 cursor-pointer absolute top-5 left-5"
      onClick={() => router.back()}
    >
      ← Back
    </div>
  );
};
