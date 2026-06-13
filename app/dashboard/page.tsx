"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AppShell } from "@/components/layout/AppShell";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { PositionCards } from "@/components/dashboard/PositionCards";
import { HealthGauge } from "@/components/dashboard/HealthGauge";
import { RepaymentProgress } from "@/components/dashboard/RepaymentProgress";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { AllocationCard } from "@/components/dashboard/AllocationCard";
import { DashboardEmpty } from "@/components/dashboard/DashboardEmpty";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { useAuth } from "@/lib/useAuth";

export default function DashboardPage() {
  const { hasPosition, ready } = useAuth();
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Crossfade the real content in once auth state resolves.
  useEffect(() => {
    if (!ready || !contentRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" },
    );
  }, [ready]);

  return (
    <AppShell>
      {!ready ? (
        <DashboardSkeleton />
      ) : (
        <div ref={contentRef}>
          {hasPosition ? (
            <div className="mx-auto w-full max-w-[1240px] space-y-8">
              <DashboardHeader />
              <PositionCards />
              <div className="grid gap-4 lg:grid-cols-[1fr_1.6fr]">
                <HealthGauge />
                <RepaymentProgress />
              </div>
              <AllocationCard />
              <ActivityFeed />
            </div>
          ) : (
            <DashboardEmpty />
          )}
        </div>
      )}
    </AppShell>
  );
}
