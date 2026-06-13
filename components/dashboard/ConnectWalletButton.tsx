"use client";

/**
 * Wallet/auth status pill in the dashboard top bar.
 *
 * Reads the mock auth state from lib/auth.ts and opens the shared zkLogin
 * LoginModal — the same "no wallet to install" flow as the landing page
 * (README §2). Sign-in happens only when the user actually picks a provider
 * inside LoginModal (which calls auth.signIn() + routes), never on dismissal.
 *
 * To swap in Privy: install @privy-io/react-auth with pnpm and replace the
 * LoginModal trigger with a Privy login() call.
 */

import { useState } from "react";
import { Wallet, LogOut } from "lucide-react";
import { auth } from "@/lib/auth";
import { useAuth } from "@/lib/useAuth";
import { mockUser } from "@/data/mock";
import { LoginModal } from "@/components/modals/LoginModal";

export function ConnectWalletButton() {
  const { signedIn } = useAuth();
  const [open, setOpen] = useState(false);

  if (signedIn) {
    return (
      <button
        type="button"
        onClick={() => {
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
        <span className="hidden sm:inline">{shortIdentity()}</span>
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

function shortIdentity(): string {
  const email = mockUser.email;
  if (email && email.length <= 22) return email;
  const a = mockUser.suiAddress;
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}
