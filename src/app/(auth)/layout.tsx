import { BackButton } from "@/components/back-button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md mx-auto">
      <BackButton />
      {children}
    </div>
  );
}
