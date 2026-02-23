"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/admin-actions";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  Gem,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[var(--color-charcoal)] border-r border-[var(--color-stone)] flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-[var(--color-stone)] flex items-center gap-2">
          <Gem className="w-5 h-5 text-[var(--color-gold)]" />
          <Link href="/admin" className="font-heading text-lg text-[var(--color-gold)]">
            Mudita Admin
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  isActive
                    ? "bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                    : "text-[var(--color-bone)] hover:bg-[var(--color-stone)]/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[var(--color-stone)]">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded text-sm text-[var(--color-muted)] hover:text-[var(--color-bone)] hover:bg-[var(--color-stone)]/50 transition-colors mb-1"
          >
            <Gem className="w-4 h-4" />
            View Store
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2 rounded text-sm text-red-400 hover:bg-red-400/10 transition-colors w-full"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center gap-3 p-4 border-b border-[var(--color-stone)]">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-[var(--color-bone)]"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-heading text-[var(--color-gold)]">Mudita Admin</span>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
