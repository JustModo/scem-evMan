"use server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function createTest(testData: {
  title: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  questions?: any[];
  vis?: boolean;
  type?: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/test/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to create test: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error creating test:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create test",
    };
  }
}

export async function getAdminTests() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/tests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tests: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error fetching tests:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch tests",
    };
  }
}

export async function getAdminQuestions() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error fetching questions:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch questions",
    };
  }
}

export async function deleteTest(testId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/test/${testId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete test: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error deleting test:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete test",
    };
  }
}

export async function updateTest(testId: string, testData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/test/${testId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to update test: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error updating test:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update test",
    };
  }
}
