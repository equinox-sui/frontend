/**
 * zkLogin OAuth popup landing page.
 *
 * Google redirects the sign-in popup here with the id_token in the URL
 * fragment. The opener window (where registerEnokiWallets runs) polls this
 * popup's location, reads the fragment, finishes the Enoki flow, then closes
 * the popup. This page only needs to render quickly — it stays intentionally
 * minimal so the popup doesn't reload the full app.
 */

export default function AuthCallback() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#050504] text-center">
      <div className="flex flex-col items-center gap-4">
        <span
          aria-hidden
          className="size-8 animate-spin rounded-full border-2 border-white/15 border-t-white/80"
        />
        <p className="text-sm tracking-tight text-white/70">
          Completing secure sign-in…
        </p>
        <p className="max-w-xs text-xs text-white/35">
          You can close this window if it does not close automatically.
        </p>
      </div>
    </main>
  );
}
