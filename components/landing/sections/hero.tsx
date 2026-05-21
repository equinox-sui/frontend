"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { hero } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();

      // Hero copy entrance
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1 },
      });
      tl.fromTo(
        ".hero-word",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.9 }
      )
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".hero-cta-row",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.45"
        )
        .fromTo(
          ".hero-field",
          { opacity: 0, scale: 0.86, rotation: -8, y: 28 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            y: 0,
            duration: 1.4,
            ease: "expo.out",
          },
          "-=0.85"
        );

      // Continuous gentle bobbing on the coin
      gsap.to("[data-float]", {
        y: -16,
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Slow rotation on the orbiting ring
      gsap.to("[data-orbit]", {
        rotation: 360,
        duration: 32,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      // Counter-rotation on the inner accent
      gsap.to("[data-orbit-inner]", {
        rotation: -360,
        duration: 22,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      // Breathing glow behind the image
      gsap.to("[data-glow]", {
        opacity: 1,
        scale: 1.12,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Twinkle on the satellite dots
      gsap.utils.toArray<HTMLElement>("[data-twinkle]").forEach((el, i) => {
        gsap.to(el, {
          opacity: 0.35,
          duration: 1.4 + (i % 3) * 0.4,
          delay: i * 0.18,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // Mouse-parallax tilt on the entire field
      const field = fieldRef.current;
      const float = floatRef.current;
      if (field && float) {
        const onMove = (e: MouseEvent) => {
          const r = field.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(float, {
            rotationY: nx * 14,
            rotationX: -ny * 10,
            duration: 0.9,
            ease: "power3.out",
            transformPerspective: 1000,
          });
        };
        const onLeave = () => {
          gsap.to(float, {
            rotationX: 0,
            rotationY: 0,
            duration: 1.1,
            ease: "elastic.out(1, 0.6)",
          });
        };
        field.addEventListener("mousemove", onMove);
        field.addEventListener("mouseleave", onLeave);
        return () => {
          field.removeEventListener("mousemove", onMove);
          field.removeEventListener("mouseleave", onLeave);
        };
      }
    },
    { scope: ref }
  );

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24 lg:min-h-[880px] lg:pt-36"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-dot-grid opacity-[0.18]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 78%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 78%, transparent)",
        }}
      />

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-12 px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_540px] lg:items-center lg:gap-12 lg:px-10 xl:gap-20">
        {/* Left — headline + description + CTA */}
        <div className="relative z-10 max-w-[640px] lg:order-1 lg:max-w-[600px]">
          <h1
            className="text-[clamp(1.5rem,2.9vw,2.6rem)] font-normal leading-[1.15] tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-tech), ui-sans-serif, system-ui" }}
          >
            {hero.headline.map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <span className="inline-block">
                  {line.map((word, wi) => (
                    <span
                      key={wi}
                      className={cn(
                        "hero-word inline-block",
                        word.tone === "muted" ? "text-fg-dim" : "text-fg",
                        wi < line.length - 1 && "mr-[0.32em]"
                      )}
                    >
                      {word.text}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </h1>

          <div className="hero-desc mt-10 flex max-w-md items-start gap-3">
            <span
              aria-hidden
              className="mt-[6px] grid size-5 place-items-center rounded-full border border-border-strong text-fg-dim"
            >
              <Plus className="size-3" />
            </span>
            <p className="text-sm leading-relaxed text-fg-muted sm:text-[15px]">
              {hero.description}
            </p>
          </div>

          <div className="hero-cta-row mt-9">
            <Link
              href={hero.openApp.href}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-bg shadow-[0_-4px_7px_rgba(225,225,225,0.32)_inset] transition-colors hover:bg-[#fafafa]"
            >
              <span>{hero.openApp.label}</span>
              <span
                aria-hidden
                className="grid size-7 place-items-center rounded-full"
                style={{ background: "var(--gradient-brand)" }}
              >
                <ArrowUpRight className="size-3.5 text-white transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
              </span>
            </Link>
          </div>
        </div>

        {/* Right — animated coin field */}
        <div
          ref={fieldRef}
          className="hero-field relative mx-auto flex aspect-square w-full max-w-[420px] origin-center items-center justify-center sm:max-w-[480px] lg:order-2 lg:mx-0 lg:max-w-[540px] lg:justify-end"
          style={{ perspective: 1200 }}
        >
          {/* Breathing glow behind */}
          <div
            data-glow
            aria-hidden
            className="absolute inset-[10%] rounded-full opacity-70"
            style={{
              background:
                "radial-gradient(circle, rgba(64,122,255,0.55) 0%, rgba(64,122,255,0.18) 40%, transparent 70%)",
              filter: "blur(28px)",
            }}
          />

          {/* Slow rotating decorative ring */}
          <svg
            data-orbit
            aria-hidden
            viewBox="0 0 400 400"
            className="absolute inset-0 h-full w-full"
            style={{ willChange: "transform" }}
          >
            <defs>
              <linearGradient id="orbit-stroke" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
                <stop offset="35%" stopColor="rgba(145,129,245,0.55)" />
                <stop offset="65%" stopColor="rgba(64,122,255,0.45)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
              </linearGradient>
            </defs>
            <circle
              cx="200"
              cy="200"
              r="186"
              fill="none"
              stroke="url(#orbit-stroke)"
              strokeWidth="1.2"
              strokeDasharray="2 6"
            />
            <circle
              cx="200"
              cy="14"
              r="3"
              fill="#fff"
              style={{ filter: "drop-shadow(0 0 6px rgba(145,129,245,0.9))" }}
            />
            <circle
              cx="386"
              cy="200"
              r="2"
              fill="#fff"
              opacity="0.7"
              style={{ filter: "drop-shadow(0 0 4px rgba(64,122,255,0.8))" }}
            />
          </svg>

          {/* Counter-rotating inner accent */}
          <svg
            data-orbit-inner
            aria-hidden
            viewBox="0 0 400 400"
            className="absolute inset-[12%] h-[76%] w-[76%]"
            style={{ willChange: "transform" }}
          >
            <circle
              cx="200"
              cy="200"
              r="170"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            <circle
              cx="370"
              cy="200"
              r="2.5"
              fill="rgba(228,243,61,0.95)"
              style={{ filter: "drop-shadow(0 0 5px rgba(228,243,61,0.9))" }}
            />
            <circle
              cx="30"
              cy="200"
              r="1.6"
              fill="rgba(255,255,255,0.8)"
            />
          </svg>

          {/* Floating coin — main image with tilt */}
          <div
            ref={floatRef}
            className="relative h-[72%] w-[72%] will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div data-float className="relative h-full w-full">
              <Image
                src="/bg-home.png"
                alt="Sui — built natively on Sui"
                fill
                priority
                sizes="(max-width: 768px) 80vw, 480px"
                className="rounded-[28%] object-cover"
                style={{
                  boxShadow:
                    "0 40px 80px -20px rgba(64,122,255,0.45), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 60px -10px rgba(145,129,245,0.4)",
                }}
              />
              {/* Specular highlight overlay */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[28%]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 38%, rgba(255,255,255,0) 60%, rgba(64,122,255,0.12) 100%)",
                  mixBlendMode: "screen",
                }}
              />
              {/* Inner ring */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-1 rounded-[26%] border border-white/10"
              />
            </div>
          </div>

          {/* Satellite twinkling dots */}
          <span
            data-twinkle
            aria-hidden
            className="absolute left-[8%] top-[24%] size-1 rounded-full bg-white"
            style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.9))" }}
          />
          <span
            data-twinkle
            aria-hidden
            className="absolute right-[12%] top-[18%] size-1.5 rounded-full bg-violet-soft"
            style={{ filter: "drop-shadow(0 0 8px rgba(145,129,245,0.9))" }}
          />
          <span
            data-twinkle
            aria-hidden
            className="absolute right-[6%] bottom-[28%] size-1 rounded-full bg-white"
          />
          <span
            data-twinkle
            aria-hidden
            className="absolute left-[14%] bottom-[16%] size-1.5 rounded-full bg-[#5cd8ff]"
            style={{ filter: "drop-shadow(0 0 8px rgba(92,216,255,0.85))" }}
          />
          <span
            data-twinkle
            aria-hidden
            className="absolute left-[42%] top-[6%] size-[3px] rounded-full bg-white"
          />
        </div>
      </div>
    </section>
  );
}
