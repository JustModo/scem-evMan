// types/contest.ts
export interface ContestLandingData {
  title: string;
  description: string;
  duration: {
    start: Date;
    end: Date;
  };
  totalProblems: number;
  author: string;
  rules: string[];
}
