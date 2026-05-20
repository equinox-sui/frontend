const PARTNERS = [
  { name: "Sui", letters: "SUI" },
  { name: "Mysten Labs", letters: "MYSTEN" },
  { name: "Suilend", letters: "SUILEND" },
  { name: "Scallop", letters: "SCALLOP" },
  { name: "Cetus", letters: "CETUS" },
  { name: "Pyth", letters: "PYTH" },
  { name: "Walrus", letters: "WALRUS" },
  { name: "OtterSec", letters: "OTTERSEC" },
];

export function PartnerMarquee() {
  return (
    <section className="relative py-12">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <p className="mb-6 text-center text-[11px] uppercase tracking-[0.2em] text-ink-500">
          Plugged into the best of Sui
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[var(--bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[var(--bg)] to-transparent" />
        <div className="animate-marquee flex w-max items-center gap-14 whitespace-nowrap py-2">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="flex items-center gap-3 text-ink-400"
            >
              <span
                aria-hidden
                className="grid h-7 w-7 place-items-center rounded-md border border-white/10 bg-white/[0.03] font-mono text-[10px] tracking-[0.05em] text-ink-200"
              >
                {p.letters.slice(0, 2)}
              </span>
              <span className="text-[15px] font-medium tracking-[-0.005em] text-ink-200">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
