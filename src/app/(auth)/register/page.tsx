"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex flex-col px-6 py-8 text-white">
      {/* Back button */}

      {/* Centered card */}
      <div className="flex-grow flex items-center justify-center">
        <Card className="bg-[#1a1a1a] text-white w-full max-w-sm mx-auto rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-2 text-center">
              Create your account
            </h2>
            <p className="text-sm text-gray-400 text-center mb-6">
              Join Keep the Apex and stay in the race.
            </p>

            <Input
              type="text"
              placeholder="Full name"
              className="mb-4 border-red-500 focus-visible:ring-red-600"
            />

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

            <Input
              type="password"
              placeholder="Confirm password"
              className="mb-6 border-red-500 focus-visible:ring-red-600"
            />

            <Button className="w-full bg-red-600 hover:bg-red-700 mb-4">
              Sign up
            </Button>

            <p className="text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <span
                className="text-red-500 underline cursor-pointer"
                onClick={() => router.push("/login/email-login")}
              >
                Sign in
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
