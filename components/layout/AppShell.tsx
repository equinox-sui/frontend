"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  ScrollText,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { mockUser } from "@/data/mock";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/withdraw", label: "Withdraw", icon: Wallet },
  { href: "/manifesto", label: "Manifesto", icon: ScrollText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--bg)] lg:flex-row">
      {/* Sidebar */}
      <aside
        className={cn(
          "z-30 flex shrink-0 flex-col border-white/[0.05] bg-[var(--bg)]/95 backdrop-blur-md",
          "lg:sticky lg:top-0 lg:h-screen lg:w-[260px] lg:border-r",
        )}
      >
        <div className="flex items-center justify-between border-b border-white/[0.05] px-6 py-5 lg:border-b-0">
          <Link href="/">
            <Logo />
          </Link>
          <button
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-ink-100 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <ChevronDown
              size={16}
              className={cn("transition-transform", mobileOpen && "rotate-180")}
            />
          </button>
        </div>

        <nav
          className={cn(
            "flex-1 overflow-hidden lg:overflow-visible",
            mobileOpen ? "block" : "hidden lg:block",
          )}
        >
          <ul className="space-y-0.5 px-3 py-4">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px]",
                      "transition-colors",
                      active
                        ? "bg-white/[0.05] text-ink-50"
                        : "text-ink-300 hover:bg-white/[0.025] hover:text-ink-50",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-lg border transition-colors",
                        active
                          ? "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/8 text-[var(--color-accent)]"
                          : "border-white/[0.06] bg-white/[0.02] text-ink-300 group-hover:text-ink-100",
                      )}
                    >
                      <Icon size={14} />
                    </span>
                    {item.label}
                    {active && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse-soft" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mx-3 mt-6 rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4">
            <p className="text-[10.5px] uppercase tracking-[0.16em] text-ink-500">
              Agent status
            </p>
            <div className="mt-3 flex items-center gap-2 text-[12.5px] text-ink-100">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-positive)] animate-pulse-soft" />
              Operating — manifesto v1.0.0
            </div>
            <Link
              href="/manifesto"
              className="mt-3 inline-block text-[12px] text-[var(--color-accent)] hover:underline underline-offset-4"
            >
              View behavior rules ↗
            </Link>
          </div>
        </nav>

        <div
          className={cn(
            "border-t border-white/[0.05] p-4",
            mobileOpen ? "block" : "hidden lg:block",
          )}
        >
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[var(--color-accent)]/15 text-[12px] font-medium text-[var(--color-accent)]">
              {mockUser.name.charAt(0)}
            </div>
            <div className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="truncate text-[12.5px] text-ink-50">
                {mockUser.name}
              </span>
              <span className="truncate text-[11px] text-ink-400">
                {mockUser.email}
              </span>
            </div>
            <button
              aria-label="Logout"
              className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 hover:bg-white/[0.04] hover:text-ink-50"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="relative flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/[0.05] bg-[var(--bg)]/85 px-5 backdrop-blur-md sm:px-8">
          <div>
            <h1 className="text-[15.5px] font-medium tracking-[-0.01em] text-ink-50">
              {NAV.find((n) => n.href === pathname)?.label ?? "Dashboard"}
            </h1>
            <p className="text-[11.5px] text-ink-400">
              Last sync · just now · v0.1.0
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Notifications"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] text-ink-200 transition-colors hover:bg-white/[0.04]"
            >
              <Bell size={15} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse-soft" />
            </button>
          </div>
        </div>

        <main className="px-5 py-8 sm:px-8 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
