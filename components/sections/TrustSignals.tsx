import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { ShieldCheck, Lock, Eye, FileCheck } from "lucide-react";

const PILLARS = [
  {
    icon: ShieldCheck,
    label: "Audit",
    title: "OtterSec, full report",
    detail: "Scope: Move contracts, manifesto registry, oracle path. Zero critical.",
  },
  {
    icon: Eye,
    label: "Manifesto",
    title: "Immutable behavior rules",
    detail: "Stored on Walrus. Your agent cannot deviate. Hash verifiable on chain.",
  },
  {
    icon: Lock,
    label: "Custody",
    title: "Your keys, always",
    detail: "zkLogin signs in your browser. Equinox can't move funds. Backend has no private keys.",
  },
  {
    icon: FileCheck,
    label: "Open",
    title: "Open-source agent",
    detail: "Every routing decision is traceable. Manifesto + audit logs are public.",
  },
];

export function TrustSignals() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div>
              <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-300">
                Trust signals
              </span>
              <h2 className="mt-4 text-[34px] font-medium leading-[1.05] tracking-[-0.02em] text-ink-50 sm:text-[44px]">
                You shouldn&apos;t have to trust us.
              </h2>
              <p className="mt-5 max-w-md text-[15px] text-ink-300">
                You should be able to verify us. Every constraint the agent
                operates under is published, immutable, and auditable.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 sm:max-w-md">
                <BigStat
                  value={4_120_000}
                  prefix="$"
                  compact
                  label="Collateral locked"
                />
                <BigStat value={1284} label="Positions active" />
                <BigStat
                  value={412_580}
                  prefix="$"
                  compact
                  label="Spread captured"
                />
                <BigStat
                  value={99.97}
                  suffix="%"
                  decimals={2}
                  label="Defense success"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-2">
              {PILLARS.map((p) => (
                <article
                  key={p.label}
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:border-white/15"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-ink-100">
                      <p.icon size={16} />
                    </span>
                    <span className="text-[10.5px] uppercase tracking-[0.18em] text-ink-400">
                      {p.label}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[18px] font-medium tracking-[-0.01em] text-ink-50">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-300">
                    {p.detail}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BigStat({
  value,
  prefix,
  suffix,
  compact = false,
  decimals = 0,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  compact?: boolean;
  decimals?: number;
  label: string;
}) {
  return (
    <div>
      <div className="text-[32px] font-medium tracking-tight text-ink-50 tab-nums sm:text-[38px]">
        <Counter
          to={value}
          prefix={prefix}
          suffix={suffix}
          compact={compact}
          decimals={decimals}
        />
      </div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-ink-400">
        {label}
      </div>
    </div>
  );
}
