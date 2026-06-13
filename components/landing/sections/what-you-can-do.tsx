"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Lock, Repeat, Wallet } from "lucide-react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { whatYouCanDo } from "@/lib/content";
import { DepositChart } from "../visuals/deposit-chart";
import { ReputationGauge } from "../visuals/reputation-gauge";
import { BadgeStack } from "../visuals/badge-stack";

const TECH: React.CSSProperties = {
  fontFamily: "var(--font-tech), ui-sans-serif, system-ui",
};

const META = [
  { num: "01", kicker: "Deposit", tag: "Untouched", icon: Lock, accent: "#5cd8ff" },
  { num: "02", kicker: "Borrow + recycle", tag: "Automatic", icon: Repeat, accent: "#b6a8ff" },
  { num: "03", kicker: "Withdraw", tag: "Spendable", icon: Wallet, accent: "#ff9aae" },
] as const;

export function WhatYouCanDo() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!ref.current) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Char-level title reveal (line-masked).
      gsap.fromTo(
        ".wycd-char",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.018,
          duration: reduced ? 0.001 : 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );

      // Bento tiles rise + fade, slightly out of lockstep so it doesn't read
      // as a uniform grid pop.
      gsap.fromTo(
        ".wycd-tile",
        { opacity: 0, y: 56, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.14,
          duration: reduced ? 0.001 : 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".wycd-grid", start: "top 82%" },
        }
      );

      if (!reduced) {
        // The pipeline rail "flows" — dash offset travels the connector once
        // the grid is in view, then the flow dots pulse along it.
        gsap.fromTo(
          ".wycd-rail-path",
          { strokeDashoffset: 240 },
          {
            strokeDashoffset: 0,
            duration: 1.3,
            ease: "power2.out",
            scrollTrigger: { trigger: ".wycd-grid", start: "top 75%" },
          }
        );
        gsap.utils.toArray<HTMLElement>(".wycd-flow").forEach((el, i) => {
          gsap.to(el, {
            opacity: 0.25,
            duration: 1.2 + (i % 3) * 0.3,
            delay: i * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger && ref.current?.contains(st.trigger as Element))
            st.kill();
        });
      };
    },
    { scope: ref }
  );

  const cards = whatYouCanDo.cards;

  return (
    <section
      id="capabilities"
      ref={ref}
      className="relative isolate overflow-hidden py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        {/* Header — left aligned, asymmetric (not centered) */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2
            className="max-w-[14ch] text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-fg"
            style={{
              fontFamily:
                "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system",
            }}
          >
            {whatYouCanDo.title.split(" ").map((word, wi) => (
              <span
                key={wi}
                className="mr-[0.24em] inline-flex overflow-hidden align-baseline"
              >
                {word.split("").map((ch, ci) => (
                  <span
                    key={ci}
                    className="wycd-char inline-block will-change-transform"
                  >
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p
            className="max-w-sm text-[14.5px] leading-relaxed text-fg-muted lg:pb-2 lg:text-right"
            style={TECH}
          >
            One deposit becomes a self-repaying loan. Follow the money through
            the three balances the agent manages on your behalf.
          </p>
        </div>

        {/* Bento — one tall tile + two stacked, with a flowing pipeline rail */}
        <div className="wycd-grid relative mt-16 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
          {/* Connector rail (desktop only) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient id="wycd-rail" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#5cd8ff" />
                <stop offset="50%" stopColor="#9181f5" />
                <stop offset="100%" stopColor="#ff7a90" />
              </linearGradient>
            </defs>
            <path
              className="wycd-rail-path"
              d="M 58 50 H 62"
              fill="none"
              stroke="url(#wycd-rail)"
              strokeWidth="0.4"
              strokeDasharray="240"
              vectorEffect="non-scaling-stroke"
              opacity="0.5"
            />
          </svg>

          {/* Tile 01 — large hero, left, spans both rows */}
          <BentoTile
            metaIndex={0}
            name={cards[0].name}
            body={cards[0].body}
            className="lg:col-span-7 lg:row-span-2"
            visualClassName="aspect-[16/10] lg:aspect-[16/9]"
            big
          >
            <DepositChart />
          </BentoTile>

          {/* Tile 02 — top right */}
          <BentoTile
            metaIndex={1}
            name={cards[1].name}
            body={cards[1].body}
            className="lg:col-span-5"
            visualClassName="aspect-[16/7]"
          >
            <ReputationGauge />
          </BentoTile>

          {/* Tile 03 — bottom right */}
          <BentoTile
            metaIndex={2}
            name={cards[2].name}
            body={cards[2].body}
            className="lg:col-span-5"
            visualClassName="aspect-[16/7]"
          >
            <BadgeStack />
          </BentoTile>
        </div>
      </div>
    </section>
  );
}

function BentoTile({
  metaIndex,
  name,
  body,
  className,
  visualClassName,
  big,
  children,
}: {
  metaIndex: number;
  name: string;
  body: string;
  className?: string;
  visualClassName?: string;
  big?: boolean;
  children: React.ReactNode;
}) {
  const m = META[metaIndex];
  const Icon = m.icon;
  return (
    <article
      className={`wycd-tile group relative z-10 flex flex-col overflow-hidden rounded-[1.75rem] border border-border-strong/60 bg-surface/45 p-6 backdrop-blur-md transition-colors duration-500 will-change-transform hover:border-border-strong sm:p-7 ${className ?? ""}`}
      style={TECH}
    >
      {/* Oversized ghost numeral */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-6 select-none font-medium leading-none text-white/[0.04]"
        style={{
          fontSize: big ? "clamp(7rem,12vw,12rem)" : "clamp(5rem,8vw,8rem)",
          fontFamily:
            "var(--font-geist-sans), ui-sans-serif, system-ui",
        }}
      >
        {m.num}
      </span>

      {/* Accent wash on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `${m.accent}26` }}
      />

      {/* Kicker row */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="grid h-8 w-8 place-items-center rounded-lg border"
            style={{
              borderColor: `${m.accent}55`,
              background: `${m.accent}14`,
              color: m.accent,
            }}
          >
            <Icon size={14} strokeWidth={1.9} />
          </span>
          <span className="text-[10.5px] uppercase tracking-[0.2em] text-fg-dim">
            {m.kicker}
          </span>
        </div>
        <span
          className="rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]"
          style={{
            borderColor: `${m.accent}40`,
            background: `${m.accent}12`,
            color: m.accent,
          }}
        >
          {m.tag}
        </span>
      </div>

      {/* Visual */}
      <div
        className={`relative mt-6 w-full overflow-hidden rounded-[1.25rem] border border-border bg-bg/70 ${visualClassName ?? ""}`}
      >
        {children}
        {/* flow dot anchored to the visual edge — part of the pipeline motif */}
        <span
          className="wycd-flow absolute right-3 top-3 h-1.5 w-1.5 rounded-full"
          style={{ background: m.accent, boxShadow: `0 0 8px ${m.accent}` }}
          aria-hidden
        />
      </div>

      {/* Copy */}
      <div className="relative mt-6 flex flex-1 flex-col">
        <h3
          className="flex items-center gap-2 text-[18px] font-semibold tracking-tight text-fg transition-transform duration-500 group-hover:translate-x-0.5 sm:text-xl"
          style={TECH}
        >
          {name}
        </h3>
        <p
          className="mt-2.5 max-w-prose text-[13.5px] leading-relaxed text-fg-muted sm:text-[14.5px]"
          style={TECH}
        >
          {body}
        </p>
        <span
          aria-hidden
          className="mt-auto inline-flex w-fit items-center gap-1 pt-5 text-[12px] font-medium opacity-0 transition-all duration-500 group-hover:opacity-100"
          style={{ color: m.accent }}
        >
          Learn more
          <ArrowUpRight size={13} />
        </span>
      </div>
    </article>
  );
}
