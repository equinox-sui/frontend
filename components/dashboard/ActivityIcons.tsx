/**
 * Custom inline glyphs for the activity feed. Each one is tuned to its
 * event semantic instead of reusing a generic Lucide icon, so the column
 * reads less like a template and more like the product's own vocabulary.
 *
 * Common conventions: 18x18 viewBox, 1.6 stroke, currentColor for stroke,
 * no fill. Use strokeLinecap="round" for soft endpoints.
 */

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({
  size = 16,
  children,
  ...rest
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 18 18"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Spread — two arcs meeting in the middle (borrow APR vs lend APR converging). */
export function SpreadIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 4c2.2 0 3.2 2.4 4.2 5C8.2 11.6 9.2 14 11.4 14h3.6" />
      <path d="M3 14c2.2 0 3.2-2.4 4.2-5C8.2 6.4 9.2 4 11.4 4h3.6" />
      <circle cx="9" cy="9" r="0.9" fill="currentColor" stroke="none" />
    </Base>
  );
}

/** Rebalance — two arrows orbiting a center node (Scallop ↔ Cetus shift). */
export function RebalanceIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.6 6.5a6 6 0 0 1 9.6-1.6" />
      <path d="M11.4 3v2.5h2.5" />
      <path d="M14.4 11.5a6 6 0 0 1-9.6 1.6" />
      <path d="M6.6 15v-2.5H4.1" />
    </Base>
  );
}

/** Shadow Wallet — a card with a soft offset duplicate behind it. */
export function ShadowWalletIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4.5" y="6" width="11" height="8" rx="1.6" />
      <path d="M3 8.4v4.2A1.6 1.6 0 0 0 4.6 14.2" opacity="0.6" />
      <path d="M12 10h2.4" />
    </Base>
  );
}

/** Defense — a shield with two horizontal HF bands inside. */
export function DefenseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 2.5 14.5 4v4.2c0 3.2-2.4 6-5.5 7-3.1-1-5.5-3.8-5.5-7V4L9 2.5z" />
      <path d="M5.5 8.5h7" opacity="0.55" />
      <path d="M5.8 11h6.4" opacity="0.85" />
    </Base>
  );
}

/** Deposit / Position opened — an arrow dropping into a vault opening. */
export function DepositIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 2v7" />
      <path d="M6.4 6.6 9 9.2l2.6-2.6" />
      <path d="M3 11.5h12" />
      <path d="M3.7 11.5v3a1 1 0 0 0 1 1h8.6a1 1 0 0 0 1-1v-3" />
    </Base>
  );
}

/** Withdraw — an arrow leaving a vault toward the lower-left (out of the system). */
export function WithdrawIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 6.5h12" />
      <path d="M3.7 6.5v3a1 1 0 0 0 1 1h8.6a1 1 0 0 0 1-1v-3" />
      <path d="M9 9v6.5" />
      <path d="M11.6 12.9 9 15.5 6.4 12.9" />
    </Base>
  );
}
