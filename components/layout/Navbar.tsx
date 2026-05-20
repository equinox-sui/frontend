"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { LoginModal } from "@/components/modals/LoginModal";

const NAV = [
  { href: "/#how", label: "How it works" },
  { href: "/#why", label: "Why Equinox" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/manifesto", label: "Manifesto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-white/[0.06] bg-[var(--bg)]/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative rounded-full px-3.5 py-1.5 text-[13px] text-ink-300 transition-colors hover:text-ink-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              className="text-[13px] text-ink-300 transition-colors hover:text-ink-50"
              onClick={() => setLoginOpen(true)}
            >
              Sign in
            </button>
            <Button
              size="sm"
              onClick={() => setLoginOpen(true)}
              className="!h-9 !px-4"
            >
              Get Started
            </Button>
          </div>

          <button
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={cn(
            "md:hidden overflow-hidden border-t border-white/[0.06] bg-[var(--bg)]/95 backdrop-blur-xl transition-[max-height] duration-300",
            open ? "max-h-[420px]" : "max-h-0",
          )}
        >
          <div className="flex flex-col gap-1 px-5 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-[15px] text-ink-100 transition-colors hover:bg-white/[0.04]"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setLoginOpen(true);
                }}
              >
                Sign in
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  setLoginOpen(true);
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
