"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, ShieldCheck, FileCheck2 } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { HalftoneField } from "../visuals/halftone-field";
import { StackMarquee } from "./stack-marquee";

const TECH: React.CSSProperties = {
  fontFamily: "var(--font-tech), ui-sans-serif, system-ui",
};

export function SecurityIntegrations() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!ref.current) return;

      gsap.fromTo(
        ".si-title-line",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
        }
      );

      gsap.fromTo(
        ".si-body",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.25,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
        }
      );

      gsap.fromTo(
        ".si-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".si-cards", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".si-partners-label",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: { trigger: ".si-partners-label", start: "top 92%" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section
      id="security"
      ref={ref}
      className="relative isolate overflow-hidden pb-24 pt-28 sm:pt-36"
    >
      {/* Animated halftone bg covers the whole upper section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[820px]">
        <HalftoneField />
        {/* Top mask */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-24"
          style={{
            background: "linear-gradient(to bottom, var(--color-bg), transparent)",
          }}
        />
        {/* Bottom mask */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background: "linear-gradient(to top, var(--color-bg), transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-16">
          <h2
            className="text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.02em] text-fg"
            style={{
              fontFamily: "var(--font-tech), ui-sans-serif, system-ui",
            }}
          >
            <span className="si-title-line block overflow-hidden">
              <span className="inline-block">Security &</span>
            </span>
            <span className="si-title-line block overflow-hidden">
              <span className="inline-block">Integrations</span>
            </span>
          </h2>

          <div className="si-body flex max-w-md items-start gap-3 self-end">
            <span
              aria-hidden
              className="mt-[6px] grid size-5 place-items-center rounded-full border border-border-strong text-fg-dim"
            >
              <Plus className="size-3" />
            </span>
            <p
              className="text-sm leading-relaxed text-fg-muted sm:text-[15px]"
              style={{ fontFamily: "var(--font-tech), ui-sans-serif, system-ui" }}
            >
              Your collateral never leaves the position contract, the agent&apos;s
              behavior is pinned to an immutable manifesto on Walrus, and every
              borrow, lend, and defense event is recorded onchain. A formal
              third-party audit is scheduled ahead of mainnet launch on Sui.
            </p>
          </div>
        </div>

        {/* Trust panels — full-width dark glass, asymmetric 1.2/1 split */}
        <div className="si-cards mt-20 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          {/* Audit panel */}
          <TrustPanel
            icon={ShieldCheck}
            eyebrow="Smart-contract audit"
            title="Audit-ready Move contracts"
            statusLabel="Pre-mainnet"
            statusTone="#ffc46b"
            href="https://github.com/EzraNahumury"
            cta="View on GitHub"
            rows={[
              { k: "Auditor", v: "OtterSec" },
              { k: "Scope", v: "Position · Adapters · Defense" },
              { k: "Critical findings", v: "0", tone: "#6cf2cc" },
            ]}
          />
          {/* Walrus panel */}
          <TrustPanel
            icon={FileCheck2}
            eyebrow="Manifesto on Walrus"
            title="Pinned & immutable"
            statusLabel="Verified"
            statusTone="#6cf2cc"
            href="https://docs.sui.io/"
            cta="View on Walrus"
            rows={[
              { k: "Blob", v: "wal://1f0e9b…cda", mono: true },
              { k: "Hash", v: "0xabc123…c5d", mono: true },
              { k: "Mutable?", v: "No — sealed", tone: "#6cf2cc" },
            ]}
          />
        </div>
      </div>

      {/* Partners */}
      <div className="relative mt-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p
            className="si-partners-label text-[clamp(1.4rem,2.6vw,2rem)] font-medium tracking-[-0.01em] text-fg"
            style={{
              fontFamily: "var(--font-tech), ui-sans-serif, system-ui",
            }}
          >
            Partners
          </p>
        </div>
        <div className="mt-7">
          <StackMarquee variant="bare" />
        </div>
      </div>
    </section>
  );
}

function TrustPanel({
  icon: Icon,
  eyebrow,
  title,
  statusLabel,
  statusTone,
  href,
  cta,
  rows,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  eyebrow: string;
  title: string;
  statusLabel: string;
  statusTone: string;
  href: string;
  cta: string;
  rows: { k: string; v: string; mono?: boolean; tone?: string }[];
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="si-card group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-border-strong/60 bg-surface/45 p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-border-strong sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
        style={{ background: `${statusTone}26` }}
      />
      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 place-items-center rounded-xl border"
            style={{
              borderColor: `${statusTone}44`,
              background: `${statusTone}12`,
              color: statusTone,
            }}
          >
            <Icon className="size-[18px]" strokeWidth={1.8} />
          </span>
          <span
            className="text-[10.5px] uppercase tracking-[0.18em] text-fg-dim"
            style={TECH}
          >
            {eyebrow}
          </span>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] uppercase tracking-[0.14em]"
          style={{
            color: statusTone,
            background: `${statusTone}14`,
            boxShadow: `0 0 0 1px ${statusTone}40`,
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse-soft"
            style={{ background: statusTone, boxShadow: `0 0 6px ${statusTone}` }}
          />
          {statusLabel}
        </span>
      </div>

      <h3
        className="relative mt-6 text-[22px] font-semibold tracking-tight text-fg sm:text-[24px]"
        style={TECH}
      >
        {title}
      </h3>

      <dl className="relative mt-6 divide-y divide-border/70 border-y border-border/70">
        {rows.map((r) => (
          <div key={r.k} className="flex items-center justify-between py-3">
            <dt className="text-[12.5px] text-fg-dim" style={TECH}>
              {r.k}
            </dt>
            <dd
              className={`text-[13px] ${r.mono ? "font-mono tabular-nums" : ""}`}
              style={{ color: r.tone ?? "var(--color-fg)", ...TECH }}
            >
              {r.v}
            </dd>
          </div>
        ))}
      </dl>

      <div className="relative mt-auto flex items-center justify-between pt-6">
        <span className="text-[14px] font-medium text-fg" style={TECH}>
          {cta}
        </span>
        <span
          aria-hidden
          className="grid size-9 place-items-center rounded-full text-white"
          style={{ background: "var(--gradient-brand)" }}
        >
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
        </span>
      </div>
    </Link>
  );
}
