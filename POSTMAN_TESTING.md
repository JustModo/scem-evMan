# Testing /submit API in Postman

## Step 1: Get JWT Token

**Method:** POST  
**URL:** `http://localhost:8080/api/auth/login`  
**Headers:**
```
Content-Type: application/json
```
**Body (raw JSON):**
```json
{
  "email": "user@example.com",
  "password": "user123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "6962264a717a7ee2fced27a1",
    "email": "user@example.com",
    "name": "Regular User",
    "role": "user"
  }
}
```

---

## Step 2: Generate JWT Token Manually

Since the backend doesn't return JWT directly, you need to create one using the AUTH_SECRET.

**Use this Node.js script** (or use the browser console):
```javascript
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  {
    userId: '6962264a717a7ee2fced27a1',
    role: 'user',
    email: 'user@example.com'
  },
  'TEzA1EkCfQIB5ojS1RyHttcDQtqzQK94KFYygaW8740=',
  { algorithm: 'HS256', expiresIn: '1h' }
);

console.log('JWT Token:', token);
```

Or run this command:
```bash
node -e "const jwt = require('jsonwebtoken'); console.log(jwt.sign({userId:'6962264a717a7ee2fced27a1',role:'user',email:'user@example.com'},'TEzA1EkCfQIB5ojS1RyHttcDQtqzQK94KFYygaW8740=',{algorithm:'HS256',expiresIn:'1h'}));"
```

---

## Step 3: Submit Code

**Method:** POST  
**URL:** `http://localhost:8080/api/submit`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Body (raw JSON) - CORRECT SOLUTION:**
```json
{
  "contestId": "6962264a717a7ee2fced27b0",
  "questionId": "6962264a717a7ee2fced27a8",
  "code": "def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        if target - num in seen:\n            return [seen[target - num], i]\n        seen[num] = i\n\nif __name__ == \"__main__\":\n    n, target = map(int, input().split())\n    nums = list(map(int, input().split()))\n    result = twoSum(nums, target)\n    print(result[0], result[1])",
  "language": "python"
}
```

**Body (raw JSON) - WRONG SOLUTION (for testing):**
```json
{
  "contestId": "6962264a717a7ee2fced27b0",
  "questionId": "6962264a717a7ee2fced27a8",
  "code": "def twoSum(nums, target):\n    return [0, 1]\n\nif __name__ == \"__main__\":\n    n, target = map(int, input().split())\n    nums = list(map(int, input().split()))\n    result = twoSum(nums, target)\n    print(result[0], result[1])",
  "language": "python"
}
```

**Expected Response (Correct Solution):**
```json
{
  "message": "Submission processed",
  "results": [
    {
      "testCase": 1,
      "passed": true,
      "input": "4 9\n2 7 11 15",
      "expectedOutput": "0 1",
      "actualOutput": "0 1",
      "error": "",
      "status": "Accepted"
    },
    {
      "testCase": 2,
      "passed": true,
      "input": "3 6\n3 2 4",
      "expectedOutput": "1 2",
      "actualOutput": "1 2",
      "error": "",
      "status": "Accepted"
    }
  ],
  "score": 30,
  "overallStatus": "Accepted"
}
```

---

## Alternative: cURL Command

```bash
# 1. Generate JWT
JWT_TOKEN=$(node -e "const jwt = require('jsonwebtoken'); console.log(jwt.sign({userId:'6962264a717a7ee2fced27a1',role:'user',email:'user@example.com'},'TEzA1EkCfQIB5ojS1RyHttcDQtqzQK94KFYygaW8740=',{algorithm:'HS256',expiresIn:'1h'}));")

# 2. Submit code
curl -X POST http://localhost:8080/api/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -d '{
    "contestId": "6962264a717a7ee2fced27b0",
    "questionId": "6962264a717a7ee2fced27a8",
    "code": "def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        if target - num in seen:\n            return [seen[target - num], i]\n        seen[num] = i\n\nif __name__ == \"__main__\":\n    n, target = map(int, input().split())\n    nums = list(map(int, input().split()))\n    result = twoSum(nums, target)\n    print(result[0], result[1])",
    "language": "python"
  }'
```

---

## Notes:
- **USER_ID:** `6962264a717a7ee2fced27a1`
- **QUESTION_ID:** `6962264a717a7ee2fced27b0` (Two Sum)
- **CONTEST_ID:** `6962264a717a7ee2fced27a8`
- **Judge0** must be running on port 2358
- The code will be executed against test cases in Judge0
