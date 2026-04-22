"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: "◈",
    exact: true,
  },
  {
    href: "/dashboard/health",
    label: "Technical Health",
    icon: "⚡",
    badge: "P0",
  },
  {
    href: "/dashboard/audit",
    label: "AI Readiness",
    icon: "📋",
  },
  {
    href: "/dashboard/search",
    label: "Search & Funnel",
    icon: "🔍",
  },
  {
    href: "/dashboard/perception",
    label: "Perception Gap",
    icon: "🎯",
  },
  {
    href: "/dashboard/actions",
    label: "Action Plan",
    icon: "✦",
  },
  {
    href: "/dashboard/products",
    label: "Products & Rewrites",
    icon: "📦",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 flex flex-col bg-gray-900/60 border-r border-gray-800 h-screen sticky top-0">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            AI Shelf
          </span>
        </Link>
        <p className="text-xs text-gray-600 mt-1 pl-9">Glow Labs</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors",
                isActive
                  ? "bg-brand-500/10 text-brand-400 font-medium"
                  : "text-gray-500 hover:text-gray-200 hover:bg-gray-800"
              )}
            >
              <span className="w-5 text-center text-base leading-none">
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/20 rounded-full px-1.5 py-0.5">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-800">
        <Link
          href="/"
          className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
        >
          ← Switch store
        </Link>
      </div>
    </aside>
  );
}
