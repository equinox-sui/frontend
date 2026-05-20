"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { LoginModal } from "@/components/modals/LoginModal";
import { Counter } from "@/components/motion/Counter";

export function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-h-eyebrow]", { y: 18, opacity: 0, duration: 0.8 })
        .from(
          "[data-h-line]",
          { y: 36, opacity: 0, duration: 1.1, stagger: 0.08 },
          "-=0.5",
        )
        .from(
          "[data-h-sub]",
          { y: 14, opacity: 0, duration: 0.8 },
          "-=0.55",
        )
        .from(
          "[data-h-cta]",
          { y: 14, opacity: 0, duration: 0.7, stagger: 0.1 },
          "-=0.45",
        )
        .from(
          "[data-h-stat]",
          { y: 18, opacity: 0, duration: 0.7, stagger: 0.08 },
          "-=0.35",
        )
        .from(
          "[data-h-card]",
          { y: 36, opacity: 0, duration: 1, ease: "expo.out" },
          "-=0.85",
        );

      // Floating orb subtle parallax
      const onMove = (e: MouseEvent) => {
        const r = root.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to("[data-h-orb]", {
          x: x * 36,
          y: y * 22,
          duration: 1.2,
          ease: "power3.out",
        });
      };
      root.addEventListener("mousemove", onMove);
      return () => root.removeEventListener("mousemove", onMove);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-edges absolute inset-0 opacity-50" />
        <div
          data-h-orb
          className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-[var(--color-accent)]/14 blur-[120px]"
        />
        <div
          data-h-orb
          className="absolute -bottom-40 left-[-12%] h-[480px] w-[480px] rounded-full bg-[#7dd0ff]/8 blur-[140px]"
        />
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="max-w-2xl">
            <div
              data-h-eyebrow
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-200"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse-soft" />
              Live on Sui Mainnet
            </div>

            <h1 className="mt-7 text-[44px] font-medium leading-[1.02] tracking-[-0.025em] text-ink-50 sm:text-[64px] md:text-[78px]">
              <span data-h-line className="block">
                Self-repaying
              </span>
              <span data-h-line className="block">
                loans on Sui.
              </span>
              <span
                data-h-line
                className="block text-ink-300 italic font-light"
              >
                The spread does the work.
              </span>
            </h1>

            <p
              data-h-sub
              className="mt-7 max-w-xl text-[16.5px] leading-[1.65] text-ink-300 text-pretty"
            >
              Deposit SUI as collateral. The agent borrows USDC at the best rate,
              hands you 60% to your wallet, and routes the rest into yield. The
              interest differential auto-pays your debt — no health-factor
              babysitting, no monthly payments.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton
                data-h-cta
                onClick={() => setLoginOpen(true)}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 text-[14.5px] font-medium tracking-[-0.005em] text-ink-950 shadow-[0_0_0_1px_rgba(228,243,61,0.5),0_22px_50px_-18px_rgba(228,243,61,0.6)] transition-shadow hover:shadow-[0_0_0_1px_rgba(228,243,61,0.7),0_28px_60px_-16px_rgba(228,243,61,0.75)]"
              >
                Get Started
                <ArrowRight size={16} />
              </MagneticButton>
              <Link
                data-h-cta
                href="/#how"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/10 px-5 text-[14px] text-ink-100 transition-colors hover:border-white/25 hover:bg-white/[0.025]"
              >
                See how it works
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 sm:max-w-lg">
              <Stat label="Active positions" value={1284} format="comma" />
              <Stat label="Spread captured" value={412_580} format="usd-compact" />
              <Stat label="Avg payoff" value={5.3} suffix=" mo" decimals={1} />
            </div>
          </div>

          <HeroPositionCard />
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  );
}

function Stat({
  label,
  value,
  format,
  suffix,
  decimals = 0,
}: {
  label: string;
  value: number;
  format?: "comma" | "usd-compact";
  suffix?: string;
  decimals?: number;
}) {
  const prefix = format === "usd-compact" ? "$" : "";
  return (
    <div data-h-stat>
      <div className="text-[24px] font-medium tracking-tight text-ink-50 sm:text-[28px] tab-nums">
        <Counter
          to={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          compact={format === "usd-compact"}
        />
      </div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-ink-400">
        {label}
      </div>
    </div>
  );
}

function HeroPositionCard() {
  return (
    <div
      data-h-card
      className="relative ml-auto w-full max-w-[440px] rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-md"
    >
      <div className="absolute inset-x-6 -top-[1px] h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400">
          Position · Balanced
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-positive)]/25 bg-[var(--color-positive)]/10 px-2 py-1 text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-positive)]">
          <span className="h-1 w-1 rounded-full bg-[var(--color-positive)] animate-pulse-soft" />
          Healthy
        </div>
      </div>

      <div className="mt-7 flex items-baseline gap-2">
        <span className="text-[42px] font-medium tracking-tight text-ink-50 tab-nums">
          $3,500
        </span>
        <span className="text-[13px] text-ink-400">collateral value</span>
      </div>
      <div className="mt-1 font-mono text-[12.5px] text-ink-400">1,000.00 SUI</div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <MiniCell label="Active debt" value="$1,193" hint="USDC" />
        <MiniCell label="Shadow" value="$42.50" hint="Withdrawable" accent />
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between text-[11.5px] text-ink-300">
          <span className="uppercase tracking-[0.16em] text-ink-400">
            Repayment progress
          </span>
          <span className="font-mono text-ink-100">38%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
          <div
            className="h-full rounded-full bg-[var(--color-accent)]"
            style={{
              width: "38%",
              boxShadow: "0 0 12px rgba(228, 243, 61, 0.6)",
            }}
          />
        </div>
        <div className="flex items-center justify-between text-[11.5px] text-ink-400">
          <span>Projected payoff</span>
          <span className="text-ink-200">Aug 12, 2026</span>
        </div>
      </div>

      <div className="mt-6 space-y-2 border-t border-white/[0.06] pt-5">
        <Tick label="Spread captured" detail="+$0.42 · 2 min ago" tone="accent" />
        <Tick label="Rebalanced" detail="Scallop → Cetus · 4h ago" tone="muted" />
        <Tick label="SUI +2.1%" detail="$5.20 → Shadow · 1d ago" tone="positive" />
      </div>
    </div>
  );
}

function MiniCell({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4">
      <div className="text-[10.5px] uppercase tracking-[0.14em] text-ink-400">
        {label}
      </div>
      <div className="mt-2 text-[20px] font-medium tracking-tight text-ink-50 tab-nums">
        {value}
      </div>
      <div
        className={`mt-0.5 text-[11px] ${accent ? "text-[var(--color-accent)]" : "text-ink-400"}`}
      >
        {hint}
      </div>
    </div>
  );
}

function Tick({
  label,
  detail,
  tone,
}: {
  label: string;
  detail: string;
  tone: "accent" | "positive" | "muted";
}) {
  const dot =
    tone === "accent"
      ? "bg-[var(--color-accent)] shadow-[0_0_8px_rgba(228,243,61,0.7)]"
      : tone === "positive"
        ? "bg-[var(--color-positive)]"
        : "bg-ink-400";
  return (
    <div className="flex items-center gap-3 text-[12px]">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
      <span className="text-ink-100">{label}</span>
      <span className="text-ink-500">·</span>
      <span className="text-ink-400">{detail}</span>
    </div>
  );
}
