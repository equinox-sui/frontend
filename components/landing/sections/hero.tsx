"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { hero } from "@/lib/content";
import { cn } from "@/lib/cn";

const CHIPS = [
  {
    label: "Collateral",
    value: "1,000 SUI",
    dot: "#5cd8ff",
    pos: { top: "6%", left: "-2%" },
    delay: 0,
  },
  {
    label: "Borrow",
    value: "$1,925 USDC",
    dot: "#ff7a90",
    pos: { top: "44%", right: "-6%" },
    delay: 0.4,
  },
  {
    label: "Spread · auto-repay",
    value: "+$0.42 / hr",
    dot: "#9181f5",
    pos: { bottom: "4%", left: "6%" },
    delay: 0.8,
  },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();

      // === Copy entrance timeline ===
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1 } });
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
          { opacity: 0, scale: 0.88, y: 24 },
          { opacity: 1, scale: 1, y: 0, duration: 1.3, ease: "expo.out" },
          "-=0.85"
        );

      // === Chip entrance + idle drift ===
      gsap.utils.toArray<HTMLElement>("[data-chip]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 12, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: 1.2 + i * 0.2,
            ease: "expo.out",
          }
        );
        gsap.to(el, {
          y: (i % 2 === 0 ? -1 : 1) * 8,
          duration: 4 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.6 + i * 0.2,
        });
      });

      // === Coin idle ===
      gsap.to("[data-float]", {
        y: -14,
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to("[data-float]", {
        rotateZ: 1.2,
        duration: 6.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // === Comet trail on Saturn ring (stroke-dashoffset orbit) ===
      gsap.to("[data-comet]", {
        strokeDashoffset: -1170, // approx circumference of r=186
        duration: 6,
        ease: "none",
        repeat: -1,
      });

      // === Outer faint ring slow rotation ===
      gsap.to("[data-orbit-outer]", {
        rotation: 360,
        duration: 60,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      // === Aurora breathing ===
      gsap.to("[data-aurora]", {
        opacity: 1,
        scale: 1.1,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // === Spread-rate counter pulse ===
      gsap.utils.toArray<HTMLElement>("[data-chip-dot]").forEach((el, i) => {
        gsap.to(el, {
          opacity: 0.35,
          duration: 1.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.5,
        });
      });

      // === Star twinkles ===
      gsap.utils.toArray<HTMLElement>("[data-star]").forEach((el, i) => {
        gsap.to(el, {
          opacity: 0.25,
          duration: 1.6 + (i % 3) * 0.4,
          delay: i * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // === Mouse-parallax tilt + cursor light + hover ===
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
          field.style.setProperty("--cx", `${((e.clientX - r.left) / r.width) * 100}%`);
          field.style.setProperty("--cy", `${((e.clientY - r.top) / r.height) * 100}%`);
        };
        const onLeave = () => {
          gsap.to(float, {
            rotationX: 0,
            rotationY: 0,
            duration: 1.1,
            ease: "elastic.out(1, 0.6)",
          });
          field.style.setProperty("--cx", `50%`);
          field.style.setProperty("--cy", `50%`);
        };
        const onCoinEnter = () => {
          gsap.to("[data-coin-pulse]", {
            scale: 1.04,
            duration: 0.7,
            ease: "power3.out",
          });
          gsap.to("[data-aurora]", {
            opacity: 1.15,
            duration: 0.7,
            ease: "power2.out",
          });
        };
        const onCoinLeave = () => {
          gsap.to("[data-coin-pulse]", {
            scale: 1,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          });
        };
        field.addEventListener("mousemove", onMove);
        field.addEventListener("mouseleave", onLeave);
        float.addEventListener("mouseenter", onCoinEnter);
        float.addEventListener("mouseleave", onCoinLeave);
        return () => {
          field.removeEventListener("mousemove", onMove);
          field.removeEventListener("mouseleave", onLeave);
          float.removeEventListener("mouseenter", onCoinEnter);
          float.removeEventListener("mouseleave", onCoinLeave);
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

        {/* Right — clean coin field */}
        <div
          ref={fieldRef}
          className="hero-field relative mx-auto flex aspect-square w-full max-w-[420px] origin-center items-center justify-center sm:max-w-[480px] lg:order-2 lg:mx-0 lg:max-w-[540px] lg:justify-end"
          style={{
            perspective: 1200,
            ["--cx" as string]: "50%",
            ["--cy" as string]: "50%",
          } as React.CSSProperties}
        >
          {/* Aurora glow (single, diffuse, breathing) */}
          <div
            data-aurora
            aria-hidden
            className="absolute inset-[8%] rounded-full opacity-80 will-change-transform"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, rgba(145,129,245,0.45) 0%, rgba(255,122,144,0.18) 40%, transparent 75%)",
              filter: "blur(36px)",
            }}
          />

          {/* Cursor light */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(220px circle at var(--cx) var(--cy), rgba(255,255,255,0.07), transparent 60%)",
            }}
          />

          {/* Outer faint dashed circle, slow */}
          <svg
            data-orbit-outer
            aria-hidden
            viewBox="0 0 400 400"
            className="absolute inset-0 h-full w-full will-change-transform"
          >
            <circle
              cx="200"
              cy="200"
              r="186"
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
              strokeDasharray="1 8"
            />
          </svg>

          {/* Saturn-tilted ring with comet trail (the focal motion) */}
          <div
            aria-hidden
            className="absolute inset-[-2%] h-[104%] w-[104%] will-change-transform"
            style={{ transform: "rotateX(70deg)" }}
          >
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient
                  id="comet-gradient"
                  x1="0%"
                  x2="100%"
                  y1="0%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgba(255,122,144,0)" />
                  <stop offset="60%" stopColor="rgba(255,122,144,0.45)" />
                  <stop offset="100%" stopColor="rgba(145,129,245,1)" />
                </linearGradient>
              </defs>
              {/* Base ring */}
              <circle
                cx="200"
                cy="200"
                r="186"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1.2"
              />
              {/* Comet trail */}
              <circle
                data-comet
                cx="200"
                cy="200"
                r="186"
                fill="none"
                stroke="url(#comet-gradient)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="120 1050"
                strokeDashoffset="0"
                style={{ filter: "drop-shadow(0 0 6px rgba(145,129,245,0.8))" }}
              />
            </svg>
          </div>

          {/* Floor reflection beneath the coin */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[8%] left-1/2 h-[6%] w-[55%] -translate-x-1/2 rounded-full opacity-70"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,122,144,0.35) 0%, rgba(92,216,255,0.18) 45%, transparent 75%)",
              filter: "blur(10px)",
            }}
          />

          {/* Floating coin */}
          <div
            ref={floatRef}
            className="relative z-10 h-[64%] w-[64%] cursor-pointer will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div data-float className="relative h-full w-full">
              <div data-coin-pulse className="relative h-full w-full">
                <Image
                  src="/bg-new.png"
                  alt="Equinox — self-repaying loans on Sui"
                  fill
                  priority
                  sizes="(max-width: 768px) 80vw, 480px"
                  className="rounded-[28%] object-cover"
                  style={{
                    boxShadow:
                      "0 40px 80px -20px rgba(255,122,144,0.4), 0 0 0 1px rgba(255,255,255,0.08) inset, 0 0 60px -10px rgba(92,216,255,0.4)",
                  }}
                />
                {/* Specular */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[28%]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 38%, rgba(255,255,255,0) 62%, rgba(92,216,255,0.12) 100%)",
                    mixBlendMode: "screen",
                  }}
                />
                {/* Inner stroke */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-1 rounded-[26%] border border-white/10"
                />
              </div>
            </div>
          </div>

          {/* Floating product chips — give the coin context */}
          {CHIPS.map((c) => (
            <div
              key={c.label}
              data-chip
              className="absolute z-20 rounded-full border border-white/[0.08] bg-[#0f0f0f]/85 px-3.5 py-2 backdrop-blur-md will-change-transform"
              style={{
                ...c.pos,
                boxShadow:
                  "0 12px 26px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
              }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  data-chip-dot
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full"
                  style={{
                    background: c.dot,
                    boxShadow: `0 0 8px ${c.dot}`,
                  }}
                />
                <div className="flex flex-col leading-none">
                  <span
                    className="text-[10px] uppercase tracking-[0.16em] text-fg-dim"
                    style={{
                      fontFamily: "var(--font-tech), ui-sans-serif, system-ui",
                    }}
                  >
                    {c.label}
                  </span>
                  <span
                    className="mt-1 text-[12.5px] font-medium tabular-nums text-fg"
                    style={{
                      fontFamily: "var(--font-tech), ui-sans-serif, system-ui",
                    }}
                  >
                    {c.value}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Sparse stars */}
          <span
            data-star
            aria-hidden
            className="absolute left-[20%] top-[12%] size-[3px] rounded-full bg-white"
            style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.9))" }}
          />
          <span
            data-star
            aria-hidden
            className="absolute right-[18%] bottom-[20%] size-[2.5px] rounded-full bg-white"
            style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.9))" }}
          />
          <span
            data-star
            aria-hidden
            className="absolute left-[80%] top-[30%] size-[2px] rounded-full bg-white opacity-70"
          />
          <span
            data-star
            aria-hidden
            className="absolute left-[12%] top-[68%] size-[2px] rounded-full bg-white opacity-70"
          />
        </div>
      </div>
    </section>
  );
}
