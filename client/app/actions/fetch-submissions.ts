"use server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getSubmissionDetails(
  testId: string,
  userId: string
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/test/${testId}/submissions/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch submission: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error fetching submission:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch submission",
    };
  }
}

export async function getTestSubmissions(testId: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/test/${testId}/submissions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch submissions: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch submissions",
    };
  }
}

export async function gradeSubmission(
  testId: string,
  userId: string,
  score: number,
  feedback?: string
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/test/${testId}/submissions/${userId}/grade`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score,
          feedback,
        }),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to grade submission: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error grading submission:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to grade submission",
    };
  }
}
