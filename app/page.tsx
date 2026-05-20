import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { PartnerMarquee } from "@/components/sections/PartnerMarquee";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Concepts } from "@/components/sections/Concepts";
import { WhyEquinox } from "@/components/sections/WhyEquinox";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { CallToAction } from "@/components/sections/CallToAction";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PartnerMarquee />
        <HowItWorks />
        <Concepts />
        <WhyEquinox />
        <TrustSignals />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
