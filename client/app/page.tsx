import { Hero } from "@/components/landing/hero";
import AboutSection from "@/components/landing/AboutSection";
import FeaturesSection from "@/components/landing/FeaturesSection";

export default function HomePage() {
  return (
    <main
      className="bg-background text-foreground"
      style={{ fontFamily: "Inter, Arial, sans-serif" }}
    >
      {/* Inter font for this page only */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
      `}</style>
      <Hero
        title="Powerful, Effortless Coding Events."
        subtitle="Host or join programming contests, assessments, and challenges with a modern, reliable platform."
        actions={[
          {
            label: "Join a Test",
            href: "/join",
            variant: "outline",
          },
        ]}
        titleClassName="text-5xl md:text-6xl font-extrabold"
        subtitleClassName="text-lg md:text-xl max-w-[600px] text-muted-foreground"
        actionsClassName="mt-8"
      />
      <div className="h-4" />
      <AboutSection />
      <FeaturesSection />
      <div className="h-20" />
      <div className="mt-12 flex flex-col items-center text-muted-foreground text-sm pb-8 px-4">
        <span>
          Made with <span className="text-red-500">❤️</span> by SOSC
        </span>
      </div>
    </main>
  );
}
