"use client";

import { useState } from "react";
import { Copy, Check, LogOut, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { mockUser } from "@/data/mock";
import { shortAddress } from "@/lib/format";
import { auth } from "@/lib/auth";
import { useZkLogin, useZkLoginSession } from "@/lib/sui/useZkLogin";

/** "11h 42m" / "42m" / "expired" from an epoch-ms expiry. */
function formatRemaining(expiresAt: number): string {
  const ms = expiresAt - Date.now();
  if (ms <= 0) return "expired";
  const totalMin = Math.floor(ms / 60_000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

const NOTIFY = [
  { key: "defense", label: "Defense alerts", hint: "When HF crosses your threshold.", def: true },
  { key: "spread", label: "Spread milestones", hint: "Every 5% of debt repaid.", def: false },
  { key: "mode", label: "Mode adjustments", hint: "When agent rebalances allocation.", def: true },
];

const CURRENCIES = ["USD", "IDR", "EUR"];
const THEMES = ["Light", "Dark"];

export default function SettingsPage() {
  const [copied, setCopied] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [theme, setTheme] = useState("Dark");

  const { disconnect } = useZkLogin();
  const session = useZkLoginSession();

  // Prefer the real connected identity; fall back to mock for the demo.
  const suiAddress = session.address ?? mockUser.suiAddress;
  // Only fall back to the mock email when there is no real session at all.
  // A real zkLogin/wallet account with no email claim shows a neutral dash —
  // never a fabricated demo address.
  const email = session.email ?? (session.kind ? "—" : mockUser.email);
  const emailHint =
    session.kind === "zklogin"
      ? "From your zkLogin provider"
      : session.kind === "wallet"
        ? "Wallet connection — no email"
        : "Demo account";
  const sessionLabel =
    session.kind === "zklogin"
      ? session.expiresAt
        ? `zkLogin · expires in ${formatRemaining(session.expiresAt)}`
        : "zkLogin · active"
      : session.kind === "wallet"
        ? `Wallet · ${session.walletName ?? "Connected"}`
        : "Demo session (mock)";

  const copy = async () => {
    await navigator.clipboard.writeText(suiAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const handleLogOut = async () => {
    if (session.kind) await disconnect();
    auth.signOut();
    window.location.href = "/";
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[820px] space-y-8">
        <header>
          <h1 className="text-[28px] font-medium tracking-[-0.015em] text-fg">
            Settings
          </h1>
          <p className="mt-1 text-[13px] text-fg-dim">
            Personal preferences. Only you can see these.
          </p>
        </header>

        <Section title="Account" intro="Identity for this device.">
          <Row k="Email" v={email} hint={emailHint} />
          <div className="flex items-center justify-between border-b border-white/[0.04] px-5 py-4 last:border-0">
            <div className="min-w-0">
              <div className="text-[13.5px] text-fg">Sui address</div>
              <div className="mt-1 font-mono text-[11.5px] text-fg-dim">
                {shortAddress(suiAddress, 10, 8)}
              </div>
            </div>
            <button
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[12px] text-fg hover:bg-white/[0.05]"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <Row k="Session" v={sessionLabel} />
        </Section>

        <Section
          title="Notifications"
          intro="Email + in-app. Off by default for low-signal events."
        >
          {NOTIFY.map((n) => (
            <div
              key={n.key}
              className="flex items-center justify-between border-b border-white/[0.04] px-5 py-4 last:border-0"
            >
              <div>
                <div className="text-[13.5px] text-fg">{n.label}</div>
                <div className="mt-1 text-[11.5px] text-fg-dim">{n.hint}</div>
              </div>
              <Toggle defaultOn={n.def} label={n.label} />
            </div>
          ))}
        </Section>

        <Section title="Display" intro="Visual & locale.">
          <div className="flex items-center justify-between border-b border-white/[0.04] px-5 py-4">
            <div>
              <div className="text-[13.5px] text-fg">Currency</div>
              <div className="mt-1 text-[11.5px] text-fg-dim">
                Used across cards, modals, and exports.
              </div>
            </div>
            <Pills value={currency} onChange={setCurrency} options={CURRENCIES} />
          </div>
          <div className="flex items-center justify-between border-b border-white/[0.04] px-5 py-4">
            <div>
              <div className="text-[13.5px] text-fg">Theme</div>
              <div className="mt-1 text-[11.5px] text-fg-dim">
                Light mode is coming soon. Currently Dark only.
              </div>
            </div>
            <Pills
              value={theme}
              onChange={setTheme}
              options={THEMES}
              disabled={["Light"]}
            />
          </div>
          <Row k="Language" v="English (Indonesian coming soon)" />
        </Section>

        <Section title="Advanced" intro="Power-user options.">
          <div className="flex items-center justify-between border-b border-white/[0.04] px-5 py-4 last:border-0 opacity-60">
            <div>
              <div className="text-[13.5px] text-fg">Pro Mode</div>
              <div className="mt-1 text-[11.5px] text-fg-dim">
                Manual rebalance, custom routing, deeper analytics. Coming soon.
              </div>
            </div>
            <Toggle disabled label="Pro mode" />
          </div>
        </Section>

        <section className="overflow-hidden rounded-3xl border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/[0.04]">
          <div className="border-b border-[var(--color-danger)]/20 px-5 py-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={15} className="text-[var(--color-danger)]" />
              <h2 className="text-[14px] font-medium text-fg">
                Danger zone
              </h2>
            </div>
            <p className="mt-1 text-[12.5px] text-fg-dim">
              Irreversible. Make sure you understand the consequences.
            </p>
          </div>
          <div className="divide-y divide-[var(--color-danger)]/15">
            <DangerRow
              k="Close all positions"
              hint="Unwinds everything and returns collateral. Spread captured stays in your Shadow wallet."
              cta="Close all"
              onAction={() => {
                if (
                  window.confirm(
                    "Close all positions? Collateral is returned and the agent stops.",
                  )
                ) {
                  auth.closePosition();
                  window.location.href = "/dashboard";
                }
              }}
            />
            <DangerRow
              k="Delete account"
              hint="Removes your profile from Equinox. You'll need to re-onboard to use the agent again."
              cta="Delete"
              onAction={async () => {
                if (
                  window.confirm(
                    "Delete your account? This removes your profile and signs you out.",
                  )
                ) {
                  if (session.kind) await disconnect();
                  auth.signOut();
                  window.location.href = "/";
                }
              }}
            />
          </div>
        </section>

        <div className="flex items-center justify-between border-t border-white/[0.05] pt-6">
          <span className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-fg-dim">
            v0.1.0 · build a7c4d2
          </span>
          <Button variant="outline" size="sm" className="!h-9" onClick={handleLogOut}>
            <LogOut size={13} />
            Log out
          </Button>
        </div>
      </div>
    </AppShell>
  );
}

function Section({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-[16px] font-medium tracking-[-0.005em] text-fg">
          {title}
        </h2>
        <p className="mt-0.5 text-[12.5px] text-fg-dim">{intro}</p>
      </div>
      <div className="overflow-hidden rounded-3xl border border-white/[0.06] bg-[var(--bg-card)]/55">
        {children}
      </div>
    </section>
  );
}

function Row({ k, v, hint }: { k: string; v: string; hint?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.04] px-5 py-4 last:border-0">
      <div>
        <div className="text-[13.5px] text-fg">{k}</div>
        {hint && <div className="mt-1 text-[11.5px] text-fg-dim">{hint}</div>}
      </div>
      <span className="text-[13px] text-fg-muted">{v}</span>
    </div>
  );
}

function Pills({
  value,
  onChange,
  options,
  disabled = [],
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  disabled?: string[];
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1">
      {options.map((opt) => {
        const active = opt === value;
        const isDisabled = disabled.includes(opt);
        return (
          <button
            key={opt}
            disabled={isDisabled}
            onClick={() => onChange(opt)}
            className={`rounded-full px-3 py-1.5 text-[12px] transition-colors ${
              active ? "bg-white/[0.06] text-fg" : "text-fg-muted hover:text-fg"
            } ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function DangerRow({
  k,
  hint,
  cta,
  onAction,
}: {
  k: string;
  hint: string;
  cta: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div>
        <div className="text-[13.5px] text-fg">{k}</div>
        <div className="mt-1 text-[11.5px] text-fg-dim max-w-md">{hint}</div>
      </div>
      <button
        onClick={onAction}
        className="rounded-full border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/10 px-3.5 py-2 text-[12.5px] text-[var(--color-danger)] transition-colors hover:bg-[var(--color-danger)]/20"
      >
        {cta}
      </button>
    </div>
  );
}
