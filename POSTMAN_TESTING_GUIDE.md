# Postman Testing Guide for GET /api/test/questions/:id

## Endpoint Implemented
✅ `GET /api/test/questions/:id`

**Full URL:** `http://localhost:8080/api/test/questions/{contestId}`

---

## Step 1: Get a Valid Contest ID

Since the data is seeded in MongoDB, we need to get a valid Contest ID. Here are your options:

### Option A: Use MongoDB Shell (Recommended)
```bash
docker exec app-mongo-1 mongosh << 'EOF'
db.contests.findOne({}, {_id: 1, title: 1})
EOF
```

This will show you something like:
```json
{
  "_id": ObjectId("67a1234567890abcdef01234"),
  "title": "Beginner Programming Contest"
}
```

Copy the ObjectId value (without "ObjectId()").

### Option B: Query Through API
Test the existing `/check_valid` endpoint to see available contests:
```bash
curl -X POST http://localhost:8080/api/test/check_valid \
  -H "Content-Type: application/json" \
  -d '{"contestId":"<test-with-various-ids>"}'
```

---

## Step 2: Setup in Postman

### Create a New Request
1. **Method:** GET
2. **URL:** 
   ```
   http://localhost:8080/api/test/questions/{{CONTEST_ID}}
   ```
3. **Headers:**
   ```
   Content-Type: application/json
   ```

### Using Environment Variables (Optional)
1. Create an environment variable `CONTEST_ID` with your contest ObjectId
2. Use `{{CONTEST_ID}}` in the URL

---

## Step 3: Test Cases

### Test Case 1: Valid Contest ID
**URL:** 
```
http://localhost:8080/api/test/questions/67a1234567890abcdef01234
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "testId": "67a1234567890abcdef01234",
    "title": "Beginner Programming Contest",
    "description": "A contest for beginners to test their basic programming skills.",
    "isActive": true,
    "totalQuestions": 3,
    "startTime": "2026-01-13T14:00:00.000Z",
    "endTime": "2026-01-13T17:00:00.000Z",
    "questions": [
      {
        "id": "67b1234567890abcdef01234",
        "type": "coding",
        "title": "Two Sum",
        "description": "Given an array of integers nums and an integer target...",
        "difficulty": "Easy",
        "marks": 10,
        "questionType": "Coding",
        "constraints": "2 <= nums.length <= 104",
        "inputFormat": "First line: n, Second line: n space-separated integers",
        "outputFormat": "Two space-separated indices",
        "boilerplateCode": {
          "python": "def twoSum(nums, target):\n    pass",
          "java": "class Solution { public int[] twoSum() {} }",
          "c": "int* twoSum(int* nums, int numsSize, int target) { ... }"
        },
        "functionName": "twoSum",
        "inputVariables": [
          {"variable": "nums", "type": "int_array"},
          {"variable": "target", "type": "int"}
        ],
        "sampleTestCases": [
          {"input": "[2,7,11,15], 9", "output": "[0,1]"},
          {"input": "[3,2,4], 6", "output": "[1,2]"}
        ],
        "totalTestCases": 5
      },
      // ... more questions
    ]
  }
}
```

### Test Case 2: Invalid Contest ID Format
**URL:**
```
http://localhost:8080/api/test/questions/invalid-id
```

**Expected Response (500):**
```json
{
  "success": false,
  "error": "Cast to ObjectId failed for value \"invalid-id\" (type string) at path \"_id\""
}
```

### Test Case 3: Non-existent Contest ID
**URL:**
```
http://localhost:8080/api/test/questions/000000000000000000000000
```

**Expected Response (404):**
```json
{
  "success": false,
  "error": "Test with ID 000000000000000000000000 not found"
}
```

### Test Case 4: Empty ID
**URL:**
```
http://localhost:8080/api/test/questions/
```

**Expected Response:** Route not found (404)

---

## Features Implemented

✅ **URL Parameter Support**: Uses `:id` instead of query parameters  
✅ **Test Validation**: Checks if test/contest exists  
✅ **Active Status**: Indicates if test is currently active  
✅ **Question Metadata**: Returns all relevant question data  
✅ **Sample Test Cases**: Returns first 2 sample cases + total count  
✅ **Error Handling**: Detailed error messages for different scenarios  
✅ **Security**: Doesn't expose correct answers to client  

---

## Response Data Structure

### Top Level
```json
{
  "success": boolean,
  "data": { /* if success */ },
  "error": "message" /* if !success */
}
```

### Contest Data
- `testId`: MongoDB ObjectId
- `title`: Contest title
- `description`: Contest description
- `isActive`: Boolean based on current time vs start/end times
- `totalQuestions`: Number of questions in the contest
- `startTime`: ISO 8601 timestamp
- `endTime`: ISO 8601 timestamp

### Question Data (Per Question)
- **Common**: id, type, title, description, difficulty, marks, questionType
- **Coding**: constraints, inputFormat, outputFormat, boilerplateCode, functionName, inputVariables, sampleTestCases, totalTestCases
- **MCQ**: options (correct answer NOT included)
- **NOT included**: correctAnswer (security)

---

## Verification Checklist

- [ ] Endpoint returns status 200 for valid contest ID
- [ ] Test validation works (returns 404 for non-existent ID)
- [ ] Question metadata includes all required fields
- [ ] Sample test cases are included (capped at 2 for preview)
- [ ] Total test case count is returned
- [ ] Error messages are descriptive
- [ ] Correct answers are NOT sent to client
- [ ] Test active status is accurate

---

## Next Implementation Steps

1. **Test Validation**: Add more robust validation (status checks, start/end time validation)
2. **Pagination**: Add pagination for tests with many questions
3. **Filtering**: Allow filtering by difficulty level
4. **Authentication**: Optional: Add auth checks for private contests
5. **Caching**: Add caching for frequently accessed contests

