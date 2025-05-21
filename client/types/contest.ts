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
