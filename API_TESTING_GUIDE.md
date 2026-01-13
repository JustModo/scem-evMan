# Testing the GET /api/test/:id/questions Endpoint

## Overview
This endpoint fetches all questions for a specific test/contest along with metadata and sample test cases.

## Endpoint Details
```
GET /api/test/:id/questions
```

### Parameters
- `id` (URL parameter): The MongoDB ObjectId of the contest/test

### Response
```json
{
  "success": true,
  "data": {
    "testId": "ObjectId",
    "title": "Test Title",
    "description": "Test Description",
    "isActive": true/false,
    "totalQuestions": 5,
    "startTime": "ISO timestamp",
    "endTime": "ISO timestamp",
    "questions": [
      {
        "id": "ObjectId",
        "type": "coding/mcq",
        "title": "Question Title",
        "description": "Question Description",
        "difficulty": "Easy/Medium/Hard",
        "marks": 10,
        "questionType": "Coding/Single Correct/Multiple Correct",
        "constraints": "1 <= n <= 10^5",
        "inputFormat": "First line contains n",
        "outputFormat": "Print the result",
        "boilerplateCode": {
          "python": "def solution():\n    pass",
          "java": "class Solution { ... }",
          "c": "int main() { ... }"
        },
        "functionName": "solution",
        "inputVariables": [{"variable": "n", "type": "int"}],
        "sampleTestCases": [
          {"input": "5", "output": "120"},
          {"input": "3", "output": "6"}
        ],
        "totalTestCases": 5
      }
    ]
  }
}
```

## How to Test with Postman

### Step 1: Get a Contest ID
First, you need to get a valid contest ID. You can:

**Option A: Use the seed data**
The seed script creates contests with these titles:
- "Beginner Programming Contest"
- "Quick MCQ Quiz"

**Option B: Query the database directly**
```bash
docker exec app-mongo-1 mongosh --eval "db.contests.find({}, {_id: 1, title: 1}).pretty()"
```

### Step 2: Create a Request in Postman

1. **Create a new GET request**
   - Method: `GET`
   - URL: `http://localhost:8080/api/test/{CONTEST_ID}/questions`
   - Replace `{CONTEST_ID}` with an actual MongoDB ObjectId

2. **Example URL:**
   ```
   http://localhost:8080/api/test/67a1234567890123456789ab/questions
   ```

3. **Headers:**
   - `Content-Type: application/json`

4. **Click Send**

### Step 3: Expected Responses

**Success (200):**
```json
{
  "success": true,
  "data": {
    "testId": "67a1234567890123456789ab",
    "title": "Beginner Programming Contest",
    "description": "A contest for beginners...",
    "isActive": true,
    "totalQuestions": 3,
    "startTime": "2026-01-13T14:30:00.000Z",
    "endTime": "2026-01-13T17:30:00.000Z",
    "questions": [...]
  }
}
```

**Test Not Found (404):**
```json
{
  "success": false,
  "error": "Test with ID 000000000000000000000000 not found"
}
```

**Missing ID (400):**
```json
{
  "success": false,
  "error": "Test ID is required"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Features Implemented

✅ **Fetch questions for specific test**: Uses URL parameter `:id`
✅ **Test validation**: Returns 404 if test doesn't exist
✅ **Question metadata**: Includes title, description, constraints, formats
✅ **Sample test cases**: Returns first 2 sample cases + total count
✅ **Test status**: Indicates if test is currently active
✅ **Error handling**: Detailed error messages for various scenarios
✅ **Security**: Doesn't return correct answers to client

## What's Included in Response

- **Basic test info**: ID, title, description, times
- **Test status**: Whether it's currently active based on start/end times
- **Question count**: Total number of questions
- **Per-question data**:
  - Question ID, type, title, description
  - Difficulty level and marks
  - For coding: constraints, formats, boilerplate code, sample test cases
  - For MCQ: question type, options
  - Metadata: function name, input variables

## Sample cURL Command

```bash
curl -X GET "http://localhost:8080/api/test/67a1234567890123456789ab/questions" \
  -H "Content-Type: application/json"
```

## Next Steps

After testing this endpoint, we can implement:
1. Add test active/inactive status checking
2. Include sample test cases in response
3. Add error handling for invalid test IDs
4. Add pagination for large number of questions
