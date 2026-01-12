"use server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getContest(contestId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/contest/${contestId}/enter`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch contest: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error fetching contest:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch contest",
    };
  }
}

export async function getAllContests() {
  try {
    const response = await fetch(`${API_BASE_URL}/contest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch contests: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error fetching contests:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch contests",
    };
  }
}

export async function submitContestAnswer(
  contestId: string,
  questionId: string,
  answer: Record<string, unknown>
) {
  try {
    const response = await fetch(`${API_BASE_URL}/contest/${contestId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId,
        answer,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to submit answer: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error submitting answer:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit answer",
    };
  }
}
