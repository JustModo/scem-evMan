import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import AboutSection from "@/components/landing/AboutSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <div className="flex justify-end px-6 py-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
      </div>

      <AboutSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
