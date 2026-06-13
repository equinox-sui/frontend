# zkLogin Setup (Sui + Enoki)

Equinox signs users in with **real Sui zkLogin** via [Enoki](https://docs.enoki.mystenlabs.com/) (Mysten Labs). Enoki runs the salt + ZK proving services, so there is **no backend to host** — the whole flow happens in the browser.

Without the env vars below the app still runs: the login modal falls back to the mock localStorage auth so the demo works. Fill these in to make sign-in real.

## What works

| Method | How |
| --- | --- |
| **Continue with Google** | Real zkLogin. Opens a Google popup, returns a self-custodial Sui address. |
| **Continue with email** | zkLogin has no email issuer, so the typed address is passed to Google as `login_hint`. Real zkLogin via the user's Google account, with the email pre-filled. |
| **Continue with Apple** | Disabled ("Soon") — Enoki does not support Apple zkLogin yet (`google \| facebook \| twitch \| onefc \| playtron`). |

## 1. Google OAuth client ID

1. Go to <https://console.cloud.google.com/apis/credentials>.
2. **Create Credentials → OAuth client ID → Web application**.
3. **Authorized JavaScript origins**:
   - `http://localhost:3000`
   - your production origin, e.g. `https://equinox.example`
4. **Authorized redirect URIs** — must match `window.location.origin + /auth`:
   - `http://localhost:3000/auth`
   - `https://equinox.example/auth`
5. Copy the **Client ID** (`...apps.googleusercontent.com`) → `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.

## 2. Enoki API key

1. Open the **Enoki Portal**: <https://portal.enoki.mystenlabs.com>.
2. Create a project, then create a **Public API key**.
3. Enable the **Google** auth provider and paste the same Google Client ID from step 1.
4. Add your **allowed origins** (`http://localhost:3000`, prod origin).
5. Make sure the key is enabled for **Testnet** (matches `NEXT_PUBLIC_SUI_NETWORK`).
6. Copy the public key → `NEXT_PUBLIC_ENOKI_API_KEY`.

> Use the **public** key (safe in the browser). The private/secret key is only for sponsored-transaction backends — do not put it in a `NEXT_PUBLIC_*` var.

## 3. Env file

```bash
cp .env.local.example .env.local
```

```dotenv
NEXT_PUBLIC_SUI_NETWORK=testnet
NEXT_PUBLIC_ENOKI_API_KEY=enoki_public_xxxxxxxx
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com
```

Restart `npm run dev` after editing env vars.

## 4. Test

1. `npm run dev`, open <http://localhost:3000>, click **Get Started**.
2. **Continue with Google** → a popup opens → pick a Google account → popup closes → you land on `/onboarding` with a real Sui address shown in the dashboard pill.
3. **Allow popups** for the site if the browser blocks the window.

## Where it lives in code

- `components/landing/providers/sui-provider.tsx` — QueryClient → SuiClientProvider → `registerEnokiWallets` → WalletProvider.
- `lib/sui/config.ts` — env reading + `isZkLoginConfigured()`.
- `lib/sui/useZkLogin.ts` — `signInWithGoogle(emailHint?)`, `address`, `disconnect`.
- `lib/sui/email-hint.ts` — passes the email field through as Google `login_hint`.
- `app/auth/page.tsx` — minimal OAuth popup landing page.
- `components/modals/LoginModal.tsx` — wired buttons + email form.

## Switching to Mainnet

Set `NEXT_PUBLIC_SUI_NETWORK=mainnet`, create a Mainnet-enabled Enoki key, and add the mainnet origin/redirect URI to both Google and Enoki.
