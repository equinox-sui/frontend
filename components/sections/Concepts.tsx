import { Reveal } from "@/components/motion/Reveal";

const CONCEPTS = [
  {
    n: "01",
    name: "Collateral",
    blurb:
      "Your SUI. Stays whole the entire time. Only acts as security for the loan.",
    chip: "Untouched",
    color: "from-white/8 to-white/[0.02]",
  },
  {
    n: "02",
    name: "Active Debt",
    blurb:
      "USDC the agent borrowed in your name. You never repay it manually — the spread does.",
    chip: "Managed",
    color: "from-[#7dd0ff]/12 to-white/[0.02]",
  },
  {
    n: "03",
    name: "Shadow Wallet",
    blurb:
      "USDC bonus that builds up from collateral appreciation. Withdrawable any time, no fee.",
    chip: "Spendable",
    color: "from-[var(--color-accent)]/12 to-white/[0.02]",
  },
];

export function Concepts() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <div className="mb-12 flex flex-col gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-300 w-fit">
              Three balances. That&apos;s it.
            </span>
            <h2 className="max-w-2xl text-[30px] font-medium leading-[1.1] tracking-[-0.02em] text-ink-50 sm:text-[40px]">
              Everything the agent does maps to one of these.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {CONCEPTS.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.06}>
              <article
                className={`relative h-full overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b ${c.color} p-7`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                    {c.n}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10.5px] uppercase tracking-[0.14em] text-ink-200">
                    {c.chip}
                  </span>
                </div>
                <h3 className="mt-10 text-[26px] font-medium tracking-[-0.015em] text-ink-50">
                  {c.name}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-300">
                  {c.blurb}
                </p>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-16 -right-12 h-44 w-44 rounded-full bg-white/[0.025] blur-2xl"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
