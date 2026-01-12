export interface TestParticipant {
  userId: string;
  name: string;
  email: string;
  score: number;
  status: "PASSED" | "FAILED";
  submittedAt: string;
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
  problems: string[] | any[];
  participants?: TestParticipant[];
  createdAt: string;
}
