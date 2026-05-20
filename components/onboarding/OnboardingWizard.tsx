"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Shield,
  Flame,
  Scale,
  CalendarDays,
  Coins,
} from "lucide-react";
import { Stepper } from "./Stepper";
import { Button } from "@/components/ui/Button";
import { riskProfiles, mockUser, SUI_PRICE } from "@/data/mock";
import { formatUSD, formatSUI } from "@/lib/format";
import { cn } from "@/lib/cn";

const STEPS = [
  "Asset",
  "Amount",
  "Mode",
  "Payoff",
  "Risk",
  "Review",
];

const ASSETS = [
  {
    id: "sui",
    name: "SUI",
    label: "Sui",
    balance: mockUser.suiBalance,
    enabled: true,
    network: "Native",
  },
  {
    id: "stsui",
    name: "stSUI",
    label: "Liquid-staked Sui",
    balance: 0,
    enabled: false,
    network: "Coming soon",
  },
  {
    id: "weth",
    name: "ETH",
    label: "Wrapped Ether",
    balance: 0,
    enabled: false,
    network: "Coming soon",
  },
  {
    id: "wbtc",
    name: "BTC",
    label: "Wrapped Bitcoin",
    balance: 0,
    enabled: false,
    network: "Coming soon",
  },
];

const MODES = [
  {
    id: "income",
    name: "Forever Income",
    icon: Sparkles,
    blurb: "Spread distributed as cash to your Shadow wallet. Debt rolls forever.",
    enabled: false,
  },
  {
    id: "auto",
    name: "Loan + Auto-Repay",
    icon: Shield,
    blurb: "Borrow once. Spread auto-pays your debt until it hits zero.",
    enabled: true,
    recommended: true,
  },
  {
    id: "yield",
    name: "Yield Maximizer",
    icon: Flame,
    blurb: "100% of recycle deployed for max APR. Higher variance.",
    enabled: false,
  },
];

const PAYOFFS = [
  { months: 3, label: "3 months" },
  { months: 6, label: "6 months" },
  { months: 12, label: "12 months" },
  { months: 24, label: "24 months" },
];

const RISK_ICONS = {
  conservative: Shield,
  balanced: Scale,
  aggressive: Flame,
};

interface State {
  asset: string;
  amount: number;
  mode: string;
  payoff: number;
  risk: "conservative" | "balanced" | "aggressive";
}

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<State>({
    asset: "sui",
    amount: 1000,
    mode: "auto",
    payoff: 6,
    risk: "balanced",
  });

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.55, ease: "expo.out" },
    );
  }, [step]);

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const profile = useMemo(
    () => riskProfiles.find((p) => p.id === state.risk)!,
    [state.risk],
  );
  const usdValue = state.amount * SUI_PRICE;
  const borrowed = usdValue * profile.ltv;
  const toUser = borrowed * 0.6;
  const toAgent = borrowed * 0.4;

  return (
    <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-10 py-10">
      <header className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-[12px] text-ink-400 hover:text-ink-100"
          >
            ← Back to home
          </Link>
          <Stepper steps={STEPS} current={step} />
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400">
            Open a position
          </div>
          <h1 className="mt-2 text-[34px] font-medium leading-[1.05] tracking-[-0.02em] text-ink-50 sm:text-[42px]">
            {step === 0 && "Pick what you'll lock."}
            {step === 1 && "Decide how much."}
            {step === 2 && "Choose how the spread is used."}
            {step === 3 && "Tell the agent your timeline."}
            {step === 4 && "Set the agent's appetite."}
            {step === 5 && "One look before activation."}
          </h1>
        </div>
      </header>

      <div ref={panelRef} className="relative">
        {step === 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {ASSETS.map((a) => {
              const active = state.asset === a.id;
              return (
                <button
                  key={a.id}
                  disabled={!a.enabled}
                  onClick={() =>
                    a.enabled && setState((s) => ({ ...s, asset: a.id }))
                  }
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all",
                    a.enabled
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50",
                    active
                      ? "border-[var(--color-accent)]/50 bg-[var(--color-accent)]/8"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/15",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] font-mono text-[12px] text-ink-200">
                      {a.name.slice(0, 3)}
                    </span>
                    {a.enabled ? (
                      <span className="text-[11px] uppercase tracking-[0.14em] text-ink-300">
                        Balance · {formatSUI(a.balance, 2)}
                      </span>
                    ) : (
                      <span className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10.5px] uppercase tracking-[0.14em] text-ink-400">
                        {a.network}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-7 text-[20px] font-medium tracking-tight text-ink-50">
                    {a.name}
                  </h3>
                  <p className="text-[12.5px] text-ink-400">{a.label}</p>
                  {active && (
                    <div className="absolute right-4 top-4 grid h-5 w-5 place-items-center rounded-full bg-[var(--color-accent)] text-ink-950">
                      <Check size={12} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="space-y-5">
              <div className="rounded-3xl border border-white/[0.06] bg-[var(--bg-card)]/55 p-6">
                <div className="flex items-center justify-between text-[11.5px] uppercase tracking-[0.14em] text-ink-400">
                  <span>Amount in SUI</span>
                  <span className="font-mono text-ink-200 tab-nums">
                    Max {formatSUI(mockUser.suiBalance, 2)}
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <input
                    type="number"
                    value={state.amount}
                    min={10}
                    max={mockUser.suiBalance}
                    onChange={(e) =>
                      setState((s) => ({
                        ...s,
                        amount: Number(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-transparent text-[44px] font-medium tracking-[-0.02em] text-ink-50 outline-none tab-nums"
                  />
                  <span className="text-[18px] text-ink-400">SUI</span>
                  <button
                    type="button"
                    onClick={() =>
                      setState((s) => ({ ...s, amount: mockUser.suiBalance }))
                    }
                    className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-ink-200 hover:bg-white/[0.05]"
                  >
                    Max
                  </button>
                </div>
                <input
                  type="range"
                  min={10}
                  max={mockUser.suiBalance}
                  step={5}
                  value={state.amount}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      amount: Number(e.target.value),
                    }))
                  }
                  className="mt-5 w-full accent-[var(--color-accent)]"
                />
                <div className="mt-4 flex items-center justify-between text-[12px] text-ink-400">
                  <span>≈ {formatUSD(usdValue)}</span>
                  <span>Min · 10 SUI</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/[0.06] bg-[var(--bg-card)]/55 p-6">
              <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400">
                Projected at activation
              </div>
              <Mini k="Collateral value" v={formatUSD(usdValue)} />
              <Mini k="Borrow capacity" v={formatUSD(borrowed)} hint={`${Math.round(profile.ltv * 100)}% LTV`} />
              <Mini k="You receive" v={formatUSD(toUser)} accent />
              <Mini k="Agent recycles" v={formatUSD(toAgent)} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-3 lg:grid-cols-3">
            {MODES.map((m) => {
              const active = state.mode === m.id;
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  disabled={!m.enabled}
                  onClick={() =>
                    m.enabled && setState((s) => ({ ...s, mode: m.id }))
                  }
                  className={cn(
                    "relative overflow-hidden rounded-3xl border p-6 text-left transition-all",
                    m.enabled ? "cursor-pointer" : "cursor-not-allowed opacity-45",
                    active
                      ? "border-[var(--color-accent)]/50 bg-[var(--color-accent)]/8"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/15",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-xl border",
                        active
                          ? "border-[var(--color-accent)]/50 bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
                          : "border-white/10 bg-white/[0.03] text-ink-200",
                      )}
                    >
                      <Icon size={15} />
                    </span>
                    {m.recommended && (
                      <span className="rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-2.5 py-1 text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                        Recommended
                      </span>
                    )}
                    {!m.enabled && (
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10.5px] uppercase tracking-[0.14em] text-ink-400">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <h3 className="mt-8 text-[18px] font-medium tracking-[-0.01em] text-ink-50">
                    {m.name}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-300">
                    {m.blurb}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-3xl border border-white/[0.06] bg-[var(--bg-card)]/55 p-6">
              <div className="flex items-center gap-2 text-[11.5px] uppercase tracking-[0.16em] text-ink-400">
                <CalendarDays size={14} />
                Target payoff window
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {PAYOFFS.map((p) => {
                  const active = state.payoff === p.months;
                  return (
                    <button
                      key={p.months}
                      onClick={() =>
                        setState((s) => ({ ...s, payoff: p.months }))
                      }
                      className={cn(
                        "rounded-2xl border px-3 py-4 text-center text-[13px] transition-colors",
                        active
                          ? "border-[var(--color-accent)]/50 bg-[var(--color-accent)]/10 text-ink-50"
                          : "border-white/[0.06] bg-white/[0.02] text-ink-200 hover:border-white/15",
                      )}
                    >
                      <div className="font-mono text-[22px] tab-nums text-ink-50">
                        {p.months}
                      </div>
                      <div className="text-[11.5px] text-ink-400">months</div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-6 text-[12.5px] text-ink-400">
                Target date · <span className="text-ink-100">{formatDate(state.payoff)}</span>.
                The agent will rebalance more aggressively if you fall behind schedule.
              </p>
            </div>

            <div className="rounded-3xl border border-white/[0.06] bg-[var(--bg-card)]/55 p-6">
              <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400">
                Why a window?
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-200">
                Telling the agent your horizon lets it pick the right balance
                between safety and yield. Shorter = more aggressive rebalance,
                longer = lower variance.
              </p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-3 lg:grid-cols-3">
            {riskProfiles.map((p) => {
              const active = state.risk === p.id;
              const Icon = RISK_ICONS[p.id];
              return (
                <button
                  key={p.id}
                  onClick={() => setState((s) => ({ ...s, risk: p.id }))}
                  className={cn(
                    "relative overflow-hidden rounded-3xl border p-6 text-left transition-all",
                    active
                      ? "border-[var(--color-accent)]/50 bg-[var(--color-accent)]/8"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/15",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-xl border",
                        active
                          ? "border-[var(--color-accent)]/50 bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
                          : "border-white/10 bg-white/[0.03] text-ink-200",
                      )}
                    >
                      <Icon size={15} />
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500">
                      {p.glyph}
                    </span>
                  </div>
                  <h3 className="mt-7 text-[20px] font-medium tracking-[-0.01em] text-ink-50">
                    {p.label}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-300">
                    {p.blurb}
                  </p>

                  <dl className="mt-6 space-y-2.5 border-t border-white/[0.05] pt-4 text-[12.5px]">
                    <Stat k="LTV" v={`${Math.round(p.ltv * 100)}%`} />
                    <Stat
                      k="Est. APY"
                      v={`${p.apyMin.toFixed(1)}–${p.apyMax.toFixed(1)}%`}
                      accent
                    />
                    <Stat
                      k="Liquidation @"
                      v={formatUSD(SUI_PRICE * (1 - p.liquidationDrop))}
                    />
                    <Stat
                      k="Scallop / Cetus"
                      v={`${Math.round(p.scallopSplit * 100)} / ${Math.round(p.cetusSplit * 100)}`}
                    />
                  </dl>
                </button>
              );
            })}
          </div>
        )}

        {step === 5 && (
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-7">
              <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400">
                You&apos;re about to
              </div>
              <h2 className="mt-3 text-[26px] font-medium tracking-[-0.015em] text-ink-50">
                Deposit {state.amount.toLocaleString()} SUI ·{" "}
                <span className="text-ink-400">{formatUSD(usdValue)}</span>
              </h2>

              <ul className="mt-7 space-y-3 text-[13.5px]">
                <Confirm
                  icon={<Coins size={14} />}
                  k="Borrow"
                  v={`${formatUSD(borrowed)} USDC`}
                  hint={`Suilend · ${Math.round(profile.ltv * 100)}% LTV`}
                />
                <Confirm
                  icon={<ArrowRight size={14} />}
                  k="To your wallet"
                  v={formatUSD(toUser)}
                  hint="60% of borrow · instant"
                  tone="accent"
                />
                <Confirm
                  icon={<Sparkles size={14} />}
                  k="Agent recycles"
                  v={formatUSD(toAgent)}
                  hint={`${Math.round(profile.scallopSplit * 100)}% Scallop · ${Math.round(profile.cetusSplit * 100)}% Cetus`}
                />
                <Confirm
                  icon={<CalendarDays size={14} />}
                  k="Target payoff"
                  v={`~${state.payoff} months`}
                  hint={formatDate(state.payoff)}
                />
                <Confirm
                  icon={<Shield size={14} />}
                  k="Liquidation price"
                  v={formatUSD(SUI_PRICE * (1 - profile.liquidationDrop))}
                  hint={`SUI now ${formatUSD(SUI_PRICE)}`}
                />
              </ul>

              <div className="mt-7 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row">
                <Button
                  variant="outline"
                  onClick={prev}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button className="flex-[1.4]" size="lg">
                  Confirm & activate
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-white/[0.06] bg-[var(--bg-card)]/55 p-6">
                <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400">
                  Manifesto
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-200">
                  This activation creates an immutable rule set on Walrus. Your
                  agent can never deviate from it.
                </p>
                <Link
                  href="/manifesto"
                  className="mt-4 inline-flex items-center gap-2 text-[12.5px] text-[var(--color-accent)] hover:underline underline-offset-4"
                >
                  Preview the rules →
                </Link>
              </div>
              <div className="rounded-3xl border border-white/[0.06] bg-[var(--bg-card)]/55 p-6">
                <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400">
                  Gas
                </div>
                <div className="mt-3 font-mono text-[18px] text-ink-50 tab-nums">
                  ~$0.01
                </div>
                <p className="mt-1 text-[12px] text-ink-400">
                  One transaction · signed via zkLogin.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {step < 5 && (
        <div className="flex items-center justify-between gap-3 border-t border-white/[0.05] pt-6">
          <Button
            variant="outline"
            onClick={prev}
            disabled={step === 0}
            className="!h-11"
          >
            <ArrowLeft size={14} />
            Back
          </Button>
          <div className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink-500">
            Step {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </div>
          <Button onClick={next} className="!h-11">
            Continue
            <ArrowRight size={14} />
          </Button>
        </div>
      )}
    </div>
  );
}

function Mini({
  k,
  v,
  hint,
  accent,
}: {
  k: string;
  v: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div className="mt-4 flex items-center justify-between border-t border-white/[0.04] pt-3 first-of-type:mt-5 first-of-type:border-t-0 first-of-type:pt-5">
      <div>
        <div className="text-[12px] text-ink-300">{k}</div>
        {hint && (
          <div className="mt-0.5 text-[11px] text-ink-500">{hint}</div>
        )}
      </div>
      <span
        className={`font-mono text-[15px] tab-nums ${
          accent ? "text-[var(--color-accent)]" : "text-ink-50"
        }`}
      >
        {v}
      </span>
    </div>
  );
}

function Stat({
  k,
  v,
  accent,
}: {
  k: string;
  v: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-400">{k}</span>
      <span
        className={`font-mono tab-nums ${
          accent ? "text-[var(--color-accent)]" : "text-ink-100"
        }`}
      >
        {v}
      </span>
    </div>
  );
}

function Confirm({
  icon,
  k,
  v,
  hint,
  tone,
}: {
  icon: React.ReactNode;
  k: string;
  v: string;
  hint: string;
  tone?: "accent";
}) {
  const color = tone === "accent" ? "text-[var(--color-accent)]" : "text-ink-50";
  return (
    <li className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-ink-200">
          {icon}
        </span>
        <div>
          <div className="text-ink-100">{k}</div>
          <div className="mt-0.5 text-[11.5px] text-ink-400">{hint}</div>
        </div>
      </div>
      <span className={`font-mono text-[15px] tab-nums ${color}`}>{v}</span>
    </li>
  );
}

function formatDate(monthsFromNow: number) {
  const d = new Date();
  d.setMonth(d.getMonth() + monthsFromNow);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
