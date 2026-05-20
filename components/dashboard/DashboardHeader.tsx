"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ScrollText, X } from "lucide-react";
import { mockPosition, mockUser } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ClosePositionModal } from "@/components/modals/ClosePositionModal";

export function DashboardHeader() {
  const [closeOpen, setCloseOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[12px] text-ink-400">
            <span>Welcome back, {mockUser.name}</span>
            <span aria-hidden>·</span>
            <span className="font-mono uppercase tracking-[0.1em]">
              Position #001284
            </span>
          </div>
          <h1 className="text-[34px] font-medium leading-[1.05] tracking-[-0.02em] text-ink-50 sm:text-[42px]">
            Your agent is working.
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent" dot>
              Balanced · LTV {Math.round(mockPosition.ltv * 100)}%
            </Badge>
            <Badge tone="muted">{mockPosition.mode}</Badge>
            <Badge tone="muted">Manifesto v{mockPosition.manifestoVersion}</Badge>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/manifesto"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-[13px] text-ink-100 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
          >
            <ScrollText size={14} />
            View manifesto
            <ChevronRight size={14} className="text-ink-400" />
          </Link>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setCloseOpen(true)}
            className="!h-10"
          >
            <X size={14} />
            Close position
          </Button>
        </div>
      </div>
      <ClosePositionModal open={closeOpen} onClose={() => setCloseOpen(false)} />
    </>
  );
}
