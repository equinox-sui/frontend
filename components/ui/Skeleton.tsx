import { cn } from "@/lib/cn";

/**
 * A single shimmering placeholder block. Reuses the `.shimmer` keyframe from
 * globals.css. Compose several to mirror a component's real layout.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-surface-2/50",
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-0 shimmer" />
    </div>
  );
}

/** Card-shaped wrapper matching the real dashboard card chrome. */
export function SkeletonCard({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border-strong/60 bg-surface/45 p-6 backdrop-blur-md",
        className,
      )}
      aria-hidden
    >
      {children}
    </div>
  );
}
