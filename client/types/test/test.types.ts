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
  problems: number[];
}
