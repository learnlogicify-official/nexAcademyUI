// This is a mock implementation of a Python code executor
// In a real application, this would be a server-side API call

export interface TestResult {
  id: string
  input: string
  expectedOutput: string
  actualOutput: string
  status: "passed" | "failed" | "error"
  error?: string
}

export interface ExecutionResult {
  success: boolean
  testResults: TestResult[]
}

export function executePythonCode(
  code: string,
  testCases: { id: string; input: string; expectedOutput: string }[],
): ExecutionResult {
  console.log("Executing code:", code)
  console.log("Test cases:", testCases)

  // Always return successful results with expected output
  const testResults: TestResult[] = testCases.map((testCase) => ({
    id: testCase.id,
    input: testCase.input,
    expectedOutput: testCase.expectedOutput,
    actualOutput: testCase.expectedOutput, // Always return the expected output
    status: "passed", // Always mark as passed
  }))

  return {
    success: true,
    testResults,
  }
}
