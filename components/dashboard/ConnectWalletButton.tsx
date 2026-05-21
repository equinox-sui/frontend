"use client";

/**
 * Wallet/auth entry point in the dashboard top bar.
 *
 * Today it renders the in-house ConnectWalletModal (custom UI). To swap
 * in Privy's hosted modal, see PRIVY_SETUP.md at the repo root — Privy v3
 * bundles with pnpm-style paths, so install with `pnpm install` (not
 * `npm install`) and then uncomment the Privy branch in this file plus
 * the PrivyAppProvider import in app/layout.tsx.
 */

import { useState } from "react";
import { Wallet } from "lucide-react";
import { cn } from "@/lib/cn";
import { ConnectWalletModal } from "./ConnectWalletModal";

export function ConnectWalletButton() {
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group inline-flex h-10 items-center gap-2 rounded-full pl-3 pr-4 text-[13px] font-medium transition-all",
          connected
            ? "border border-[var(--color-positive)]/30 bg-[var(--color-positive)]/8 text-[var(--color-positive)]"
            : "border border-white/[0.08] bg-white/[0.02] text-ink-50 hover:border-white/20 hover:bg-white/[0.05]"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "grid h-6 w-6 place-items-center rounded-full",
            connected ? "bg-[var(--color-positive)]/15" : "bg-white/[0.06]"
          )}
        >
          <Wallet size={12} />
        </span>
        {connected ? "Connected" : "Connect Wallet"}
        {connected && (
          <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[var(--color-positive)] animate-pulse-soft" />
        )}
      </button>
      <ConnectWalletModal
        open={open}
        onClose={() => {
          setOpen(false);
          setConnected(true);
        }}
      />
    </>
  );
}
