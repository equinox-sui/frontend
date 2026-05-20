"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { LoginModal } from "@/components/modals/LoginModal";

export function CallToAction() {
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <section className="relative pt-24 pb-8 sm:pt-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] border border-white/[0.08] bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-white/[0.04] p-10 sm:p-16">
            <div
              className="pointer-events-none absolute -top-20 right-[-10%] h-[360px] w-[360px] rounded-full bg-[var(--color-accent)]/18 blur-[100px]"
              aria-hidden
            />
            <div
              className="bg-grid-fine pointer-events-none absolute inset-0 opacity-25"
              aria-hidden
            />
            <div className="relative grid items-end gap-10 md:grid-cols-[1.4fr_1fr]">
              <div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-200">
                  Ready in 90 seconds
                </span>
                <h2 className="mt-6 text-[40px] font-medium leading-[1.05] tracking-[-0.025em] text-ink-50 sm:text-[56px]">
                  Deposit once.
                  <br />
                  <span className="italic font-light text-ink-300">
                    Then forget about it.
                  </span>
                </h2>
                <p className="mt-5 max-w-md text-[15px] text-ink-300">
                  You walk away. The agent borrows, allocates, rebalances,
                  defends, and pays the debt down — automatically.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 md:items-end">
                <MagneticButton
                  onClick={() => setLoginOpen(true)}
                  className="inline-flex h-14 items-center gap-3 rounded-full bg-[var(--color-accent)] px-7 text-[15px] font-medium text-ink-950 shadow-[0_0_0_1px_rgba(228,243,61,0.45),0_28px_60px_-18px_rgba(228,243,61,0.6)]"
                >
                  Open my position
                  <ArrowRight size={17} />
                </MagneticButton>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
                  No gas. No seed phrase. Just an email.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  );
}
