"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";

export default function EmailLoginPage() {
  const router = useRouter();
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/content");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Email address"
                className="mb-4 border-red-500 focus-visible:ring-red-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />

              <Input
                type="password"
                placeholder="Password"
                className="mb-4 border-red-500 focus-visible:ring-red-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="text-sm text-gray-400 text-center mt-6">
              Don't have an account?{" "}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
