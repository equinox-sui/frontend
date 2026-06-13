import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";

/**
 * Mirrors the real dashboard layout (header → 3 position cards → gauge +
 * repayment → allocation → activity feed) with shimmer blocks, so the first
 * frame before auth state resolves reads as "loading", not "empty". (README
 * §10: skeleton screens, not empty spinners.)
 */
export function DashboardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1240px] space-y-8" aria-busy="true">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-10 w-80 max-w-full rounded-2xl" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
      </div>

      {/* Position cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <SkeletonCard key={i} className="space-y-7">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-3 w-14" />
            </div>
            <Skeleton className="h-9 w-40 rounded-lg" />
            <Skeleton className="h-9 w-full rounded-xl" />
          </SkeletonCard>
        ))}
      </div>

      {/* Gauge + repayment */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1.6fr]">
        <SkeletonCard className="flex flex-col items-center gap-6">
          <Skeleton className="h-3 w-full max-w-[180px]" />
          <Skeleton className="h-[180px] w-[180px] rounded-full" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </SkeletonCard>
        <SkeletonCard className="space-y-6">
          <Skeleton className="h-5 w-2/3 rounded-lg" />
          <Skeleton className="h-2.5 w-full rounded-full" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        </SkeletonCard>
      </div>

      {/* Allocation */}
      <SkeletonCard className="space-y-5">
        <Skeleton className="h-2.5 w-full rounded-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </SkeletonCard>

      {/* Activity feed */}
      <SkeletonCard className="!p-0">
        <div className="space-y-4 p-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-9 w-9 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
              </div>
              <Skeleton className="h-3.5 w-14" />
            </div>
          ))}
        </div>
      </SkeletonCard>
    </div>
  );
}
