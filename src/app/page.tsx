"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import F1Car from "../assets/f1-car.svg";
import { useUser } from "@/hooks/useUser";

const slides = [
  {
    title: "Welcome to Keep the Apex",
    description:
      "Your place where you get everything that you need whatever team you support.",
  },
  {
    title: "Never miss a moment.",
    description: "Get updates, stats, and news straight from the paddock.",
  },
  {
    title: "Everything in one place.",
    description:
      "Team news, race weekends, standings — all at your fingertips.",
  },
];

export default function Onboarding() {
  const [active, setActive] = useState(0);
  const router = useRouter();
  const { isLoggedIn } = useUser();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/content");
    }
  }, [isLoggedIn, router]);

  const handleNext = () => {
    if (active < slides.length - 1) {
      setActive((prev) => prev + 1);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 text-center">
      <Image
        src={F1Car}
        alt="F1 Car"
        width={240}
        height={180}
        className="mb-8"
      />

      <Card className="bg-transparent border-none shadow-none text-white max-w-md w-full">
        <CardContent className="p-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {slides[active].title}
          </h1>
          <p className="text-base md:text-lg text-gray-300">
            {slides[active].description}
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              i === active ? "bg-red-500 scale-110" : "bg-gray-500 opacity-70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <Button
        onClick={handleNext}
        className="mt-8 w-full max-w-sm bg-red-600 hover:bg-red-700 cursor-pointer"
      >
        {active === slides.length - 1 ? "Get Started" : "Next"}
      </Button>
    </div>
  );
}
