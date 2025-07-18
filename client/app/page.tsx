import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import Footer from "@/components/landing/footer";
import AboutSection from "@/components/landing/about-section";
import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";

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
