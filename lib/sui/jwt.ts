/**
 * Pull the `email` claim out of a zkLogin OIDC JWT.
 *
 * The Google JWT carries the email when the OAuth request includes the `email`
 * scope (we add `scope: "email profile"` in sui-provider.tsx). We only read the
 * payload client-side for display — the signature is verified by Enoki / the
 * zkLogin proof, not here.
 */

type JwtClaims = {
  email?: string;
  name?: string;
  [key: string]: unknown;
};

function base64UrlDecode(segment: string): string {
  const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return atob(padded);
}

export function decodeJwtClaims(jwt?: string | null): JwtClaims | null {
  if (!jwt) return null;
  const parts = jwt.split(".");
  if (parts.length < 2) return null;
  try {
    return JSON.parse(base64UrlDecode(parts[1])) as JwtClaims;
  } catch {
    return null;
  }
}

export function emailFromJwt(jwt?: string | null): string | null {
  return decodeJwtClaims(jwt)?.email ?? null;
}
