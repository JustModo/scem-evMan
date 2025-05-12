import React from "react";

interface HeroSectionProps {
  content: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  return (
    <div className="mt-16 border-2 border-[#A0CC98] rounded-xl p-6 text-center max-w-5xl w-full mx-auto">
      <h2 className="text-2xl font-bold text-[#A0CC98]">{content}</h2>
    </div>
  );
};

export default HeroSection;
