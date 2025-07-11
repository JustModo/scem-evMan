import * as React from "react";

const features = [
  [
    {
      title: "For Participants",
      description: "Join contests, solve challenges, and track your progress in real time.",
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-muted-foreground mb-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H7m5 0h5" /></svg>
      ),
    },
    {
      title: "Secure & Private",
      description: "All data and submissions are protected and confidential.",
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-muted-foreground mb-2"><rect x="6" y="10" width="12" height="10" rx="2" strokeWidth={2} stroke="currentColor" fill="none" /><path d="M12 16v-2" strokeWidth={2} stroke="currentColor" /><path d="M8 10V8a4 4 0 1 1 8 0v2" strokeWidth={2} stroke="currentColor" /></svg>
      ),
    },
  ],
  [
    {
      title: "For Organizers",
      description: "Create events, upload problems, and manage contests with powerful tools.",
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-muted-foreground mb-2"><rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} stroke="currentColor" fill="none" /><path d="M8 8h8M8 12h8M8 16h4" strokeWidth={2} stroke="currentColor" /></svg>
      ),
    },
    {
      title: "No Signups Needed",
      description: "Participants can join instantly—no account required.",
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-muted-foreground mb-2"><path d="M12 4v16m8-8H4" strokeWidth={2} stroke="currentColor" /></svg>
      ),
    },
  ],
  [
    {
      title: "Real-Time Ranking",
      description: "Automatic, live leaderboard updates for every contest.",
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-muted-foreground mb-2"><path d="M8 17v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6" strokeWidth={2} stroke="currentColor" fill="none" /><rect x="4" y="17" width="16" height="3" rx="1.5" strokeWidth={2} stroke="currentColor" fill="none" /></svg>
      ),
    },
    {
      title: "Mobile Friendly",
      description: "Optimized for all devices—access anywhere, anytime.",
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-muted-foreground mb-2"><rect x="7" y="2" width="10" height="20" rx="2" strokeWidth={2} stroke="currentColor" fill="none" /><circle cx="12" cy="18" r="1" fill="currentColor" /></svg>
      ),
    },
  ],
];

export default function FeaturesSection() {
  return (
    <section className="py-10 bg-background transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-12">
              {column.map((feature, idx) => (
                <div
                  key={feature.title}
                  className="relative flex flex-row items-start gap-4 px-6 py-6 rounded-xl bg-background"
                >
                  <div className="flex-shrink-0">{feature.icon}</div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg text-foreground mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-tight">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 