/**
 * zkLogin has no native "email magic link" issuer — addresses are derived from
 * an OIDC provider's `sub` claim (Google, Apple, etc). To make the modal's
 * "Continue with email" field do something real, we pass the typed address as
 * Google's `login_hint` OAuth parameter, so Google opens pre-filled with that
 * email. The resulting login is real zkLogin via the user's Google account.
 *
 * registerEnokiWallets() reads `extraParams` lazily (as a function) at connect
 * time, so we stash the latest typed email in this module-level holder and the
 * provider config reads it the moment the popup opens.
 */

let emailHint = "";

export function setEmailHint(value: string): void {
  emailHint = value.trim();
}

export function getEmailHint(): string {
  return emailHint;
}

export function clearEmailHint(): void {
  emailHint = "";
}
