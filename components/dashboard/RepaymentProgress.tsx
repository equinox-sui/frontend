"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { mockPosition, repaymentProgress } from "@/data/mock";
import { formatUSD } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";

export function RepaymentProgress() {
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!fillRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      fillRef.current.style.width = `${repaymentProgress.percent}%`;
      return;
    }
    gsap.fromTo(
      fillRef.current,
      { width: 0 },
      {
        width: `${repaymentProgress.percent}%`,
        duration: 1.4,
        ease: "expo.out",
      },
    );
  }, []);

  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[var(--bg-card)]/55 p-6">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10.5px] uppercase tracking-[0.16em] text-ink-400">
            Debt repayment
          </span>
          <h3 className="mt-2 text-[18px] font-medium tracking-[-0.01em] text-ink-50">
            On track to clear by{" "}
            <span className="text-ink-300">{repaymentProgress.projectedPayoff}</span>
          </h3>
        </div>
        <Badge tone="positive" dot>
          On schedule
        </Badge>
      </div>

      <div className="mt-7">
        <div className="flex items-baseline justify-between text-[12px]">
          <span className="text-ink-400">{repaymentProgress.percent}% repaid</span>
          <span className="font-mono tabular text-ink-200">
            {formatUSD(mockPosition.originalDebtUsdc - mockPosition.activeDebtUsdc)} of{" "}
            {formatUSD(mockPosition.originalDebtUsdc)}
          </span>
        </div>
        <div className="relative mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white/[0.04]">
          <div
            ref={fillRef}
            className="h-full rounded-full bg-[var(--color-accent)]"
            style={{
              width: 0,
              boxShadow: "0 0 14px rgba(228, 243, 61, 0.45)",
            }}
          />
          {/* tick marks */}
          {[25, 50, 75].map((t) => (
            <span
              key={t}
              className="absolute top-0 h-full w-px bg-[var(--bg-card)]"
              style={{ left: `${t}%` }}
              aria-hidden
            />
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/[0.04] pt-5 sm:grid-cols-4">
        <Stat label="Original" value={formatUSD(mockPosition.originalDebtUsdc)} />
        <Stat label="Current" value={formatUSD(mockPosition.activeDebtUsdc)} accent />
        <Stat
          label="Days active"
          value={`${mockPosition.daysActive}`}
          mono
        />
        <Stat
          label="Spread captured"
          value={formatUSD(mockPosition.spreadCapturedTotal)}
          accent
        />
      </div>
    </article>
  );
}

function Stat({
  label,
  value,
  accent,
  mono,
}: {
  label: string;
  value: string;
  accent?: boolean;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="text-[10.5px] uppercase tracking-[0.14em] text-ink-400">
        {label}
      </div>
      <div
        className={`mt-1.5 ${mono ? "font-mono" : "tab-nums"} text-[16px] ${
          accent ? "text-[var(--color-accent)]" : "text-ink-50"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
