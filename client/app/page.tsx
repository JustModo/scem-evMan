import Footer from "@/components/landing/Footer";
import AboutSection from "@/components/landing/about-section";
import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";

export default function HomePage() {
  return (
    <main className="w-screen h-screen pt-12">
      <div className="overflow-y-auto h-full">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <Footer />
      </div>
    </main>
  );
}
