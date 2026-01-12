"use server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function runCode(code: string, language: string, input?: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/cmp/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        language,
        input,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to run code: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error running code:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to run code",
    };
  }
}

export async function submitCode(
  code: string,
  language: string,
  testcases: Array<Record<string, unknown>>
) {
  try {
    const response = await fetch(`${API_BASE_URL}/cmp/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        language,
        testcases,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to submit code: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error submitting code:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit code",
    };
  }
}
