"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useUser();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(fullName, email, password, role);
      if (success) {
        router.push("/content");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        "Registration failed. Please check your information and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-detect role based on email patterns
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Auto-detect role
    if (emailValue.includes("@f1.com") || emailValue.includes("driver")) {
      setRole("driver");
    } else if (
      emailValue.includes("@team.com") ||
      emailValue.includes("team")
    ) {
      setRole("team");
    } else {
      setRole("user");
    }
  };

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

            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Full name"
                className="mb-4 border-red-500 focus-visible:ring-red-600"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isLoading}
                required
              />

              <Input
                type="email"
                placeholder="Email address"
                className="mb-4 border-red-500 focus-visible:ring-red-600"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
                required
              />

              {/* Role indicator */}
              {email && (
                <div className="mb-4 p-2 bg-gray-800 rounded-lg border border-gray-600">
                  <p className="text-xs text-gray-400 mb-1">Account type:</p>
                  <div className="flex items-center gap-2">
                    {role === "driver" && (
                      <>
                        <span className="text-green-500">🏁</span>
                        <span className="text-green-500 font-medium">
                          Driver Account
                        </span>
                      </>
                    )}
                    {role === "team" && (
                      <>
                        <span className="text-purple-500">🏆</span>
                        <span className="text-purple-500 font-medium">
                          Team Account
                        </span>
                      </>
                    )}
                    {role === "user" && (
                      <>
                        <span className="text-blue-500">🏎️</span>
                        <span className="text-blue-500 font-medium">
                          F1 Fan Account
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              <Input
                type="password"
                placeholder="Password"
                className="mb-4 border-red-500 focus-visible:ring-red-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />

              <Input
                type="password"
                placeholder="Confirm password"
                className="mb-6 border-red-500 focus-visible:ring-red-600"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
              />

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 mb-4 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
            </form>

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
