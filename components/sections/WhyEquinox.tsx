import { Check, X } from "lucide-react";
import { comparisonRows } from "@/data/mock";
import { Reveal } from "@/components/motion/Reveal";

export function WhyEquinox() {
  return (
    <section id="why" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="grid items-start gap-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="md:sticky md:top-28">
              <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-300">
                Why Equinox
              </span>
              <h2 className="mt-4 text-[34px] font-medium leading-[1.05] tracking-[-0.02em] text-ink-50 sm:text-[44px]">
                DeFi lending,{" "}
                <span className="italic font-light text-ink-300">without the babysitting.</span>
              </h2>
              <p className="mt-5 max-w-md text-[15px] text-ink-300">
                Aave and Suilend are infrastructure. They give you a borrow.
                Equinox is the agent on top — it takes the loan, allocates it,
                rebalances it, and defends it. You don&apos;t open the app.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent">
              <div className="grid grid-cols-[1.4fr_1fr_1fr] items-center gap-3 border-b border-white/[0.06] px-6 py-4 text-[11px] uppercase tracking-[0.16em] text-ink-400 sm:px-8">
                <div>What it takes</div>
                <div className="flex items-center gap-2 text-ink-50">
                  <span className="grid h-5 w-5 place-items-center rounded-md bg-[var(--color-accent)] text-ink-950">
                    <svg width={11} height={11} viewBox="0 0 12 12" aria-hidden>
                      <path d="M2 6.5l3 3 5-7" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Equinox
                </div>
                <div className="text-ink-400">Aave · Suilend</div>
              </div>

              <ul>
                {comparisonRows.map((row, i) => (
                  <li
                    key={row.label}
                    className="grid grid-cols-[1.4fr_1fr_1fr] items-center gap-3 border-b border-white/[0.04] px-6 py-5 last:border-0 sm:px-8"
                  >
                    <div className="text-[14px] text-ink-100">{row.label}</div>
                    <div className="flex items-center gap-2.5 text-[13.5px] text-ink-50">
                      <Check size={14} className="text-[var(--color-accent)]" />
                      <span>{row.equinox}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[13.5px] text-ink-400">
                      <X size={14} className="text-[var(--color-danger)]/70" />
                      <span>{row.competitors}</span>
                    </div>
                    {/* zebra accent on every 2nd row via i for variety */}
                    {i === 5 && (
                      <span className="col-span-3 mt-2 inline-block rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                        That&apos;s the whole pitch.
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
