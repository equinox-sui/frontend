export const nav = {
  brand: "Equinox",
  links: [
    { label: "How it works", href: "#how" },
    { label: "Why Equinox", href: "#capabilities" },
    { label: "FAQ", href: "#faq" },
    { label: "Docs", href: "#academy" },
  ],
  cta: { label: "Get Started", href: "/onboarding" },
};

export const hero = {
  badge: "Built on Sui · zkLogin · Suilend · Scallop · Cetus",
  title: ["Self-repaying loans,", "now powered by", "an agent on Sui."],
  subtitle:
    "Deposit SUI. Pick a risk profile. The agent borrows USDC at the best rate, lends it where yield is highest, and uses the spread to pay off your debt. You manage nothing.",
  ctaPrimary: { label: "Get Started", href: "/onboarding" },
  ctaSecondary: { label: "See how it works", href: "#how" },
  stats: [
    { value: "0", label: "Manual work for the user" },
    { value: "24/7", label: "Agent monitoring Health Factor" },
    { value: "3", label: "Risk profiles to choose" },
    { value: "1-click", label: "Open & close position" },
  ],
  headline: [
    [
      { text: "Deposit", tone: "muted" },
      { text: "SUI.", tone: "strong" },
    ],
    [{ text: "Let the agent work.", tone: "strong" }],
    [
      { text: "The", tone: "muted" },
      { text: "spread", tone: "strong" },
      { text: "pays your debt", tone: "muted" },
    ],
    [{ text: "automatically.", tone: "strong" }],
  ] as const,
  description:
    "Equinox Agent removes everything DeFi makes you do — no Health Factor watching, no manual repayments, no liquidation panic, no vault hunting. One deposit. One risk profile. The agent does the rest.",
  openApp: { label: "Get Started", href: "/onboarding" },
};

export const whatYouCanDo = {
  title: "Three concepts. One position.",
  cards: [
    {
      name: "Collateral stays whole",
      body: "Your SUI is locked as collateral and never touched. When you close the position, you get every SUI back — your principal is preserved even while the agent works.",
    },
    {
      name: "Agent repays the debt",
      body: "Borrowed USDC from Suilend is split: part lands in your Shadow wallet, the rest is lent to Scallop and Cetus. The yield spread auto-repays your debt every block.",
    },
    {
      name: "Shadow wallet, spendable",
      body: "Withdrawable USDC fills up as collateral appreciates and spread compounds. Pull it any time with zkLogin — no fees, just Sui gas (~$0.01).",
    },
  ],
};

export const howAuralis = {
  title: "How Equinox Works",
  cards: [
    {
      index: "01",
      name: "Deposit & Configure",
      body:
        "Sign in with zkLogin (Google/Apple/Email), deposit SUI as collateral, pick a payoff target and a risk profile — Conservative, Balanced, or Aggressive. The agent activates in one transaction.",
    },
    {
      index: "02",
      name: "Spread Pays the Debt",
      body:
        "The agent borrows USDC on Suilend, allocates a slice to Scallop and Cetus, and captures the rate spread continuously. Health Factor is monitored 24/7 — defense triggers below 1.3 without you lifting a finger.",
    },
  ],
};

export const problems = [
  {
    title: "Watching Health Factor 24/7",
    body: "Miss a price drop and you get liquidated. Equinox monitors continuously and triggers defense automatically.",
  },
  {
    title: "Paying interest monthly",
    body: "Manual repayments are friction. Equinox captures the rate spread and applies it to your debt every block.",
  },
  {
    title: "Liquidation panic",
    body: "Crashes wipe out leveraged positions. Defense unwinds allocations and restores HF before the threshold breaks.",
  },
  {
    title: "Hunting the best vault",
    body: "APRs shift constantly. The agent rebalances between Scallop and Cetus whenever spread differential crosses 0.5%.",
  },
  {
    title: "Wallet management overhead",
    body: "zkLogin means no seed phrase, no extension install. Sign in with Google. The agent signs nothing on your behalf.",
  },
];

export const solution = {
  eyebrow: "Solution",
  title: "One agent. Three risk profiles. Zero manual work.",
  body:
    "Equinox Agent runs on Sui and composes Suilend, Scallop, and Cetus into a single self-repaying position — fully transparent, immutable, manifesto-bound.",
  contracts: [
    {
      name: "Equinox Position",
      role: "Per-user state: collateral, active debt, shadow balance, manifesto hash.",
      tag: "Core",
    },
    {
      name: "Suilend Adapter",
      role: "Borrow source. Health Factor monitored every block.",
      tag: "Borrow",
    },
    {
      name: "Scallop Adapter",
      role: "Lend USDC to the highest-APR Scallop pool. Up to 60% of recycle.",
      tag: "Yield",
    },
    {
      name: "Cetus Adapter",
      role: "Provide USDC/USDT LP. Up to 40% of recycle. Auto-rebalance.",
      tag: "Yield",
    },
    {
      name: "Defense Engine",
      role: "Triggers below HF 1.3. Anyone can call — caller earns a reward.",
      tag: "Safety",
    },
    {
      name: "Manifesto",
      role: "Immutable behavior rules stored on Walrus. Agent cannot deviate.",
      tag: "Trust",
    },
  ],
};

export const features = [
  {
    icon: "Sparkles",
    title: "zkLogin, no seed phrase",
    body: "Sign in with Google, Apple, or Email. Your Sui address is derived ephemerally. No extension, no recovery phrase.",
  },
  {
    icon: "Scale",
    title: "Three risk profiles",
    body: "Conservative (LTV 40%), Balanced (LTV 55%, recommended), Aggressive (LTV 70%). Each card shows liquidation price upfront.",
  },
  {
    icon: "Zap",
    title: "Spread auto-repay",
    body: "Borrow APR vs lend APR — the spread is captured every block and applied to your debt. No manual repayment ever.",
  },
  {
    icon: "Network",
    title: "Auto-rebalance",
    body: "Agent shifts allocations between Scallop and Cetus when APR differential crosses 0.5%. Always the best blended yield.",
  },
  {
    icon: "ShieldCheck",
    title: "Defense engine",
    body: "Below HF 1.3, the agent unwinds allocations and repays Suilend to restore safety. Anyone can trigger it — caller earns a reward.",
  },
  {
    icon: "FileLock",
    title: "Immutable manifesto",
    body: "Risk parameters, routing policy, and defense thresholds are pinned to Walrus at activation. Agent cannot deviate — verify any time.",
  },
];

export const workflow = {
  eyebrow: "How it works",
  title: "Six steps from deposit to debt-free.",
  body:
    "Every action is bounded by the manifesto and verified onchain. The agent executes; the contract enforces.",
  steps: [
    {
      n: "01",
      title: "Sign in with zkLogin",
      body: "Google, Apple, or Email. No seed phrase, no extension. Ephemeral Sui address derived from the OAuth callback.",
    },
    {
      n: "02",
      title: "Deposit SUI collateral",
      body: "Slider from 0 to max balance. Live USD value via Pyth. Minimum 10 SUI. Your collateral stays whole until you close.",
    },
    {
      n: "03",
      title: "Pick mode and risk",
      body: "Loan + Auto-Repay is the MVP mode. Choose Conservative / Balanced / Aggressive — each shows LTV, estimated APY, liquidation price.",
    },
    {
      n: "04",
      title: "Agent borrows USDC",
      body: "Suilend opens a position at the chosen LTV. 60% lands in your wallet immediately; 40% goes to yield vaults.",
    },
    {
      n: "05",
      title: "Spread repays debt",
      body: "Scallop and Cetus earn lend APR > borrow APR. The spread is captured continuously and applied to active debt.",
    },
    {
      n: "06",
      title: "Close, get SUI back",
      body: "Click Close. Allocations unwind, debt repays, collateral returns. Surplus USDC sits in Shadow — withdraw any time.",
    },
  ],
};

export const agents = {
  eyebrow: "Agent topology",
  title: "One agent. Three actions. Manifesto-bound.",
  body:
    "Equinox runs a single onchain agent that manages every position against an immutable manifesto. Three actions: borrow, lend, defend.",
  tiers: [
    {
      tag: "Tier 1",
      name: "Routing Engine",
      mission: "Optimize blended yield across Scallop and Cetus.",
      checks: [
        { label: "Scallop USDC pool", weight: "≤60%" },
        { label: "Cetus USDC/USDT LP", weight: "≤40%" },
        { label: "Rebalance threshold", weight: "0.5% APR" },
        { label: "Buffer minimum", weight: "10% of debt" },
        { label: "Recycle ratio", weight: "30–50%" },
        { label: "Spread capture cadence", weight: "every block" },
      ],
    },
    {
      tag: "Tier 2",
      name: "Defense Engine",
      mission: "Restore Health Factor before liquidation.",
      checks: [
        { label: "Trigger threshold: HF ≤ 1.3" },
        { label: "Warning threshold: HF ≤ 1.5" },
        { label: "Unwinds Scallop + Cetus allocations" },
        { label: "Repays Suilend until HF ≥ 1.55" },
        { label: "Anyone may trigger — caller earns a reward" },
        { label: "Manifesto pin hash recorded onchain" },
      ],
    },
  ],
};

export const reputation = {
  eyebrow: "Modes",
  title: "Three risk profiles, one self-repaying position.",
  body:
    "Pick the profile that matches your appetite. The manifesto locks LTV, allocation, and defense thresholds the moment you activate — no surprises.",
  tiers: [
    { name: "Conservative", range: "LTV 40%", accent: "from-emerald-400/70 to-emerald-200/20" },
    { name: "Balanced", range: "LTV 55% · recommended", accent: "from-violet-400/70 to-violet-200/20" },
    { name: "Aggressive", range: "LTV 70%", accent: "from-amber-400/80 to-rose-300/30" },
  ],
  badges: [
    { name: "Loan + Auto-Repay", trigger: "Default mode. Spread repays debt continuously.", rep: "MVP" },
    { name: "Forever Income", trigger: "Coming soon. Yield stays in Shadow, debt stays open.", rep: "Soon" },
    { name: "Yield Maximizer", trigger: "Coming soon. Pure yield optimization, manual repay.", rep: "Soon" },
    { name: "Pro Mode", trigger: "Custom LTV, allocation, and rebalance bounds.", rep: "Post-MVP" },
    { name: "Multi-collateral", trigger: "stSUI, ETH, BTC as collateral. Currently SUI only.", rep: "Soon" },
  ],
};

export const preview = {
  eyebrow: "Live preview",
  title: "Watch a deposit pass through the agent.",
  body:
    "Below is what a user sees after activating a Balanced position with 1,000 SUI. Suilend borrow on the left; Scallop and Cetus allocation on the right.",
};

export const impact = {
  eyebrow: "Why it matters",
  title: "DeFi without the operating manual.",
  body:
    "Equinox Agent removes the parts of DeFi that punish first-time users — Health Factor monitoring, vault hunting, repayment scheduling — and keeps the upside.",
  points: [
    { stat: "0 manual repayments", label: "spread auto-applies to debt every block" },
    { stat: "24/7 defense", label: "HF monitored continuously, no user action" },
    { stat: "100% collateral return", label: "your SUI comes back whole when you close" },
    { stat: "Immutable", label: "manifesto pinned to Walrus before activation" },
  ],
};

export const faq = {
  title: "Frequently Asked Questions",
  hint: "Everything you need to know before opening your first position.",
  community: {
    label: "Have a question?\nAsk on GitHub.",
    href: "https://github.com/EzraNahumury",
  },
  items: [
    {
      q: "How does Equinox repay my debt automatically?",
      a: "Equinox borrows USDC from Suilend at the borrow APR, lends it to Scallop and Cetus at higher lend APR, and captures the spread every block. That spread is applied directly to your active debt — you never repay manually. As long as lend APR > borrow APR (the common case), the debt shrinks continuously.",
    },
    {
      q: "What happens if SUI price crashes?",
      a: "The defense engine monitors Health Factor every block. If HF drops to 1.3, the agent unwinds allocations from Scallop and Cetus, repays Suilend, and restores HF to ≥ 1.55. Your collateral stays whole — only the debt and allocations shrink. Anyone can trigger defense; the caller earns a reward.",
    },
    {
      q: "Why do I need to pick a risk profile?",
      a: "The risk profile sets your LTV (Loan-to-Value) — Conservative 40%, Balanced 55%, Aggressive 70%. Higher LTV means more borrowed USDC, more yield, but a higher liquidation price. Each profile is shown with the exact liquidation price at current market before you confirm.",
    },
    {
      q: "Is my collateral safe?",
      a: "Your SUI collateral is locked in the position contract and never touched by the agent's allocation logic. When you close the position, you get every SUI back — minus zero fees. Even during a defense event, only debt and allocations move; collateral stays whole.",
    },
    {
      q: "What is the Shadow wallet?",
      a: "Shadow wallet is the USDC balance Equinox holds for you that is spendable any time. It fills as your collateral appreciates and as extra spread accumulates beyond debt repayment. Withdraw to your zkLogin Sui address — no fees, only Sui gas (~$0.01).",
    },
    {
      q: "Which blockchain does Equinox run on?",
      a: "Equinox runs natively on Sui. It composes Suilend (borrow), Scallop (lend USDC), and Cetus (USDC/USDT LP). zkLogin is used for sign-in via Mysten Labs SDK. The manifesto — your immutable behavior rules — is pinned to Walrus.",
    },
    {
      q: "Can I close my position at any time?",
      a: "Yes. Click Close Position and the agent unwinds Scallop + Cetus allocations, repays Suilend, and returns your collateral. If allocations cover the debt fully, surplus USDC returns to Shadow. If short, you pick how to cover the gap — Shadow, your wallet, or auto-sell a slice of collateral.",
    },
  ],
};

export const ctaSection = {
  title: "Open your first self-repaying loan in 60 seconds.",
  body:
    "Sign in with Google. Deposit SUI. Pick a profile. The agent does the rest. Close any time — your collateral comes back whole.",
  primary: { label: "Get Started", href: "/onboarding" },
  secondary: { label: "Read the docs", href: "https://github.com/EzraNahumury" },
};

export const footer = {
  brand: "Equinox",
  tagline: "Self-repaying loans on Sui. The spread does the work.",
  columns: [
    {
      title: "Protocol",
      links: [
        { label: "How it works", href: "#how" },
        { label: "Why Equinox", href: "#capabilities" },
        { label: "Manifesto", href: "/manifesto" },
      ],
    },
    {
      title: "Build",
      links: [
        { label: "GitHub", href: "https://github.com/EzraNahumury" },
        { label: "Sui docs", href: "https://docs.sui.io/" },
        { label: "Suilend", href: "https://suilend.fi/" },
      ],
    },
    {
      title: "Yield sources",
      links: [
        { label: "Scallop", href: "https://app.scallop.io/" },
        { label: "Cetus", href: "https://app.cetus.zone/" },
      ],
    },
  ],
};
