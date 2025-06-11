import { BackButton } from "@/components/back-button";
import RoleBasedNavbar from "@/components/RoleBasedNavbar";
import { Toaster } from "sonner";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md mx-auto">
      <BackButton />
      <RoleBasedNavbar />
      {children}
      <Toaster
        theme="dark" // Ensures dark colors are preferred
        position="top-right"
        richColors={false} // ✅ MOST IMPORTANT: disables sonner's bright defaults
        toastOptions={{
          duration: 5000,
          classNames: {
            toast: `
        bg-black text-white 
        border-2 border-red
        rounded-xl shadow-xl 
        animate-in fade-in slide-in-from-top 
        transition-transform hover:scale-[1.02]
      `,
            title: "text-white font-semibold",
            description: "text-gray-300 text-sm",
            actionButton: "text-red-400 hover:text-white underline text-xs",
          },
        }}
      />
    </div>
  );
}
