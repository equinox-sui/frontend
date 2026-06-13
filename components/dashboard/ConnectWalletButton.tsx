"use client";

/**
 * Wallet/auth status pill in the dashboard top bar.
 *
 * When zkLogin is configured (Enoki + Google env vars), this reflects the real
 * connected Sui address from @mysten/dapp-kit and disconnects the Enoki wallet
 * on sign-out. When it's not configured, it falls back to the mock auth state
 * from lib/auth.ts so the demo still runs. Either way sign-in happens through
 * the shared LoginModal (README §2).
 */

import { useState } from "react";
import { Wallet, LogOut } from "lucide-react";
import { auth } from "@/lib/auth";
import { useAuth } from "@/lib/useAuth";
import { useZkLogin } from "@/lib/sui/useZkLogin";
import { mockUser } from "@/data/mock";
import { LoginModal } from "@/components/modals/LoginModal";

export function ConnectWalletButton() {
  const { signedIn, ready } = useAuth();
  const { address, isConnected, disconnect } = useZkLogin();
  const [open, setOpen] = useState(false);

  const connected = isConnected || signedIn;

  // Avoid flashing "Connect Wallet" for a signed-in user before localStorage
  // is read — show a neutral placeholder pill until auth state resolves.
  if (!ready) {
    return (
      <span
        aria-hidden
        className="inline-flex h-10 w-[150px] items-center gap-2 rounded-full border border-border-strong/60 bg-surface-2/40 pl-3 pr-4"
      >
        <span className="relative h-6 w-6 overflow-hidden rounded-full bg-white/[0.06]">
          <span className="absolute inset-0 shimmer" />
        </span>
        <span className="relative h-3 flex-1 overflow-hidden rounded bg-white/[0.06]">
          <span className="absolute inset-0 shimmer" />
        </span>
      </span>
    );
  }

  if (connected) {
    return (
      <button
        type="button"
        onClick={async () => {
          // Await the Enoki IndexedDB logout *before* navigating, otherwise the
          // full-page redirect cancels the clear and autoConnect restores the
          // session on the next visit.
          if (isConnected) await disconnect();
          auth.signOut();
          window.location.href = "/";
        }}
        title="Sign out"
        className="group inline-flex h-10 items-center gap-2 rounded-full border border-[var(--color-emerald)]/30 bg-[var(--color-emerald)]/[0.08] pl-3 pr-4 text-[13px] font-medium text-[var(--color-emerald)] transition-all hover:bg-[var(--color-emerald)]/15"
      >
        <span
          aria-hidden
          className="grid h-6 w-6 place-items-center rounded-full bg-[var(--color-emerald)]/15"
        >
          <Wallet size={12} />
        </span>
        <span className="hidden sm:inline">{shortIdentity(address)}</span>
        <span className="sm:hidden">Connected</span>
        <LogOut
          size={13}
          className="ml-1 text-[var(--color-emerald)]/60 transition-colors group-hover:text-[var(--color-emerald)]"
        />
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex h-10 items-center gap-2 rounded-full border border-border-strong/80 bg-surface-2/40 pl-3 pr-4 text-[13px] font-medium text-fg transition-all hover:border-white/25 hover:bg-white/[0.06]"
      >
        <span
          aria-hidden
          className="grid h-6 w-6 place-items-center rounded-full bg-white/[0.06]"
        >
          <Wallet size={12} />
        </span>
        Connect Wallet
      </button>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/**
 * Prefer the real zkLogin Sui address when connected; otherwise fall back to
 * the mock user's email/address so the demo dashboard still reads naturally.
 */
function shortIdentity(address: string | null): string {
  if (address) return `${address.slice(0, 6)}…${address.slice(-4)}`;
  const email = mockUser.email;
  if (email && email.length <= 22) return email;
  const a = mockUser.suiAddress;
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}
