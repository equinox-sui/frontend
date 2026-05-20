import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden px-5 sm:px-8">
      <div
        aria-hidden
        className="bg-grid mask-fade-edges pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-[var(--color-accent)]/10 blur-[100px]"
      />
      <OnboardingWizard />
    </div>
  );
}
