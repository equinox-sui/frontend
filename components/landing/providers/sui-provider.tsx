"use client";

/**
 * Sui zkLogin provider stack.
 *
 * Wraps the whole app so any client component can use @mysten/dapp-kit hooks
 * (useCurrentAccount, useConnectWallet, …) and the Enoki zkLogin wallets.
 *
 *   QueryClientProvider          ← react-query, required by dapp-kit
 *     SuiClientProvider          ← Sui RPC clients per network
 *       RegisterEnokiWallets     ← registers Google zkLogin as a standard wallet
 *       WalletProvider           ← wallet-standard connection state + autoConnect
 *
 * Enoki runs the salt + ZK proving services, so no backend is needed here. The
 * OAuth flow is a popup: connecting opens Google, Google redirects the popup
 * back to NEXT_PUBLIC origin + /auth, and this opener reads the id_token from
 * the popup URL fragment. See ZKLOGIN_SETUP.md.
 */

import "@mysten/dapp-kit/dist/index.css";

import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
  useCurrentAccount,
  useSuiClientContext,
} from "@mysten/dapp-kit";
import { getJsonRpcFullnodeUrl } from "@mysten/sui/jsonRpc";
import { isEnokiNetwork, registerEnokiWallets } from "@mysten/enoki";
import {
  SUI_NETWORK,
  ENOKI_API_KEY,
  GOOGLE_CLIENT_ID,
  isZkLoginConfigured,
} from "@/lib/sui/config";
import { getEmailHint } from "@/lib/sui/email-hint";
import { auth } from "@/lib/auth";

const { networkConfig } = createNetworkConfig({
  testnet: { url: getJsonRpcFullnodeUrl("testnet"), network: "testnet" },
  mainnet: { url: getJsonRpcFullnodeUrl("mainnet"), network: "mainnet" },
  devnet: { url: getJsonRpcFullnodeUrl("devnet"), network: "devnet" },
});

// Single client for the app lifetime — recreating it would drop cached queries.
const queryClient = new QueryClient();

function RegisterEnokiWallets() {
  const { client, network } = useSuiClientContext();

  useEffect(() => {
    if (!isZkLoginConfigured()) return;
    if (!isEnokiNetwork(network)) return;

    const { unregister } = registerEnokiWallets({
      apiKey: ENOKI_API_KEY,
      providers: {
        google: {
          clientId: GOOGLE_CLIENT_ID,
          // Popup lands here; keep /auth minimal so it loads fast.
          redirectUrl: `${window.location.origin}/auth`,
          // Evaluated at connect time: request the email/profile scopes and,
          // when the user typed an address, pre-fill Google with login_hint.
          extraParams: () => {
            const hint = getEmailHint();
            return {
              scope: "email profile",
              ...(hint ? { login_hint: hint } : {}),
            };
          },
        },
      },
      client,
      network,
    });

    return unregister;
  }, [client, network]);

  return null;
}

/**
 * Reconciles the mock app-session flag with the real wallet.
 *
 * On reload, WalletProvider autoConnect silently restores the zkLogin account
 * from IndexedDB without ever running the login modal — so auth.signIn() (the
 * localStorage flag the dashboard/nav read) would stay false and the UI would
 * show "Connected" over a signed-out app state. When zkLogin is configured, the
 * live account is the source of truth: mirror it into the mock flag.
 */
function ZkLoginAuthBridge() {
  const account = useCurrentAccount();

  useEffect(() => {
    if (!isZkLoginConfigured()) return;
    if (account && !auth.isSignedIn()) auth.signIn();
  }, [account]);

  return null;
}

export function SuiProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork={SUI_NETWORK}>
        <RegisterEnokiWallets />
        <WalletProvider autoConnect>
          <ZkLoginAuthBridge />
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
