import { BackButton } from "@/components/back-button";
import ResponsiveNavbar from "@/components/navbar";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md mx-auto">
      <BackButton />
      <ResponsiveNavbar />
      {children}
    </div>
  );
}
