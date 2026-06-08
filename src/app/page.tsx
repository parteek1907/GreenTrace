import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProblemSolution from "@/components/landing/ProblemSolution";
import CarbonTwinPreview from "@/components/landing/CarbonTwinPreview";
import JourneyTimeline from "@/components/landing/JourneyTimeline";
import ChallengesPreview from "@/components/landing/ChallengesPreview";
import Features from "@/components/landing/Features";
import Statistics from "@/components/landing/Statistics";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <main>
        {/* Unified Hero Container */}
        <div className="relative max-w-[98vw] xl:max-w-[1400px] mx-auto mt-2 md:mt-4 mb-24 rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl bg-gt-dark">
          <Navbar />
          <Hero />
        </div>
        <ProblemSolution />
        <CarbonTwinPreview />
        <JourneyTimeline />
        <ChallengesPreview />
        <Features />
        <Statistics />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
