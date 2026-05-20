import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const COLS = [
  {
    label: "Product",
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/#why", label: "Why Equinox" },
      { href: "/manifesto", label: "Manifesto" },
      { href: "/dashboard", label: "Dashboard" },
    ],
  },
  {
    label: "Resources",
    links: [
      { href: "/#faq", label: "FAQ" },
      { href: "/#risk", label: "Risk disclosure" },
      { href: "/#audits", label: "Audits" },
      { href: "/#brand", label: "Brand kit" },
    ],
  },
  {
    label: "Legal",
    links: [
      { href: "/#terms", label: "Terms of service" },
      { href: "/#privacy", label: "Privacy policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.06]">
      <div className="bg-grid mask-fade-edges absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-ink-300">
              Self-repaying loans on Sui. Deposit collateral, choose a risk
              profile, and let the agent capture the spread for you.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase text-ink-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-positive)] animate-pulse-soft" />
              Mainnet · Audited by OtterSec
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.label}>
              <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400">
                {col.label}
              </div>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13.5px] text-ink-200 transition-colors hover:text-ink-50"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 text-[12px] text-ink-400 md:flex-row md:items-center">
          <div className="font-mono tracking-tight">
            © 2026 Equinox Labs · v0.1.0
          </div>
          <div className="flex items-center gap-5">
            <span>Built on Sui</span>
            <span className="h-1 w-1 rounded-full bg-ink-500" aria-hidden />
            <span>Powered by zkLogin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
