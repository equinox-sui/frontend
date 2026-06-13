"use client";

/**
 * Bridge hook: exposes the Enoki zkLogin wallet through a small, app-shaped API
 * so components don't touch dapp-kit / Enoki internals directly.
 *
 * - `signInWithGoogle(emailHint?)` opens the Google OAuth popup. Passing an
 *   email pre-fills Google via login_hint (used by the modal's email field).
 * - `address` is the real self-custodial Sui address derived by zkLogin.
 * - `configured` reflects whether Enoki + Google env vars are present; when
 *   false, callers fall back to the mock auth so the demo still works.
 */

import { useEffect, useState } from "react";
import {
  useConnectWallet,
  useCurrentAccount,
  useCurrentWallet,
  useDisconnectWallet,
  useWallets,
} from "@mysten/dapp-kit";
import {
  getSession,
  isEnokiWallet,
  type AuthProvider,
  type EnokiWallet,
} from "@mysten/enoki";
import { isZkLoginConfigured } from "@/lib/sui/config";
import { setEmailHint, clearEmailHint } from "@/lib/sui/email-hint";
import { emailFromJwt } from "@/lib/sui/jwt";

export function useZkLogin() {
  const account = useCurrentAccount();
  const { mutateAsync: connect, isPending } = useConnectWallet();
  const { mutateAsync: disconnectAsync } = useDisconnectWallet();

  const enokiWallets = useWallets().filter(isEnokiWallet);
  const byProvider = new Map<AuthProvider, EnokiWallet>();
  for (const wallet of enokiWallets) byProvider.set(wallet.provider, wallet);

  const googleWallet = byProvider.get("google");

  async function signInWithGoogle(emailHint?: string): Promise<void> {
    if (!googleWallet) {
      throw new Error(
        "Google zkLogin is not available. Check NEXT_PUBLIC_ENOKI_API_KEY and NEXT_PUBLIC_GOOGLE_CLIENT_ID.",
      );
    }
    if (emailHint) setEmailHint(emailHint);
    else clearEmailHint();

    try {
      await connect({ wallet: googleWallet });
    } finally {
      clearEmailHint();
    }
  }

  // Await the IndexedDB logout before the caller navigates — a fire-and-forget
  // mutate() would be torn down by a full-page redirect mid-clear, leaving the
  // Enoki session on disk for autoConnect to silently restore.
  async function disconnect(): Promise<void> {
    try {
      await disconnectAsync();
    } catch {
      /* already disconnected / wallet gone — nothing to do */
    }
  }

  return {
    address: account?.address ?? null,
    isConnected: Boolean(account),
    configured: isZkLoginConfigured(),
    googleAvailable: Boolean(googleWallet),
    connecting: isPending,
    signInWithGoogle,
    disconnect,
  };
}

export type ZkLoginSessionInfo = {
  /** Real self-custodial Sui address, or null when not connected via zkLogin. */
  address: string | null;
  /** Email claim from the OIDC JWT (Google), or null. */
  email: string | null;
  /** Session expiry as an epoch-ms timestamp, or null. */
  expiresAt: number | null;
  /** True only when the live connection is an Enoki zkLogin wallet. */
  isZkLogin: boolean;
};

/**
 * Reads the live Enoki session for the Account / Settings UI: the real Sui
 * address, the email from the OIDC JWT, and the session expiry. Falls back to
 * all-null when there is no zkLogin wallet connected (callers then use mock).
 */
export function useZkLoginSession(): ZkLoginSessionInfo {
  const account = useCurrentAccount();
  const { currentWallet } = useCurrentWallet();
  const [email, setEmail] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  const isZkLogin = Boolean(
    account && currentWallet && isEnokiWallet(currentWallet),
  );

  useEffect(() => {
    let cancelled = false;
    if (!isZkLogin || !currentWallet) {
      setEmail(null);
      setExpiresAt(null);
      return;
    }
    getSession(currentWallet)
      .then((session) => {
        if (cancelled) return;
        setEmail(emailFromJwt(session?.jwt));
        setExpiresAt(session?.expiresAt ?? null);
      })
      .catch(() => {
        if (!cancelled) {
          setEmail(null);
          setExpiresAt(null);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [isZkLogin, currentWallet, account?.address]);

  return {
    address: account?.address ?? null,
    email,
    expiresAt,
    isZkLogin,
  };
}
