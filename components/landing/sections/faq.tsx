"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { faq } from "@/lib/content";

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!sectionRef.current || !pinRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current!,
            start: "top top",
            end: "+=120%",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Card grows to fullscreen
        tl.to(
          ".faq-window",
          {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            ease: "power2.inOut",
            duration: 0.6,
          },
          0
        );

        tl.to(
          ".faq-mini",
          { opacity: 0, scale: 0.85, ease: "power2.in", duration: 0.25 },
          0
        );

        tl.fromTo(
          ".faq-expanded",
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          0.4
        );

        tl.fromTo(
          ".faq-headline-word",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.06, ease: "expo.out", duration: 0.3 },
          0.5
        );

        tl.fromTo(
          ".faq-item",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, stagger: 0.05, ease: "expo.out", duration: 0.35 },
          0.7
        );

        tl.fromTo(
          ".faq-footer",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, ease: "expo.out", duration: 0.25 },
          0.95
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      // Mobile: no pin, just show content with simple fades
      mm.add("(max-width: 1023px)", () => {
        gsap.set(".faq-window", { width: "100%", height: "auto" });
        gsap.set(".faq-mini", { display: "none" });
        gsap.set(".faq-expanded", { opacity: 1, position: "static" });

        gsap.fromTo(
          ".faq-headline-word",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: "expo.out",
            scrollTrigger: { trigger: sectionRef.current!, start: "top 75%" },
          }
        );
        gsap.fromTo(
          ".faq-item",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.6,
            ease: "expo.out",
            scrollTrigger: { trigger: ".faq-list", start: "top 85%" },
          }
        );
      });

      return () => {
        mm.revert();
        ScrollTrigger.refresh();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section id="faq" ref={sectionRef} className="relative bg-white">
      <div
        ref={pinRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-bg lg:flex"
      >
        <div className="absolute inset-0 bg-bg" aria-hidden />

        <div className="faq-window relative z-10 flex h-[360px] w-[330px] flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.6)]">
          {/* Mini state */}
          <div className="faq-mini absolute inset-0 p-8">
            <h3
              className="text-[2.2rem] font-medium leading-none text-[#0a0a0a]"
              style={{
                fontFamily: "var(--font-tech), ui-sans-serif, system-ui",
              }}
            >
              FAQ
            </h3>
            <div
              aria-hidden
              className="absolute bottom-5 right-5 grid size-12 place-items-center rounded-full text-white shadow-[0_-4px_8px_rgba(255,255,255,0.25)_inset]"
              style={{ background: "var(--gradient-brand)" }}
            >
              <ArrowUpRight className="size-5" />
            </div>
          </div>

          {/* Expanded state */}
          <div className="faq-expanded absolute inset-0 flex flex-col opacity-0">
            <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-7 pt-24 pb-6 sm:px-12 sm:pt-28 lg:px-20 lg:pt-36 lg:pb-8">
              <h2
                className="shrink-0 text-[clamp(1.5rem,3vw,3rem)] font-medium leading-[1.1] tracking-[-0.01em] text-[#0a0a0a]"
                style={{
                  fontFamily:
                    "var(--font-tech), ui-sans-serif, system-ui, -apple-system",
                }}
              >
                <span className="inline-flex flex-nowrap items-baseline gap-x-3 sm:gap-x-5 lg:gap-x-7 whitespace-nowrap">
                  <span className="faq-headline-word inline-block">Frequently</span>
                  <span className="faq-headline-word inline-block h-[2px] w-8 self-end translate-y-[-0.45em] bg-[#0a0a0a]/40 sm:w-14 lg:w-20" />
                  <span className="faq-headline-word inline-block">Asked</span>
                  <span className="faq-headline-word inline-block h-[2px] w-8 self-end translate-y-[-0.45em] bg-[#0a0a0a]/40 sm:w-14 lg:w-20" />
                  <span className="faq-headline-word inline-block">Questions</span>
                </span>
              </h2>

              {/* All items rendered inline — no inner scroll */}
              <div className="faq-list mx-auto mt-6 w-full max-w-[1120px] space-y-2 sm:space-y-2.5 lg:mt-8">
                {faq.items.map((item, i) => {
                  const isOpen = openIdx === i;
                  return (
                    <div
                      key={item.q}
                      className={`faq-item transition-colors ${
                        isOpen
                          ? "rounded-[28px] bg-[#0a0a0a]/[0.05]"
                          : "rounded-full bg-[#0a0a0a]/[0.04] hover:bg-[#0a0a0a]/[0.06]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenIdx((curr) => (curr === i ? null : i))
                        }
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-5 rounded-full px-6 py-3 text-left sm:px-8 sm:py-3.5"
                      >
                        <span
                          className="text-[15px] font-medium leading-snug text-[#0a0a0a] sm:text-base lg:text-[17px]"
                          style={{
                            fontFamily:
                              "var(--font-tech), ui-sans-serif, system-ui",
                          }}
                        >
                          {i + 1}. {item.q}
                        </span>
                        <span
                          aria-hidden
                          className="grid size-10 shrink-0 place-items-center rounded-full text-white shadow-[0_-4px_8px_rgba(255,255,255,0.25)_inset] sm:size-11"
                          style={{ background: "var(--gradient-brand)" }}
                        >
                          {isOpen ? (
                            <Minus className="size-4" />
                          ) : (
                            <Plus className="size-4" />
                          )}
                        </span>
                      </button>
                      {isOpen && (
                        <div
                          className="px-6 pb-4 pt-1 text-sm leading-relaxed text-[#0a0a0a]/70 sm:px-8 sm:pb-5 lg:text-[15px]"
                          style={{
                            fontFamily:
                              "var(--font-tech), ui-sans-serif, system-ui",
                          }}
                        >
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="faq-footer mt-6 flex shrink-0 flex-col items-start justify-between gap-5 sm:flex-row sm:items-center lg:mt-8">
                <div
                  className="flex max-w-xl items-start gap-3 text-[13px] leading-snug text-[#0a0a0a]/55 sm:text-[14px] lg:text-[15px]"
                  style={{
                    fontFamily:
                      "var(--font-tech), ui-sans-serif, system-ui",
                  }}
                >
                  <Plus className="mt-0.5 size-4 shrink-0" />
                  <span>{faq.hint}</span>
                </div>
                <a
                  href={faq.community.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex shrink-0 items-center gap-3 text-[#0a0a0a]"
                >
                  <span
                    aria-hidden
                    className="grid size-[56px] place-items-center rounded-[16px] bg-[#3b5bff] text-white transition-transform group-hover:-translate-y-0.5"
                  >
                    <span className="inline-flex gap-1.5">
                      <span className="size-1.5 rounded-full bg-white" />
                      <span className="size-1.5 rounded-full bg-white" />
                      <span className="size-1.5 rounded-full bg-white" />
                    </span>
                  </span>
                  <span
                    className="text-[13px] font-semibold leading-tight sm:text-[14px] lg:text-[15px]"
                    style={{
                      fontFamily:
                        "var(--font-tech), ui-sans-serif, system-ui",
                    }}
                  >
                    Any Questions? Ask
                    <br />
                    The Community.
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
