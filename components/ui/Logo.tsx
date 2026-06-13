import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="relative grid h-7 w-7 shrink-0 place-items-center">
        <Image
          src="/logo.png"
          alt="Equinox"
          width={28}
          height={28}
          priority
          className="h-7 w-7 object-contain"
        />
      </span>
      <span className="font-medium tracking-[-0.01em] text-[15px] text-fg">
        Equinox<span className="font-normal text-fg-dim"> Agent</span>
      </span>
    </div>
  );
}
