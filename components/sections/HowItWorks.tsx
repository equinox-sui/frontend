"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Reveal } from "@/components/motion/Reveal";

const STEPS = [
  {
    no: "01",
    title: "Deposit SUI",
    body: "Lock your SUI as collateral. It stays whole — only used as security.",
    detail: "1,000 SUI → vault",
    side: [
      { k: "Collateral", v: "1,000 SUI" },
      { k: "USD value", v: "$3,500" },
      { k: "Asset", v: "SUI" },
    ],
  },
  {
    no: "02",
    title: "Agent borrows USDC",
    body: "Suilend is queried for the best USDC rate at your chosen LTV. The loan is opened atomically.",
    detail: "$1,925 USDC @ 55% LTV",
    side: [
      { k: "Source", v: "Suilend" },
      { k: "Borrow APR", v: "4.6%" },
      { k: "Borrowed", v: "$1,925" },
    ],
  },
  {
    no: "03",
    title: "Spread pays you back",
    body: "Agent splits: 60% lands in your wallet, 40% recycles through Scallop + Cetus. The yield differential auto-pays your debt.",
    detail: "Debt repaid via spread",
    side: [
      { k: "To wallet", v: "$1,155" },
      { k: "Scallop", v: "$462" },
      { k: "Cetus LP", v: "$308" },
    ],
  },
];

export function HowItWorks() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              gsap.fromTo(
                el.querySelectorAll("[data-step-row]"),
                { x: -8, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  duration: 0.6,
                  stagger: 0.08,
                  ease: "power3.out",
                },
              );
              io.unobserve(el);
            }
          });
        },
        { threshold: 0.3 },
      );
      steps.forEach((s) => io.observe(s));
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how" ref={rootRef} className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-300">
              Three moves. One deposit.
            </span>
            <h2 className="max-w-2xl text-[34px] font-medium leading-[1.05] tracking-[-0.02em] text-ink-50 sm:text-[44px]">
              You stop. The agent doesn&apos;t.
            </h2>
            <p className="max-w-xl text-[15.5px] text-ink-300">
              No dashboards to check. No rebalance buttons to press. Just the
              three things the agent does after you deposit.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.025] md:grid-cols-3">
          {STEPS.map((s) => (
            <article
              key={s.no}
              data-step
              className="relative flex flex-col gap-7 bg-[var(--bg)]/95 p-7 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">
                  Step {s.no}
                </span>
                <span className="rounded-full border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/8 px-2.5 py-1 text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  Auto
                </span>
              </div>

              <h3 className="text-[24px] font-medium tracking-[-0.015em] text-ink-50">
                {s.title}
              </h3>

              <p className="text-[14.5px] leading-relaxed text-ink-300">
                {s.body}
              </p>

              <div className="mt-auto rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                {s.side.map((row) => (
                  <div
                    key={row.k}
                    data-step-row
                    className="flex items-center justify-between border-b border-white/[0.04] py-2.5 text-[12.5px] last:border-0"
                  >
                    <span className="uppercase tracking-[0.14em] text-ink-400 text-[10.5px]">
                      {row.k}
                    </span>
                    <span className="font-mono text-ink-100 tab-nums">{row.v}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
