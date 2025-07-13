import AboutSection from "@/components/landing/AboutSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
