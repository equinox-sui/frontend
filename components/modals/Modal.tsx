"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useFocusTrap } from "@/lib/useFocusTrap";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  maxWidthClassName?: string;
  hideClose?: boolean;
}

export function Modal({
  open,
  onClose,
  children,
  title,
  subtitle,
  maxWidthClassName = "max-w-md",
  hideClose,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();

  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduced ? 0.001 : 0.35;
    gsap.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: dur, ease: "power2.out" },
    );
    gsap.fromTo(
      panel,
      { y: 20, opacity: 0, scale: 0.985 },
      { y: 0, opacity: 1, scale: 1, duration: dur * 1.1, ease: "expo.out" },
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (typeof window === "undefined") return null;
  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-md sm:items-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : "Dialog"}
        tabIndex={-1}
        className={cn(
          "relative w-full overflow-hidden rounded-t-3xl border border-border-strong/80 bg-[var(--bg-elev)] outline-none",
          "sm:rounded-3xl sm:my-6",
          maxWidthClassName,
        )}
      >
        <div className="pointer-events-none absolute -top-32 right-0 h-56 w-56 rounded-full bg-[var(--color-violet)]/15 blur-[80px]" />
        {(title || !hideClose) && (
          <div className="relative flex items-start justify-between gap-4 border-b border-border/80 px-6 py-5">
            <div>
              {title && (
                <h2
                  id={titleId}
                  className="text-[17px] font-medium tracking-[-0.01em] text-fg"
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-1 text-[13px] text-fg-muted">{subtitle}</p>
              )}
            </div>
            {!hideClose && (
              <button
                aria-label="Close"
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-strong/80 text-fg-muted transition-colors hover:bg-white/[0.05] hover:text-fg"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}
        <div className="relative">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
