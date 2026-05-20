"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, Lock, Activity, Wallet } from "lucide-react";
import { mockPosition, SUI_PRICE } from "@/data/mock";
import { formatUSD, formatSUI } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { WithdrawModal } from "@/components/modals/WithdrawModal";

export function PositionCards() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-pcard]", {
        y: 24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: "expo.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={rootRef} className="grid gap-4 md:grid-cols-3">
        <PCard
          data-pcard
          eyebrow="Collateral"
          icon={<Lock size={14} />}
          tone="muted"
          value={`${formatSUI(mockPosition.collateralSui, 0)} SUI`}
          subtitle={formatUSD(mockPosition.collateralUsd)}
          footer={
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-ink-400">Stays whole</span>
              <span className="font-mono text-ink-200">
                @ ${SUI_PRICE.toFixed(2)}
              </span>
            </div>
          }
        />

        <PCard
          data-pcard
          eyebrow="Active debt"
          icon={<Activity size={14} />}
          tone="neutral"
          value={formatUSD(mockPosition.activeDebtUsdc)}
          subtitle="USDC · Suilend"
          footer={
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-ink-400">Agent managing</span>
              <Badge tone="accent" dot>
                Payoff 5mo 12d
              </Badge>
            </div>
          }
        />

        <PCard
          data-pcard
          eyebrow="Shadow wallet"
          icon={<Wallet size={14} />}
          tone="accent"
          value={formatUSD(mockPosition.shadowBalanceUsdc)}
          subtitle="Spendable any time"
          footer={
            <button
              onClick={() => setWithdrawOpen(true)}
              className="group flex w-full items-center justify-between rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/8 px-3.5 py-2.5 text-[13px] text-[var(--color-accent)] transition-all hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-accent)]/15"
            >
              <span>Withdraw to wallet</span>
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          }
        />
      </div>
      <WithdrawModal open={withdrawOpen} onClose={() => setWithdrawOpen(false)} />
    </>
  );
}

function PCard({
  eyebrow,
  icon,
  tone,
  value,
  subtitle,
  footer,
  ...rest
}: {
  eyebrow: string;
  icon: React.ReactNode;
  tone: "neutral" | "muted" | "accent";
  value: string;
  subtitle: string;
  footer?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const accent = tone === "accent";
  return (
    <article
      {...rest}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[var(--bg-card)]/55 p-6"
    >
      <div
        className="pointer-events-none absolute inset-x-0 -top-1 h-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden
      />
      {accent && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 right-0 h-44 w-44 rounded-full bg-[var(--color-accent)]/12 blur-2xl"
        />
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`grid h-7 w-7 place-items-center rounded-lg border ${
              accent
                ? "border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                : "border-white/[0.08] bg-white/[0.025] text-ink-200"
            }`}
          >
            {icon}
          </span>
          <span className="text-[10.5px] uppercase tracking-[0.16em] text-ink-400">
            {eyebrow}
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          })}
        </span>
      </div>

      <div className="mt-7 flex flex-col">
        <span
          className={`text-[34px] font-medium leading-none tracking-[-0.02em] tab-nums sm:text-[38px] ${
            accent ? "text-[var(--color-accent)]" : "text-ink-50"
          }`}
        >
          {value}
        </span>
        <span className="mt-2.5 text-[13px] text-ink-400">{subtitle}</span>
      </div>

      <div className="mt-7 border-t border-white/[0.04] pt-4">{footer}</div>
    </article>
  );
}
