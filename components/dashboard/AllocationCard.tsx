import { mockPosition } from "@/data/mock";
import { formatUSD } from "@/lib/format";

export function AllocationCard() {
  const total = mockPosition.allocations.scallop + mockPosition.allocations.cetus;
  const scallopPct = (mockPosition.allocations.scallop / total) * 100;
  const cetusPct = 100 - scallopPct;

  return (
    <article className="overflow-hidden rounded-3xl border border-white/[0.06] bg-[var(--bg-card)]/55 p-6">
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] uppercase tracking-[0.16em] text-ink-400">
          Agent allocation
        </span>
        <span className="font-mono text-[12px] text-ink-300 tab-nums">
          {formatUSD(total)} deployed
        </span>
      </div>

      <div className="mt-6 flex h-2.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
        <div
          className="h-full bg-[var(--color-accent)]"
          style={{ width: `${scallopPct}%` }}
        />
        <div
          className="h-full bg-[#7dd0ff]"
          style={{ width: `${cetusPct}%` }}
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <AllocationRow
          color="bg-[var(--color-accent)]"
          name="Scallop"
          venue="USDC lending"
          amount={mockPosition.allocations.scallop}
          pct={scallopPct}
          apr="6.2%"
        />
        <AllocationRow
          color="bg-[#7dd0ff]"
          name="Cetus"
          venue="USDC/USDT LP"
          amount={mockPosition.allocations.cetus}
          pct={cetusPct}
          apr="9.8%"
        />
      </div>
    </article>
  );
}

function AllocationRow({
  color,
  name,
  venue,
  amount,
  pct,
  apr,
}: {
  color: string;
  name: string;
  venue: string;
  amount: number;
  pct: number;
  apr: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4">
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
        <span className="text-[13.5px] text-ink-50">{name}</span>
        <span className="ml-auto font-mono text-[11px] text-ink-400 tab-nums">
          {pct.toFixed(0)}%
        </span>
      </div>
      <div className="mt-3 font-mono text-[18px] text-ink-50 tab-nums">
        {formatUSD(amount)}
      </div>
      <div className="mt-1 flex items-center justify-between text-[11.5px] text-ink-400">
        <span>{venue}</span>
        <span className="font-mono text-[var(--color-positive)] tab-nums">
          {apr} APR
        </span>
      </div>
    </div>
  );
}
