"use client";

import Link from "next/link";
import { ArrowRight, ScrollText, BookOpen, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

const LEARN_LINKS = [
  { label: "How it works", href: "/#how", icon: BookOpen },
  { label: "FAQ", href: "/#faq", icon: ScrollText },
  { label: "Risk disclosure", href: "/manifesto", icon: ShieldCheck },
];

/**
 * README §10 — Empty State: "Welcome to Equinox Agent / You don't have any
 * active positions yet. Open your first position to let the agent work for
 * you." Shown when the user is signed in but hasPosition() === false.
 */
export function DashboardEmpty() {
  return (
    <div className="mx-auto w-full max-w-[820px] py-10 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[var(--bg-card)]/55 p-8 sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(228,243,61,0.25), transparent 70%)",
          }}
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-300">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse-soft" />
            Welcome
          </span>
          <h1 className="mt-5 text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.015em] text-ink-50">
            Welcome to Equinox Agent.
          </h1>
          <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-ink-300">
            You don&apos;t have any active positions yet. Open your first
            position and let the agent borrow, lend, and capture the spread —
            without you watching Health Factor or chasing the best vault.
          </p>
          <div className="mt-8">
            <Link href="/onboarding" className="inline-block">
              <Button size="lg" className="!h-12 !px-6">
                Open position
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400">
          Or learn more
        </div>
        <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
          {LEARN_LINKS.map((l) => {
            const Icon = l.icon;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-4 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-ink-200">
                    <Icon size={14} />
                  </span>
                  <span className="text-[13.5px] text-ink-100">{l.label}</span>
                  <ArrowRight
                    size={14}
                    className="ml-auto text-ink-500 transition-all group-hover:translate-x-0.5 group-hover:text-ink-200"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
