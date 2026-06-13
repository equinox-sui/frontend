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

/** A wallet-standard wallet as surfaced by dapp-kit's useWallets(). */
export type ConnectableWallet = ReturnType<typeof useWallets>[number];

export function useZkLogin() {
  const account = useCurrentAccount();
  const { mutateAsync: connect, isPending } = useConnectWallet();
  const { mutateAsync: disconnectAsync } = useDisconnectWallet();

  const wallets = useWallets();
  const enokiWallets = wallets.filter(isEnokiWallet);
  // Everything that isn't an Enoki zkLogin wallet is an installed browser
  // wallet extension (Slush, Suiet, Phantom, …) registered via wallet-standard.
  const externalWallets = wallets.filter((w) => !isEnokiWallet(w));

  const byProvider = new Map<AuthProvider, EnokiWallet>();
  for (const wallet of enokiWallets) byProvider.set(wallet.provider, wallet);

  const googleWallet = byProvider.get("google");

  // Returns the connect result so callers can verify a Sui account was actually
  // authorized — wallets (esp. multichain like Phantom) can connect with zero
  // Sui-chain accounts, in which case dapp-kit resolves with accounts: [].
  async function connectWallet(wallet: ConnectableWallet) {
    return connect({ wallet });
  }

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
    externalWallets,
    connectWallet,
    connecting: isPending,
    signInWithGoogle,
    disconnect,
  };
}

export type AccountSessionInfo = {
  /** Real Sui address, or null when nothing is connected. */
  address: string | null;
  /** Email claim from the OIDC JWT — only for zkLogin connections. */
  email: string | null;
  /** zkLogin session expiry as an epoch-ms timestamp, or null. */
  expiresAt: number | null;
  /** How the account is connected. */
  kind: "zklogin" | "wallet" | null;
  /** Display name of the connected wallet (e.g. "Slush"), or null. */
  walletName: string | null;
  /** Convenience flag — true only for an Enoki zkLogin connection. */
  isZkLogin: boolean;
};

/**
 * Reads the live connection for the Account / Settings UI: the real Sui address
 * plus, for zkLogin, the email from the OIDC JWT and session expiry. For an
 * external wallet (Slush, Suiet, …) only the address + wallet name are known.
 * Falls back to all-null when nothing is connected (callers then use mock).
 */
export function useZkLoginSession(): AccountSessionInfo {
  const account = useCurrentAccount();
  const { currentWallet } = useCurrentWallet();
  const [email, setEmail] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  const isZkLogin = Boolean(
    account && currentWallet && isEnokiWallet(currentWallet),
  );
  const kind: AccountSessionInfo["kind"] = !account
    ? null
    : isZkLogin
      ? "zklogin"
      : "wallet";

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
    kind,
    walletName: account ? currentWallet?.name ?? null : null,
    isZkLogin,
  };
}
