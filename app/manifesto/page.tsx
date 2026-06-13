"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  ShieldCheck,
  Lock,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { gsap, registerGsap } from "@/lib/gsap";
import { AppShell } from "@/components/layout/AppShell";
import { mockPosition } from "@/data/mock";

const TECH: React.CSSProperties = {
  fontFamily: "var(--font-tech), ui-sans-serif, system-ui",
};

// Safety-critical params promoted to the hero row.
const HERO = [
  {
    label: "LTV maximum",
    value: "65%",
    note: "Hard ceiling before forced rebalance",
    tone: "#ff7a90",
  },
  {
    label: "Defense threshold",
    value: "1.30",
    note: "Health Factor that triggers defense",
    tone: "#ffc46b",
  },
  {
    label: "Buffer minimum",
    value: "10%",
    note: "Of debt, always held in reserve",
    tone: "#6cf2cc",
  },
];

const PARAMS = [
  { k: "LTV target", v: "55%", hint: "Borrowed / collateral value" },
  { k: "Warning threshold (HF)", v: "1.50", hint: "Below: agent warns you" },
  { k: "Recycle ratio", v: "30–50%", hint: "Dynamic, based on yield delta" },
];

const ROUTING = [
  { k: "Borrow source", v: "Suilend", hint: "Health Factor monitored every block" },
  { k: "Lend max — Scallop", v: "60%", hint: "Of recycle into USDC lending" },
  { k: "Lend max — Cetus", v: "40%", hint: "Of recycle into USDC/USDT LP" },
  { k: "Rebalance trigger", v: "0.5% APR", hint: "Delta before shifting venues" },
];

export default function ManifestoPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      registerGsap();
      if (!rootRef.current) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      gsap.fromTo(
        "[data-mf]",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: reduced ? 0.001 : 0.7,
          ease: "expo.out",
        }
      );
    },
    { scope: rootRef }
  );

  const copyHash = async () => {
    try {
      await navigator.clipboard.writeText(mockPosition.manifestoHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <AppShell>
      <div
        ref={rootRef}
        className="mx-auto w-full max-w-[960px] space-y-10"
        style={TECH}
      >
        {/* Header */}
        <header data-mf className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--color-violet)]/40 bg-[var(--color-violet)]/12 text-violet-soft">
              <ShieldCheck size={19} />
            </span>
            <div>
              <h1 className="text-[27px] font-medium tracking-[-0.015em] text-fg">
                Manifesto
              </h1>
              <p className="text-[13px] text-fg-muted">
                The rules your agent cannot break.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="#6cf2cc" dot>
              Verified — unchanged since activation
            </Chip>
            <Chip>Balanced · Loan + Auto-Repay</Chip>
            <Chip>v{mockPosition.manifestoVersion}</Chip>
          </div>
        </header>

        {/* Hero stat row — the params that matter most */}
        <div data-mf className="grid gap-4 sm:grid-cols-3">
          {HERO.map((h) => (
            <article
              key={h.label}
              className="relative overflow-hidden rounded-3xl border border-border-strong/60 bg-surface/45 p-6 backdrop-blur-md"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-60 blur-3xl"
                style={{ background: `${h.tone}22` }}
              />
              <div className="relative text-[10.5px] uppercase tracking-[0.18em] text-fg-dim">
                {h.label}
              </div>
              <div
                className="relative mt-3 text-[40px] font-medium leading-none tracking-tight tab-nums"
                style={{ color: h.tone }}
              >
                {h.value}
              </div>
              <div className="relative mt-3 text-[12px] leading-relaxed text-fg-muted">
                {h.note}
              </div>
            </article>
          ))}
        </div>

        {/* Parameter + routing tables */}
        <Section
          dataMf
          title="Parameters"
          intro="The numbers your agent obeys. Set at activation, immutable thereafter."
          rows={PARAMS}
        />
        <Section
          dataMf
          title="Routing policy"
          intro="Where your money can go. Anything outside this list is impossible."
          rows={ROUTING}
        />

        {/* Walrus sealed artifact */}
        <article
          data-mf
          className="relative overflow-hidden rounded-3xl border border-border-strong/60 bg-surface/45 p-6 backdrop-blur-md sm:p-7"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--color-emerald)]/35 bg-[var(--color-emerald)]/12 text-[var(--color-emerald-soft)]">
                <Lock size={15} />
              </span>
              <div>
                <h3 className="text-[15px] font-medium tracking-[-0.005em] text-fg">
                  Sealed on Walrus
                </h3>
                <p className="text-[12px] text-fg-dim">
                  Hash committed on-chain · cannot be silently changed
                </p>
              </div>
            </div>
            <span className="hidden items-center gap-1.5 rounded-full bg-[var(--color-emerald)]/12 px-2.5 py-1 text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-emerald-soft)] shadow-[0_0_0_1px_rgba(22,217,168,0.4)] sm:inline-flex">
              <Sparkles size={11} />
              Immutable
            </span>
          </div>

          {/* JSON-ish artifact panel */}
          <div className="mt-5 overflow-hidden rounded-2xl border border-border/80 bg-bg/70">
            <div className="flex items-center gap-2 border-b border-border/80 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-rose)]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-amber)]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-emerald)]/70" />
              <span className="ml-2 font-mono text-[11px] text-fg-dim">
                manifesto.json
              </span>
            </div>
            <div className="space-y-1.5 p-4 font-mono text-[12px] leading-relaxed">
              <Line k="version" v={`"${mockPosition.manifestoVersion}"`} />
              <Line k="risk" v={`"${mockPosition.risk}"`} />
              <Line k="ltv_target" v="0.55" num />
              <Line k="ltv_max" v="0.65" num />
              <Line k="defense_hf" v="1.30" num />
              <Line k="buffer_min" v="0.10" num />
            </div>
          </div>

          {/* Copyable hash + raw file */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={copyHash}
              className={`group inline-flex items-center gap-2 rounded-full border px-3 py-2 font-mono text-[12px] transition-colors ${
                copied ? "confirm-flash" : ""
              } border-border-strong/70 bg-surface-2/40 text-fg-muted hover:text-fg`}
              title="Copy hash"
            >
              {copied ? (
                <Check size={13} className="text-[var(--color-emerald-soft)]" />
              ) : (
                <Copy size={13} />
              )}
              <span className="tabular-nums">{mockPosition.manifestoHash}</span>
            </button>
            <a
              href={mockPosition.manifestoBlobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-violet-soft transition-colors hover:text-white"
            >
              View raw file
              <ArrowUpRight size={14} />
            </a>
          </div>
        </article>
      </div>
    </AppShell>
  );
}

function Chip({
  children,
  tone,
  dot,
}: {
  children: React.ReactNode;
  tone?: string;
  dot?: boolean;
}) {
  if (tone) {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] uppercase tracking-[0.1em]"
        style={{
          color: tone,
          background: `${tone}14`,
          boxShadow: `0 0 0 1px ${tone}40`,
        }}
      >
        {dot && (
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse-soft"
            style={{ background: tone, boxShadow: `0 0 6px ${tone}` }}
          />
        )}
        {children}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-border-strong/60 bg-surface-2/40 px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-fg-dim">
      {children}
    </span>
  );
}

function Section({
  title,
  intro,
  rows,
  dataMf,
}: {
  title: string;
  intro: string;
  rows: { k: string; v: string; hint?: string }[];
  dataMf?: boolean;
}) {
  return (
    <section className="space-y-4" {...(dataMf ? { "data-mf": "" } : {})}>
      <div>
        <h2 className="text-[18px] font-medium tracking-[-0.01em] text-fg">
          {title}
        </h2>
        <p className="mt-1 text-[13px] text-fg-dim">{intro}</p>
      </div>
      <div className="overflow-hidden rounded-3xl border border-border-strong/60 bg-surface/45 backdrop-blur-md">
        {rows.map((r) => (
          <div
            key={r.k}
            className="group relative flex items-center justify-between border-b border-border/70 px-5 py-4 transition-colors last:border-0 hover:bg-surface-2/40"
          >
            <span
              aria-hidden
              className="absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 bg-[image:var(--gradient-brand)] transition-all duration-300 group-hover:h-7"
            />
            <div>
              <div className="text-[13.5px] text-fg">{r.k}</div>
              {r.hint && (
                <div className="mt-1 text-[11.5px] text-fg-dim">{r.hint}</div>
              )}
            </div>
            <span className="font-mono text-[14px] text-fg tab-nums">{r.v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Line({ k, v, num }: { k: string; v: string; num?: boolean }) {
  return (
    <div>
      <span className="text-fg-dim">{"  "}</span>
      <span className="text-[#7dd0ff]">&quot;{k}&quot;</span>
      <span className="text-fg-dim">: </span>
      <span className={num ? "text-[var(--color-amber)]" : "text-[var(--color-emerald-soft)]"}>
        {v}
      </span>
      <span className="text-fg-dim">,</span>
    </div>
  );
}
