"use client";

import { BackButton } from "@/components/back-button";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/content");
    }
  }, [isLoggedIn]);

  // 👇 Block access and rendering if already logged in
  if (isLoggedIn) return null;
  return (
    <div className="w-full max-w-md mx-auto">
      <BackButton />
      {children}
    </div>
  );
}
