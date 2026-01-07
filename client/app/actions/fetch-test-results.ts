"use server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface Participant {
  userId: string;
  name: string;
  email: string;
  score: number;
  status: "PASSED" | "FAILED";
  submittedAt: string;
}

interface TestResult {
  id: string;
  testName: string;
  description: string;
  participants: Participant[];
  stats: {
    totalParticipants: number;
    averageScore: number;
    passed: number;
    failed: number;
  };
}

export async function getTestResults(testId: string): Promise<{
  success: boolean;
  data?: TestResult;
  message?: string;
}> {
  try {
    // Fetch test/contest details
    const testResponse = await fetch(`${API_BASE_URL}/contest/${testId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!testResponse.ok) {
      throw new Error(`Failed to fetch test: ${testResponse.statusText}`);
    }

    const testData = await testResponse.json();

    // Fetch submissions for this test
    const submissionsResponse = await fetch(
      `${API_BASE_URL}/contest/${testId}/submissions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!submissionsResponse.ok) {
      throw new Error(`Failed to fetch submissions: ${submissionsResponse.statusText}`);
    }

    const submissionsData = await submissionsResponse.json();

    // Process submissions into participant data
    const participantMap = new Map<string, Participant>();

    if (submissionsData.submissions && Array.isArray(submissionsData.submissions)) {
      for (const submission of submissionsData.submissions) {
        const userId = submission.user._id || submission.user;
        const userName = submission.user.name || "Unknown";
        const userEmail = submission.user.email || "unknown@email.com";

        if (!participantMap.has(userId)) {
          participantMap.set(userId, {
            userId,
            name: userName,
            email: userEmail,
            score: 0,
            status: "FAILED",
            submittedAt: new Date().toISOString(),
          });
        }

        const participant = participantMap.get(userId)!;
        participant.score += submission.score || 0;
        participant.submittedAt = submission.submittedAt || new Date().toISOString();
      }
    }

    const participants = Array.from(participantMap.values());

    // Calculate stats
    const passThreshold = 50; // 50% passing score
    const passed = participants.filter((p) => p.score >= passThreshold).length;
    const failed = participants.filter((p) => p.score < passThreshold).length;

    const averageScore =
      participants.length > 0
        ? participants.reduce((sum, p) => sum + p.score, 0) /
          participants.length
        : 0;

    // Update status based on score
    participants.forEach((p) => {
      p.status = p.score >= passThreshold ? "PASSED" : "FAILED";
    });

    const result: TestResult = {
      id: testData._id || testId,
      testName: testData.title || "Untitled Test",
      description: testData.description || "",
      participants,
      stats: {
        totalParticipants: participants.length,
        averageScore: Math.round(averageScore * 100) / 100,
        passed,
        failed,
      },
    };

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error fetching test results:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch test results",
    };
  }
}
