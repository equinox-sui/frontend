"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { mockPosition, SUI_PRICE } from "@/data/mock";
import { formatUSD } from "@/lib/format";

function statusForHF(hf: number) {
  if (hf >= 1.5) return { label: "Safe", tone: "positive", color: "#6ddf9b" };
  if (hf >= 1.3) return { label: "Caution", tone: "warning", color: "#f0c34a" };
  return { label: "Defense active", tone: "danger", color: "#ff6b6b" };
}

export function HealthGauge() {
  const ref = useRef<HTMLDivElement | null>(null);
  const arcRef = useRef<SVGCircleElement | null>(null);

  const hf = mockPosition.healthFactor;
  const status = statusForHF(hf);

  // Map HF to 0..1 fill (cap at 2.5)
  const fill = Math.min(1, Math.max(0, (hf - 1.0) / 1.5));

  // Arc circumference
  const r = 86;
  const C = 2 * Math.PI * r;
  const dash = C * 0.75; // 270deg arc
  const offset = dash * (1 - fill);

  useEffect(() => {
    const arc = arcRef.current;
    if (!arc) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      arc.style.strokeDashoffset = String(offset);
      return;
    }
    gsap.fromTo(
      arc,
      { strokeDashoffset: dash },
      {
        strokeDashoffset: offset,
        duration: 1.6,
        ease: "expo.out",
      },
    );
  }, [offset, dash]);

  return (
    <article
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[var(--bg-card)]/55 p-6"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] uppercase tracking-[0.16em] text-ink-400">
          Health Factor
        </span>
        <span
          className="rounded-full border px-2.5 py-1 text-[10.5px] uppercase tracking-[0.14em]"
          style={{
            color: status.color,
            borderColor: `${status.color}40`,
            background: `${status.color}10`,
          }}
        >
          {status.label}
        </span>
      </div>

      <div className="relative mx-auto mt-4 flex h-[200px] w-full max-w-[240px] items-center justify-center">
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 -rotate-[225deg]"
          aria-hidden
        >
          <defs>
            <linearGradient id="hf-track" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="86"
            fill="none"
            stroke="url(#hf-track)"
            strokeWidth="10"
            strokeDasharray={`${dash} ${C}`}
            strokeLinecap="round"
          />
          <circle
            ref={arcRef}
            cx="100"
            cy="100"
            r="86"
            fill="none"
            stroke={status.color}
            strokeWidth="10"
            strokeDasharray={`${dash} ${C}`}
            strokeDashoffset={dash}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 12px ${status.color}80)`,
              transition: "stroke 600ms ease",
            }}
          />
        </svg>
        <div className="flex flex-col items-center">
          <span
            className="text-[44px] font-medium leading-none tracking-tight tab-nums"
            style={{ color: status.color }}
          >
            {hf.toFixed(2)}
          </span>
          <span className="mt-2 text-[11px] uppercase tracking-[0.16em] text-ink-400">
            HF
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-white/[0.04] pt-5">
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-ink-400">
            Liquidation
          </div>
          <div className="mt-1.5 font-mono text-[15px] text-ink-50 tab-nums">
            {formatUSD(mockPosition.liquidationPrice, { decimals: 2 })}
          </div>
        </div>
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-ink-400">
            SUI now
          </div>
          <div className="mt-1.5 font-mono text-[15px] text-ink-50 tab-nums">
            {formatUSD(SUI_PRICE, { decimals: 2 })}
          </div>
        </div>
      </div>
    </article>
  );
}
