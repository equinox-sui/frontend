"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";

/* Static partner pills — no marquee. */

type Partner = {
  label: string;
  icon: React.ReactNode;
  accent?: string;
};

const PARTNERS: Partner[] = [
  { label: "Sui", icon: <SuiLogo />, accent: "#4da2ff" },
  { label: "Suilend", icon: <SuilendLogo />, accent: "#ffd44d" },
  { label: "Scallop", icon: <ScallopLogo />, accent: "#ff6f3d" },
  { label: "Cetus", icon: <CetusLogo />, accent: "#5cd8ff" },
  { label: "Walrus", icon: <WalrusLogo />, accent: "#6ddf9b" },
];

type Props = {
  /**
   * "default" renders with full animated bg blobs and grid mask.
   * "bare" renders only the partner row, expecting the parent section
   * to provide background context.
   */
  variant?: "default" | "bare";
};

export function StackMarquee({ variant = "default" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();

      gsap.fromTo(
        ".partner-pill",
        { opacity: 0, y: 22, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );

      if (variant === "default") {
        gsap.to(".stack-blob-a", {
          x: 60,
          y: -20,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".stack-blob-b", {
          x: -50,
          y: 30,
          duration: 17,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className={
        variant === "bare"
          ? "relative isolate overflow-hidden py-2"
          : "relative isolate overflow-hidden py-16 sm:py-24"
      }
      aria-label="Stack and ecosystem"
    >
      {variant === "default" && (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="stack-blob-a absolute -top-24 left-[10%] size-[420px] rounded-full bg-violet/15 blur-[140px]" />
            <div className="stack-blob-b absolute top-10 right-[12%] size-[420px] rounded-full bg-indigo/10 blur-[140px]" />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-dot-grid opacity-[0.10]"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
            }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-5">
          {PARTNERS.map((p) => (
            <Pill key={p.label} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Pill({ label, icon, accent }: Partner) {
  return (
    <div
      className="partner-pill group relative flex h-[78px] items-center justify-center gap-3 overflow-hidden rounded-full border border-white/[0.06] transition-all duration-300 will-change-transform hover:-translate-y-0.5 hover:border-white/15"
      style={{
        background:
          "linear-gradient(180deg, rgba(28,28,30,0.85) 0%, rgba(19,21,18,0.9) 100%)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.05) inset, 0 12px 30px -16px rgba(0,0,0,0.55)",
      }}
    >
      {/* Subtle accent glow that picks up on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: accent
            ? `radial-gradient(60% 80% at 20% 50%, ${accent}26, transparent 70%)`
            : undefined,
        }}
      />
      <span
        aria-hidden
        className="relative grid size-9 shrink-0 place-items-center"
      >
        {icon}
      </span>
      <span
        className="relative text-[18px] font-medium tracking-[-0.005em] text-fg sm:text-[19px]"
        style={{ fontFamily: "var(--font-tech), ui-sans-serif, system-ui" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ===== Inline brand-ish logos (stylized, not exact trademarks) ===== */

function SuiLogo() {
  return (
    <svg viewBox="0 0 28 28" width={26} height={26} aria-hidden fill="none">
      <defs>
        <linearGradient id="sui-g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7dd0ff" />
          <stop offset="100%" stopColor="#4da2ff" />
        </linearGradient>
      </defs>
      <path
        d="M14 3c-3.5 4.6-8 8-8 12.6a8 8 0 0 0 16 0C22 11 18.5 7.6 14 3zm0 18.8a6.2 6.2 0 0 1-6.2-6.2c0-3 2.6-5.5 6.2-10 3.6 4.5 6.2 7 6.2 10a6.2 6.2 0 0 1-6.2 6.2z"
        fill="url(#sui-g)"
      />
    </svg>
  );
}

function SuilendLogo() {
  return (
    <svg viewBox="0 0 28 28" width={26} height={26} aria-hidden fill="none">
      <defs>
        <linearGradient id="suilend-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffe27a" />
          <stop offset="100%" stopColor="#ffb648" />
        </linearGradient>
      </defs>
      <rect
        x="4"
        y="4"
        width="20"
        height="20"
        rx="6"
        stroke="url(#suilend-g)"
        strokeWidth="1.6"
      />
      <path
        d="M9 18V10h2v6h4v2H9zm10-8h-2v8h-2v2h4V10z"
        fill="url(#suilend-g)"
      />
    </svg>
  );
}

function ScallopLogo() {
  return (
    <svg viewBox="0 0 28 28" width={26} height={26} aria-hidden fill="none">
      <defs>
        <linearGradient id="scallop-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff9466" />
          <stop offset="100%" stopColor="#ff5a2a" />
        </linearGradient>
      </defs>
      <path
        d="M14 4c5.5 0 10 4.5 10 10v2H4v-2c0-5.5 4.5-10 10-10zm0 2c-4.4 0-8 3.6-8 8h2c0-3.3 2.7-6 6-6s6 2.7 6 6h2c0-4.4-3.6-8-8-8z"
        fill="url(#scallop-g)"
      />
      <path
        d="M9.5 22c.6 1.4 2.4 2.5 4.5 2.5s3.9-1.1 4.5-2.5"
        stroke="url(#scallop-g)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CetusLogo() {
  return (
    <svg viewBox="0 0 28 28" width={26} height={26} aria-hidden fill="none">
      <defs>
        <linearGradient id="cetus-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#7df0ff" />
          <stop offset="100%" stopColor="#3aa9ff" />
        </linearGradient>
      </defs>
      <circle cx="14" cy="14" r="10" stroke="url(#cetus-g)" strokeWidth="1.5" />
      <path
        d="M14 7c2.5 3 4 5 4 7a4 4 0 0 1-8 0c0-2 1.5-4 4-7z"
        fill="url(#cetus-g)"
      />
    </svg>
  );
}

function WalrusLogo() {
  return (
    <svg viewBox="0 0 28 28" width={26} height={26} aria-hidden fill="none">
      <defs>
        <linearGradient id="walrus-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#7df0c8" />
          <stop offset="100%" stopColor="#16d9a8" />
        </linearGradient>
      </defs>
      <ellipse
        cx="14"
        cy="14"
        rx="10"
        ry="5"
        stroke="url(#walrus-g)"
        strokeWidth="1.5"
      />
      <ellipse
        cx="14"
        cy="14"
        rx="10"
        ry="5"
        stroke="url(#walrus-g)"
        strokeWidth="1.5"
        transform="rotate(60 14 14)"
        opacity="0.6"
      />
      <ellipse
        cx="14"
        cy="14"
        rx="10"
        ry="5"
        stroke="url(#walrus-g)"
        strokeWidth="1.5"
        transform="rotate(-60 14 14)"
        opacity="0.4"
      />
    </svg>
  );
}
