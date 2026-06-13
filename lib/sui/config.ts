/**
 * zkLogin / Enoki configuration, read from public env vars.
 *
 * All three are NEXT_PUBLIC_* because the entire zkLogin flow runs in the
 * browser (ephemeral keypair, OAuth popup, Enoki proof request). The Enoki
 * API key used here is the *public* key from the Enoki portal — it is safe to
 * ship to the client. Never put the private/secret Enoki key in a NEXT_PUBLIC
 * var.
 *
 * See ZKLOGIN_SETUP.md for how to obtain each value.
 */

export type SuiNetwork = "testnet" | "mainnet" | "devnet";

export const SUI_NETWORK: SuiNetwork =
  (process.env.NEXT_PUBLIC_SUI_NETWORK as SuiNetwork) ?? "testnet";

export const ENOKI_API_KEY = process.env.NEXT_PUBLIC_ENOKI_API_KEY ?? "";

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

/**
 * True only when both the Enoki public key and a Google OAuth client ID are
 * present. When false, the UI falls back to the mock localStorage auth so the
 * demo still runs end-to-end without credentials.
 */
export function isZkLoginConfigured(): boolean {
  return Boolean(ENOKI_API_KEY && GOOGLE_CLIENT_ID);
}
