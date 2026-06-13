"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ArrowUpRight,
  Timer,
  ArrowLeftRight,
  FileLock,
} from "lucide-react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

const TECH: React.CSSProperties = {
  fontFamily: "var(--font-tech), ui-sans-serif, system-ui",
};

const topics = [
  "Getting started",
  "How spread works",
  "Agent & Manifesto",
  "Defense engine",
  "Risk profiles",
];

const articles = [
  {
    kicker: "Quickstart",
    readTime: "2 min read",
    icon: Timer,
    title: "Equinox in 60 seconds",
    body: "Sign in with zkLogin, deposit SUI, pick Balanced (LTV 55%). The agent borrows USDC on Suilend, allocates to Scallop and Cetus, and the spread auto-repays your debt — every block.",
  },
  {
    kicker: "Mechanics",
    readTime: "4 min read",
    icon: ArrowLeftRight,
    title: "How spread capture works",
    body: "Borrow APR on Suilend is lower than lend APR on Scallop and Cetus. The agent locks the differential continuously and applies it to your active debt.",
  },
  {
    kicker: "Trust",
    readTime: "3 min read",
    icon: FileLock,
    title: "Reading your Manifesto",
    body: "Every position pins a manifesto to Walrus: LTV target, max LTV, defense thresholds, recycle ratio, buffer, allocation caps. The agent cannot deviate.",
  },
];

export function Academy() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!ref.current) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.fromTo(
        ".academy-char",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.04,
          duration: reduced ? 0.001 : 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".academy-rail-item",
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.05,
          duration: reduced ? 0.001 : 0.6,
          ease: "expo.out",
          scrollTrigger: { trigger: ".academy-rail", start: "top 82%" },
        }
      );
      gsap.fromTo(
        ".academy-entry",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: reduced ? 0.001 : 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: ".academy-list", start: "top 84%" },
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger && ref.current?.contains(st.trigger as Element))
            st.kill();
        });
      };
    },
    { scope: ref }
  );

  const [featured, ...rest] = articles;
  const FeaturedIcon = featured.icon;

  return (
    <section
      id="academy"
      ref={ref}
      className="relative bg-white py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          {/* Left rail — title + topic index + CTA */}
          <aside className="academy-rail lg:sticky lg:top-24 lg:self-start">
            <span
              className="text-[11px] uppercase tracking-[0.22em] text-[#0a0a0a]/45"
              style={TECH}
            >
              Learn
            </span>
            <h2
              className="mt-3 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#0a0a0a]"
              style={{
                fontFamily:
                  "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system",
              }}
            >
              <span className="inline-flex overflow-hidden align-baseline">
                {"Academy".split("").map((ch, i) => (
                  <span
                    key={i}
                    className="academy-char inline-block will-change-transform"
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </h2>
            <p
              className="mt-4 max-w-xs text-[14px] leading-relaxed text-[#0a0a0a]/55"
              style={TECH}
            >
              Short, plain-language explainers for everything the agent does on
              your behalf.
            </p>

            <ul className="mt-8 space-y-1 border-t border-[#0a0a0a]/10 pt-4">
              {topics.map((t, i) => (
                <li key={t} className="academy-rail-item">
                  <span
                    className="group flex cursor-default items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] text-[#0a0a0a]/70 transition-colors hover:bg-[#0a0a0a]/[0.04] hover:text-[#0a0a0a]"
                    style={TECH}
                  >
                    <span className="font-mono text-[11px] text-[#0a0a0a]/35 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t}
                    <ArrowRight className="ml-auto size-3.5 -translate-x-1 text-[#0a0a0a]/0 transition-all group-hover:translate-x-0 group-hover:text-[#0a0a0a]/40" />
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="https://github.com/EzraNahumury"
              target="_blank"
              rel="noreferrer"
              className="academy-rail-item group mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#0a0a0a] py-1.5 pl-5 pr-1.5 text-white transition-transform hover:-translate-y-0.5"
            >
              <span className="text-sm font-medium" style={TECH}>
                Read the docs
              </span>
              <span
                aria-hidden
                className="grid size-9 place-items-center rounded-full text-white"
                style={{ background: "var(--gradient-brand)" }}
              >
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </aside>

          {/* Right — featured + stacked list */}
          <div className="academy-list flex flex-col gap-4">
            {/* Featured */}
            <article className="academy-entry group relative overflow-hidden rounded-[1.75rem] bg-[#0a0a0a]/[0.035] p-7 transition-colors hover:bg-[#0a0a0a]/[0.06] sm:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-60 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(145,129,245,0.18), transparent 70%)",
                }}
              />
              <div className="relative flex items-center gap-3">
                <span
                  className="grid size-11 place-items-center rounded-2xl text-white"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <FeaturedIcon className="size-5" strokeWidth={1.7} />
                </span>
                <div className="flex flex-col">
                  <span
                    className="text-[11px] uppercase tracking-[0.16em] text-[#0a0a0a]/45"
                    style={TECH}
                  >
                    {featured.kicker} · Featured
                  </span>
                  <span
                    className="text-[12px] text-[#0a0a0a]/45"
                    style={TECH}
                  >
                    {featured.readTime}
                  </span>
                </div>
                <span className="ml-auto grid size-10 place-items-center rounded-full bg-white text-[#0a0a0a] ring-1 ring-[#0a0a0a]/10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
              <h3
                className="relative mt-7 text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-tight tracking-tight text-[#0a0a0a]"
                style={TECH}
              >
                {featured.title}
              </h3>
              <p
                className="relative mt-3 max-w-xl text-[14.5px] leading-relaxed text-[#0a0a0a]/60"
                style={TECH}
              >
                {featured.body}
              </p>
            </article>

            {/* Stacked rows */}
            {rest.map((a) => {
              const Icon = a.icon;
              return (
                <article
                  key={a.title}
                  className="academy-entry group flex items-start gap-4 rounded-[1.5rem] bg-[#0a0a0a]/[0.035] p-5 transition-colors hover:bg-[#0a0a0a]/[0.06] sm:gap-5 sm:p-6"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-[#0a0a0a] ring-1 ring-[#0a0a0a]/10">
                    <Icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div
                      className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#0a0a0a]/45"
                      style={TECH}
                    >
                      <span>{a.kicker}</span>
                      <span className="text-[#0a0a0a]/25">·</span>
                      <span>{a.readTime}</span>
                    </div>
                    <h3
                      className="mt-1.5 text-[17px] font-semibold leading-snug text-[#0a0a0a] sm:text-[18px]"
                      style={TECH}
                    >
                      {a.title}
                    </h3>
                    <p
                      className="mt-1.5 text-[13.5px] leading-relaxed text-[#0a0a0a]/55"
                      style={TECH}
                    >
                      {a.body}
                    </p>
                  </div>
                  <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full bg-white text-[#0a0a0a] ring-1 ring-[#0a0a0a]/10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight className="size-4" />
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
