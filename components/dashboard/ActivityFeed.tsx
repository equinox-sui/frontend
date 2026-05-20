"use client";

import { useState } from "react";
import {
  Zap,
  RefreshCw,
  Wallet,
  ShieldAlert,
  Coins,
  ArrowDownLeft,
} from "lucide-react";
import { activityFeed, type ActivityEvent, type ActivityKind } from "@/data/mock";
import { formatUSD, relativeTime } from "@/lib/format";
import { DefenseModal } from "@/components/modals/DefenseModal";

const KIND_META: Record<
  ActivityKind,
  { icon: React.ComponentType<{ size?: number }>; tone: string; ring: string }
> = {
  spread: {
    icon: Zap,
    tone: "text-[var(--color-accent)]",
    ring: "border-[var(--color-accent)]/30 bg-[var(--color-accent)]/8",
  },
  rebalance: {
    icon: RefreshCw,
    tone: "text-ink-100",
    ring: "border-white/12 bg-white/[0.03]",
  },
  shadow: {
    icon: Wallet,
    tone: "text-[var(--color-positive)]",
    ring: "border-[var(--color-positive)]/25 bg-[var(--color-positive)]/8",
  },
  defense: {
    icon: ShieldAlert,
    tone: "text-[var(--color-danger)]",
    ring: "border-[var(--color-danger)]/30 bg-[var(--color-danger)]/8",
  },
  deposit: {
    icon: Coins,
    tone: "text-ink-100",
    ring: "border-white/12 bg-white/[0.03]",
  },
  withdraw: {
    icon: ArrowDownLeft,
    tone: "text-ink-100",
    ring: "border-white/12 bg-white/[0.03]",
  },
};

export function ActivityFeed() {
  const [filter, setFilter] = useState<"all" | "spread" | "defense" | "rebalance">("all");
  const [defenseEvent, setDefenseEvent] = useState<ActivityEvent | null>(null);

  const filtered =
    filter === "all" ? activityFeed : activityFeed.filter((e) => e.kind === filter);

  return (
    <>
      <article className="overflow-hidden rounded-3xl border border-white/[0.06] bg-[var(--bg-card)]/55">
        <header className="flex items-center justify-between gap-3 border-b border-white/[0.04] px-6 py-4">
          <div>
            <h3 className="text-[15px] font-medium tracking-[-0.005em] text-ink-50">
              Agent activity
            </h3>
            <p className="text-[12px] text-ink-400">
              Live stream — every move the agent makes
            </p>
          </div>
          <div className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1 sm:flex">
            {([
              ["all", "All"],
              ["spread", "Spread"],
              ["rebalance", "Rebalance"],
              ["defense", "Defense"],
            ] as const).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`rounded-full px-3 py-1.5 text-[12px] transition-colors ${
                  filter === k
                    ? "bg-white/[0.06] text-ink-50"
                    : "text-ink-400 hover:text-ink-100"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </header>

        <ul className="divide-y divide-white/[0.04]">
          {filtered.map((evt) => {
            const meta = KIND_META[evt.kind];
            const Icon = meta.icon;
            const clickable = evt.kind === "defense";
            const Wrapper: React.ElementType = clickable ? "button" : "div";
            return (
              <li key={evt.id}>
                <Wrapper
                  onClick={
                    clickable ? () => setDefenseEvent(evt) : undefined
                  }
                  className={`flex w-full items-start gap-4 px-6 py-4 text-left transition-colors ${
                    clickable ? "hover:bg-white/[0.02]" : ""
                  }`}
                >
                  <span
                    className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${meta.ring}`}
                  >
                    <Icon size={15} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <span className="text-[14px] text-ink-50">{evt.title}</span>
                      <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-500">
                        {relativeTime(evt.timestamp)}
                      </span>
                    </div>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-ink-400">
                      {evt.detail}
                    </p>
                  </div>
                  {evt.amount !== undefined && (
                    <span className={`shrink-0 font-mono text-[13.5px] tab-nums ${meta.tone}`}>
                      +{formatUSD(evt.amount)}
                    </span>
                  )}
                </Wrapper>
              </li>
            );
          })}
        </ul>

        <footer className="border-t border-white/[0.04] px-6 py-3">
          <button className="text-[12.5px] text-ink-300 hover:text-ink-50">
            Load older activity →
          </button>
        </footer>
      </article>

      <DefenseModal
        open={!!defenseEvent}
        onClose={() => setDefenseEvent(null)}
        event={defenseEvent ?? undefined}
      />
    </>
  );
}
