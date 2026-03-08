"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Scissors, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Sparkles, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "Services", href: "/admin/services", icon: Sparkles },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-neutral-900 flex">
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-stone-900/50 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-stone-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center flex-shrink-0 px-6 border-b border-stone-100 justify-between lg:justify-center">
          <Link href="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 font-bold text-xl text-neutral-900">
            <Scissors className="w-6 h-6" />
            <span>Luxe Admin</span>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                    isActive
                      ? "bg-stone-100 text-neutral-900"
                      : "text-neutral-600 hover:bg-stone-50 hover:text-neutral-900"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 flex-shrink-0 h-5 w-5 transition-colors",
                      isActive ? "text-neutral-900" : "text-neutral-400 group-hover:text-neutral-600"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex-shrink-0 border-t border-stone-100 p-4">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center px-3 py-2.5 text-sm font-medium rounded-xl text-neutral-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-neutral-400 group-hover:text-red-500" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-stone-200 lg:hidden">
          <div className="flex h-16 items-center px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-neutral-500 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 flex items-center gap-2 font-bold text-lg text-neutral-900">
              <Scissors className="w-5 h-5" />
              <span>Luxe Admin</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
