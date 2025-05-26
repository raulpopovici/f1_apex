"use client";

import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  return (
    <div
      className="text-sm mb-4 cursor-pointer fixed top-6 left-5 z-51"
      onClick={() => router.back()}
    >
      ← Back
    </div>
  );
};
