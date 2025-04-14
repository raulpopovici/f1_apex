"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import F1Car from "../../assets/f1-car.svg";
import Gmail from "../../assets/gmail-icon.svg";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between px-6 py-8 text-white">
      {/* Top content */}
      <div className="flex flex-col items-center">
        <Image
          src={F1Car}
          alt="F1 Car"
          width={220}
          height={160}
          className="mb-6"
        />
        <h1 className="text-2xl font-bold text-center mb-4">
          Welcome to Keep the Apex
        </h1>
      </div>

      {/* Login card */}
      <Card className="bg-[#1a1a1a] text-white w-full max-w-sm rounded-2xl relative shadow-lg">
        <CardContent className="p-6">
          {/* Close icon */}
          <button
            onClick={() => router.push("/")}
            className="absolute top-4 right-4 text-white hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5  cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h2 className="text-lg font-semibold text-center mb-2">
            Login or sign up
          </h2>
          <p className="text-sm text-gray-400 text-center mb-6">
            Please select your preferred method to continue setting up your
            account
          </p>

          <Button className="bg-red-600 hover:bg-red-700 w-full mb-4 cursor-pointer">
            Continue with Email
          </Button>

          <Button
            variant="outline"
            className="w-full border-destructive bg-inherit hover:bg-gray-800 cursor-pointer"
          >
            <Image src={Gmail} alt="Gmail" width={15} height={15} />
          </Button>

          <div
            className="text-center mt-4 text-sm text-gray-400 underline cursor-pointer"
            onClick={() => router.push("/forgot-password")}
          >
            Forgot your password?
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 mt-6">
        <p>If you are creating a new account,</p>
        <p>
          <span className="underline cursor-pointer">Terms & Conditions</span>{" "}
          and <span className="underline cursor-pointer">Privacy Policy</span>{" "}
          will apply.
        </p>
      </div>
    </div>
  );
}
