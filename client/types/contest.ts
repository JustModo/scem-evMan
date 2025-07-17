// types/contest.ts
export interface ContestLandingData {
  title: string;
  description: string;
  duration: {
    start: string;
    end: string;
  };
  totalProblems: number;
  author: string;
  rules: string[];
}

export interface Test {
  id: string;
  title: string;
  description: string;
  duration: string;
  totalQuestions: number;
  startsAt: string;
  status: "waiting" | "ongoing" | "completed";

  participantsInProgress: number;
  participantsCompleted: number;
}
