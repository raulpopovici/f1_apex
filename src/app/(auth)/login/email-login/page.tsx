"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EmailLoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex flex-col px-6 py-8 text-white">
      {/* Centered form card */}
      <div className="flex-grow flex items-center justify-center">
        <Card className="bg-[#1a1a1a] text-white w-full max-w-sm mx-auto rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-2 text-center">
              Sign in with Email
            </h2>
            <p className="text-sm text-gray-400 text-center mb-6">
              Welcome back! Enter your credentials to continue.
            </p>

            <Input
              type="email"
              placeholder="Email address"
              className="mb-4 border-red-500 focus-visible:ring-red-600"
            />

            <Input
              type="password"
              placeholder="Password"
              className="mb-4 border-red-500 focus-visible:ring-red-600"
            />

            <p className="text-sm text-gray-400 text-center mt-6">
              Don’t have an account?{" "}
              <span
                className="text-red-500 underline cursor-pointer"
                onClick={() => router.push("/register")}
              >
                Register
              </span>
            </p>

            <div
              className="text-sm text-red-500 underline text-center mb-6 mt-3 cursor-pointer"
              onClick={() => router.push("/forgot-password")}
            >
              Forgot password?
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700">
              Sign in
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
