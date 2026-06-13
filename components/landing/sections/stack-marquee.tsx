"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";

type Item = {
  label: string;
  /** Real brand logo stored under /public/logos. */
  src: string;
};

const ITEMS: Item[] = [
  { label: "Sui", src: "/logos/sui.png" },
  { label: "Suilend", src: "/logos/suilend.png" },
  { label: "Scallop", src: "/logos/scallop.png" },
  { label: "Cetus", src: "/logos/cetus.png" },
  { label: "Walrus", src: "/logos/walrus.png" },
  { label: "Pyth", src: "/logos/pyth.png" },
  { label: "zkLogin", src: "/logos/mysten.png" },
  { label: "Next.js 16", src: "/logos/nextjs.png" },
];

type Props = {
  /**
   * "default" renders with full animated bg blobs and grid mask.
   * "bare" renders only the marquee track + side fades, expecting the
   * parent section to provide background context.
   */
  variant?: "default" | "bare";
};

export function StackMarquee({ variant = "default" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const track = trackRef.current;
      if (!track) return;

      // Section enter — fade strip in (a one-shot, fine under reduced motion).
      gsap.fromTo(
        ".stack-strip",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );

      // Reduced motion: no looping marquee or drifting blobs — show the strip
      // statically (GSAP rAF tweens ignore the CSS reduced-motion rule).
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(track, { x: 0 });
        return;
      }

      const half = track.scrollWidth / 2;
      // Left → Right motion: track goes from -half to 0, loops seamlessly because
      // content is duplicated so the visible window stays continuous.
      const tween = gsap.fromTo(
        track,
        { x: -half },
        {
          x: 0,
          duration: 38,
          ease: "none",
          repeat: -1,
        }
      );

      // Animated bg blobs drift
      gsap.to(".stack-blob-a", {
        x: 60,
        y: -20,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".stack-blob-b", {
        x: -50,
        y: 30,
        duration: 17,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".stack-blob-c", {
        x: 30,
        y: 40,
        duration: 19,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Pause on hover
      const onEnter = () => tween.timeScale(0.25);
      const onLeave = () => tween.timeScale(1);
      track.addEventListener("mouseenter", onEnter);
      track.addEventListener("mouseleave", onLeave);

      return () => {
        track.removeEventListener("mouseenter", onEnter);
        track.removeEventListener("mouseleave", onLeave);
        tween.kill();
      };
    },
    { scope: ref }
  );

  // Duplicate items for seamless loop
  const loopItems = [...ITEMS, ...ITEMS];

  return (
    <section
      ref={ref}
      className={
        variant === "bare"
          ? "relative isolate overflow-hidden py-2"
          : "relative isolate overflow-hidden py-16 sm:py-24"
      }
      aria-label="Stack and ecosystem"
    >
      {variant === "default" && (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="stack-blob-a absolute -top-24 left-[10%] size-[420px] rounded-full bg-violet/15 blur-[140px]" />
            <div className="stack-blob-b absolute top-10 right-[12%] size-[420px] rounded-full bg-indigo/10 blur-[140px]" />
            <div className="stack-blob-c absolute -bottom-32 left-1/3 size-[460px] rounded-full bg-azure/10 blur-[160px]" />
          </div>

          <div
            aria-hidden
            className="absolute inset-0 bg-dot-grid opacity-[0.10]"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
            }}
          />
        </>
      )}

      <div className="stack-strip relative">
        {/* Marquee track */}
        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-max gap-4 will-change-transform sm:gap-5"
          >
            {loopItems.map((item, i) => (
              <Pill key={`${item.label}-${i}`} {...item} />
            ))}
          </div>

          {/* Side fades */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-32 sm:w-48"
            style={{
              background:
                "linear-gradient(90deg, var(--color-bg), rgba(15, 15, 15, 0) 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-32 sm:w-48"
            style={{
              background:
                "linear-gradient(-90deg, var(--color-bg), rgba(15, 15, 15, 0) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function Pill({ label, src }: Item) {
  return (
    <div
      className="group flex h-[78px] shrink-0 items-center gap-4 rounded-full bg-[#131512] px-10 transition-colors duration-300 hover:bg-[#1a1c1a] sm:gap-5 sm:px-12"
      style={{
        boxShadow: "0 1px 0 rgba(255, 255, 255, 0.04) inset",
      }}
    >
      {/* White chip keeps every logo legible on the dark pill, whether the
          favicon is dark-on-transparent (Walrus) or a full-bleed mark (Sui). */}
      <span
        aria-hidden
        className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-black/5 sm:size-10"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-contain"
        />
      </span>
      <span
        className="text-[20px] font-medium tracking-tight text-fg sm:text-[22px]"
        style={{ fontFamily: "var(--font-tech), ui-sans-serif, system-ui" }}
      >
        {label}
      </span>
    </div>
  );
}
