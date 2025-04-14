"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex flex-col px-6 py-8 text-white">
      {/* Back button at the top */}
      <div
        className="text-sm mb-4 cursor-pointer"
        onClick={() => router.back()}
      >
        ← Back
      </div>

      {/* Content wrapper to center the card */}
      <div className="flex-grow flex items-center justify-center">
        <Card className="bg-[#1a1a1a] text-white w-full max-w-sm mx-auto rounded-2xl">
          <CardContent className="p-6">
            <div className="text-3xl mb-4">🔒</div>
            <h2 className="text-xl font-bold mb-1">Forgot your password?</h2>
            <p className="text-sm text-gray-400 mb-6">
              Enter the email associated with your account.
            </p>

            <Input
              type="email"
              placeholder="Email address"
              className="mb-4 border-red-500 focus-visible:ring-red-600"
            />

            <p className="text-sm text-gray-400">
              Remember your password?{" "}
              <span
                className="text-red-500 underline cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Sign in.
              </span>
            </p>

            <Button className="w-full bg-red-600 hover:bg-red-700 mt-6">
              Reset password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
