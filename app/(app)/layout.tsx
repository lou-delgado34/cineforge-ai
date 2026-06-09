import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-neutral-950">
      <AppSidebar />

      <div className="flex flex-1 flex-col">
        <AppHeader />
        {children}
      </div>
    </div>
  );
}