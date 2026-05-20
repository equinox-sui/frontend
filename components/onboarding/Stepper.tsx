import { cn } from "@/lib/cn";

interface StepperProps {
  steps: string[];
  current: number;
}

export function Stepper({ steps, current }: StepperProps) {
  return (
    <ol className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em]">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} className="flex items-center gap-3">
            <span
              className={cn(
                "grid h-7 w-7 place-items-center rounded-full border font-mono text-[11px] tab-nums",
                done && "border-[var(--color-accent)] bg-[var(--color-accent)] text-ink-950",
                active &&
                  "border-[var(--color-accent)]/60 bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
                !done && !active && "border-white/10 bg-white/[0.02] text-ink-500",
              )}
            >
              {done ? (
                <svg viewBox="0 0 12 12" width={12} height={12} aria-hidden>
                  <path
                    d="M2.5 6.5l2.5 2.5L9.5 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                String(i + 1).padStart(2, "0")
              )}
            </span>
            <span
              className={cn(
                "hidden sm:inline",
                active ? "text-ink-100" : done ? "text-ink-300" : "text-ink-500",
              )}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "h-px w-6 sm:w-10",
                  done ? "bg-[var(--color-accent)]/60" : "bg-white/[0.08]",
                )}
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
