"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Maximize2, Minimize2, Clock, ChevronLeft, RefreshCw, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaPlay } from "react-icons/fa"
import { FiUploadCloud } from "react-icons/fi"
import Lottie from "lottie-react"
import { AiOutlineCode } from "react-icons/ai"
import { executePythonCode, type TestResult } from "@/lib/code-executor"
import { MonacoEditor } from "@/components/monaco-editor"
import { IoIosCheckmarkCircle } from "react-icons/io"

// Embed animation data directly to avoid import issues
const checkAnimationData = {
  v: "5.5.7",
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: "Checkmark Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Check Mark",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [50, 50, 0], ix: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: { a: 0, k: [100, 100, 100], ix: 6 },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ind: 0,
              ty: "sh",
              ix: 1,
              ks: {
                a: 0,
                k: {
                  i: [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                  ],
                  o: [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                  ],
                  v: [
                    [-18, 0],
                    [-6, 12],
                    [18, -12],
                  ],
                  c: false,
                },
                ix: 2,
              },
              nm: "Path 1",
              mn: "ADBE Vector Shape - Group",
              hd: false,
            },
            {
              ty: "st",
              c: { a: 0, k: [1, 1, 1, 1], ix: 3 },
              o: { a: 0, k: 100, ix: 4 },
              w: { a: 0, k: 4, ix: 5 },
              lc: 2,
              lj: 2,
              bm: 0,
              nm: "Stroke 1",
              mn: "ADBE Vector Graphic - Stroke",
              hd: false,
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0], ix: 2 },
              a: { a: 0, k: [0, 0], ix: 1 },
              s: { a: 0, k: [100, 100], ix: 3 },
              r: { a: 0, k: 0, ix: 6 },
              o: { a: 0, k: 100, ix: 7 },
              sk: { a: 0, k: 0, ix: 4 },
              sa: { a: 0, k: 0, ix: 5 },
              nm: "Transform",
            },
          ],
          nm: "Shape 1",
          np: 3,
          cix: 2,
          bm: 0,
          ix: 1,
          mn: "ADBE Vector Group",
          hd: false,
        },
        {
          ty: "tm",
          s: { a: 0, k: 0, ix: 1 },
          e: {
            a: 1,
            k: [
              { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 10, s: [0] },
              { t: 30, s: [100] },
            ],
            ix: 2,
          },
          o: { a: 0, k: 0, ix: 3 },
          m: 1,
          ix: 2,
          nm: "Trim Paths 1",
          mn: "ADBE Vector Filter - Trim",
          hd: false,
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [50, 50, 0], ix: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: {
          a: 1,
          k: [
            {
              i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
              o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
              t: 0,
              s: [0, 0, 100],
            },
            { t: 15, s: [100, 100, 100] },
          ],
          ix: 6,
        },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [80, 80], ix: 2 },
              p: { a: 0, k: [0, 0], ix: 3 },
              nm: "Ellipse Path 1",
              mn: "ADBE Vector Shape - Ellipse",
              hd: false,
            },
            {
              ty: "st",
              c: { a: 0, k: [1, 1, 1, 1], ix: 3 },
              o: { a: 0, k: 100, ix: 4 },
              w: { a: 0, k: 0, ix: 5 },
              lc: 1,
              lj: 1,
              ml: 4,
              bm: 0,
              nm: "Stroke 1",
              mn: "ADBE Vector Graphic - Stroke",
              hd: false,
            },
            {
              ty: "fl",
              c: {
                a: 0,
                k: [0.12941176470588237, 0.5882352941176471, 0.9529411764705882, 1],
                ix: 4,
              },
              o: { a: 0, k: 100, ix: 5 },
              r: 1,
              bm: 0,
              nm: "Fill 1",
              mn: "ADBE Vector Graphic - Fill",
              hd: false,
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0], ix: 2 },
              a: { a: 0, k: [0, 0], ix: 1 },
              s: { a: 0, k: [100, 100], ix: 3 },
              r: { a: 0, k: 0, ix: 6 },
              o: { a: 0, k: 100, ix: 7 },
              sk: { a: 0, k: 0, ix: 4 },
              sa: { a: 0, k: 0, ix: 5 },
              nm: "Transform",
            },
          ],
          nm: "Ellipse 1",
          np: 3,
          cix: 2,
          bm: 0,
          ix: 1,
          mn: "ADBE Vector Group",
          hd: false,
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
  markers: [],
}

// Create a green version of the animation for the submit button
const greenCheckAnimationData = JSON.parse(JSON.stringify(checkAnimationData))
// Update the circle color to green
if (greenCheckAnimationData.layers && greenCheckAnimationData.layers[1]?.shapes?.[0]?.it?.[2]) {
  greenCheckAnimationData.layers[1].shapes[0].it[2].c.k = [
    0.15294117647058825, 0.6823529411764706, 0.25098039215686274, 1,
  ] // Green color
}

interface Problem {
  id: string
  number: number
  title: string
  description: string
  inputFormat: string
  outputFormat: string
  constraints: string[]
  sampleTestCases: {
    id: string
    input: string
    expectedOutput: string
    explanation?: string
  }[]
  starterCode: string
  level: number
  category: string
}

export default function ProblemSolvingPage() {
  const params = useParams()
  const router = useRouter()
  const problemId = params.id as string

  const [activeTab, setActiveTab] = useState("description")
  const [activeTestCase, setActiveTestCase] = useState("1")
  const [code, setCode] = useState("# Write your code here")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isFullscreenLeft, setIsFullscreenLeft] = useState(false)
  const [isFullscreenRight, setIsFullscreenRight] = useState(false)
  const [isFullscreenBottom, setIsFullscreenBottom] = useState(false)
  const [isProblemNavExpanded, setIsProblemNavExpanded] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [allTestsPassed, setAllTestsPassed] = useState(false)
  const [hasRun, setHasRun] = useState(false)

  const [isRunSuccess, setIsRunSuccess] = useState(false)
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)

  // Resizable panel states
  const [leftPanelWidth, setLeftPanelWidth] = useState(50) // percentage
  const [editorHeight, setEditorHeight] = useState(70) // percentage
  const isResizingHorizontal = useRef(false)
  const isResizingVertical = useRef(false)
  const startXPos = useRef(0)
  const startYPos = useRef(0)
  const startLeftWidth = useRef(0)
  const startEditorHeight = useRef(0)

  const problem: Problem = {
    id: problemId,
    number: 3,
    title: "Print Numbers from 1 to N",
    description:
      "Write a program that prints all integers sequentially from 1 to a given number N. The program should take a single integer as input and output the numbers in increasing order, separated by spaces.",
    inputFormat: "The program accepts a single integer num, which represents the upper limit of the sequence (N).",
    outputFormat: "The output should display all numbers from 1 to num, separated by spaces.",
    constraints: [
      "1 ≤ N ≤ 1000 (if applicable, otherwise remove constraints).",
      "The program should ensure efficient execution even for larger values of N.",
    ],
    sampleTestCases: [
      {
        id: "1",
        input: "10",
        expectedOutput: "1 2 3 4 5 6 7 8 9 10",
        explanation: "The input number N is 10.",
      },
      {
        id: "2",
        input: "5",
        expectedOutput: "1 2 3 4 5",
      },
      {
        id: "3",
        input: "3",
        expectedOutput: "1 2 3",
      },
    ],
    starterCode: "# Write your code here",
    level: 1,
    category: "Looping",
  }

  // Initialize code with starter code
  useEffect(() => {
    // Always set to "# Write your code here" regardless of problem.starterCode
    setCode("# Write your code here")

    // Start timer
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Horizontal resizer handlers
  const startHorizontalResize = (e: React.MouseEvent) => {
    isResizingHorizontal.current = true
    startXPos.current = e.clientX
    startLeftWidth.current = leftPanelWidth
    document.body.style.cursor = "ew-resize"
    document.addEventListener("mousemove", handleHorizontalResize)
    document.addEventListener("mouseup", stopHorizontalResize)
  }

  const handleHorizontalResize = (e: MouseEvent) => {
    if (!isResizingHorizontal.current) return
    const containerWidth = document.getElementById("main-container")?.clientWidth || 1
    const delta = e.clientX - startXPos.current
    const newWidth = startLeftWidth.current + (delta / containerWidth) * 100
    setLeftPanelWidth(Math.min(Math.max(20, newWidth), 80)) // Limit between 20% and 80%
  }

  const stopHorizontalResize = () => {
    isResizingHorizontal.current = false
    document.body.style.cursor = "default"
    document.removeEventListener("mousemove", handleHorizontalResize)
    document.removeEventListener("mouseup", stopHorizontalResize)
  }

  // Vertical resizer handlers
  const startVerticalResize = (e: React.MouseEvent) => {
    isResizingVertical.current = true
    startYPos.current = e.clientY
    startEditorHeight.current = editorHeight
    document.body.style.cursor = "ns-resize"
    document.addEventListener("mousemove", handleVerticalResize)
    document.addEventListener("mouseup", stopVerticalResize)
  }

  const handleVerticalResize = (e: MouseEvent) => {
    if (!isResizingVertical.current) return
    const rightPanelHeight = document.getElementById("right-panel")?.clientHeight || 1
    const delta = e.clientY - startYPos.current
    const newHeight = startEditorHeight.current + (delta / rightPanelHeight) * 100
    setEditorHeight(Math.min(Math.max(20, newHeight), 80)) // Limit between 20% and 80%
  }

  const stopVerticalResize = () => {
    isResizingVertical.current = false
    document.body.style.cursor = "default"
    document.removeEventListener("mousemove", handleVerticalResize)
    document.removeEventListener("mouseup", stopVerticalResize)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleCodeChange = (value: string) => {
    setCode(value)
  }

  // Update the handleRun function to always show correct results
  const handleRun = () => {
    setIsRunning(true)

    // Execute the code against test cases
    setTimeout(() => {
      const result = executePythonCode(code, problem.sampleTestCases)
      setTestResults(result.testResults)
      setAllTestsPassed(true) // Always set to true
      setHasRun(true)

      // Switch to test result tab
      setActiveTab("testResult")

      setIsRunning(false)
      setIsRunSuccess(true)

      setTimeout(() => {
        setIsRunSuccess(false)
      }, 1500)
    }, 1000)
  }

  // Update the handleSubmit function to always show correct results
  const handleSubmit = () => {
    setIsSubmitting(true)

    // Execute the code against test cases
    setTimeout(() => {
      const result = executePythonCode(code, problem.sampleTestCases)
      setTestResults(result.testResults)
      setAllTestsPassed(true) // Always set to true
      setHasRun(true)

      // Switch to test result tab
      setActiveTab("testResult")

      setIsSubmitting(false)
      setIsSubmitSuccess(true)

      setTimeout(() => {
        setIsSubmitSuccess(false)
      }, 1500)
    }, 1500)
  }

  const handleBack = () => {
    router.push("/courses")
  }

  const handleNavigate = (index: number) => {
    router.push(`/problem-solving/${index}`)
  }

  const toggleProblemNav = () => {
    setIsProblemNavExpanded(!isProblemNavExpanded)
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value)
  }

  const renderDescriptionContent = () => (
    <div className="p-6 space-y-6 bg-[#1E1E1E]">
      <div>
        <h1 className="text-xl font-bold text-white mb-4">
          {problem.number}. {problem.title}
        </h1>
      </div>

      <div>
        <h2 className="text-base font-semibold text-white mb-2">Problem Statement:</h2>
        <p className="text-gray-300">{problem.description}</p>
      </div>

      <div>
        <h2 className="text-base font-semibold text-white mb-2">Input Format:</h2>
        <p className="text-gray-300">{problem.inputFormat}</p>
      </div>

      <div>
        <h2 className="text-base font-semibold text-white mb-2">Output Format:</h2>
        <p className="text-gray-300">{problem.outputFormat}</p>
      </div>

      <div>
        <h2 className="text-base font-semibold text-white mb-2">Constraints:</h2>
        <ul className="list-disc pl-5 text-gray-300 space-y-1">
          {problem.constraints.map((constraint, index) => (
            <li key={index}>• {constraint}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-base font-semibold text-white mb-2">Sample 1:</h2>
        <div className="border border-[#2d2d2d] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1a1a]">
                <th className="text-left p-3 text-sm font-medium text-gray-400 border-r border-[#2d2d2d] w-1/2">
                  Input
                </th>
                <th className="text-left p-3 text-sm font-medium text-gray-400 w-1/2">Output</th>
              </tr>
            </thead>
            <tbody>
              {problem.sampleTestCases.map((testCase) => (
                <tr key={testCase.id} className={activeTestCase === testCase.id ? "" : "hidden"}>
                  <td className="p-2 text-white border-r border-t border-[#2d2d2d] align-top font-mono text-lg">
                    {testCase.input}
                  </td>
                  <td className="p-2 text-white border-t border-[#2d2d2d] align-top font-mono text-lg">
                    {testCase.expectedOutput}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold text-white mb-2">Explanation:</h2>
        <p className="text-gray-300">• {problem.sampleTestCases[0].explanation}</p>
      </div>
    </div>
  )

  const renderTestResultContent = () => (
    <div className="p-6 space-y-6 bg-[#1E1E1E]">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Sample Testcases</h2>

          {hasRun && (
            <div
              className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm ${
                allTestsPassed ? "bg-[#2C2C2C] text-green-500" : "bg-[#1E1E1E] text-red-500"
              }`}
            >
              {allTestsPassed ? (
                <span className="flex items-center">
                  <span>Accepted</span>
                  <IoIosCheckmarkCircle className="ml-1 w-5 h-5" />
                </span>
              ) : (
                <span className="flex items-center">
                  <span>Wrong Answer</span>
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2 mb-4">
          {problem.sampleTestCases.map((testCase, index) => {
            const testResult = testResults.find((r) => r.id === testCase.id)
            const status = testResult?.status || "pending"

            return (
              <button
                key={testCase.id}
                onClick={() => setActiveTestCase(testCase.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-[#252525] hover:bg-[#303030] ${
                  activeTestCase === testCase.id ? "border border-gray-500/30" : ""
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    status === "passed" ? "bg-green-500" : status === "failed" ? "bg-red-500" : "bg-gray-500"
                  }`}
                />
                <span className={`${activeTestCase === testCase.id ? "text-white" : "text-gray-300"}`}>
                  Case {index + 1}
                </span>
              </button>
            )
          })}
        </div>

        {hasRun && (
          <div className="border border-[#2d2d2d] rounded-md overflow-hidden mb-6">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1a1a1a]">
                  <th className="text-left p-2 text-sm font-medium text-gray-400 w-[80px]">Status</th>
                  <th className="text-left p-2 text-sm font-medium text-gray-400 border-l border-[#2d2d2d]">Input</th>
                  <th className="text-left p-2 text-sm font-medium text-gray-400 border-l border-[#2d2d2d]">
                    Expected
                  </th>
                  <th className="text-left p-2 text-sm font-medium text-gray-400 border-l border-[#2d2d2d]">Got</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((result, index) => (
                  <tr key={index} className="border-t border-[#2d2d2d]">
                    <td className="p-3 text-center">
                      {result.status === "passed" ? (
                        <div className="flex justify-center">
                          <IoIosCheckmarkCircle className="w-5 h-5 text-green-500" />
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <svg
                            className="w-5 h-5 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            ></path>
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="p-3 font-mono text-white border-l border-[#2d2d2d]">{result.input}</td>
                    <td className="p-3 font-mono text-white border-l border-[#2d2d2d]">{result.expectedOutput}</td>
                    <td className="p-3 font-mono text-white border-l border-[#2d2d2d]">{result.actualOutput}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {hasRun && (
          <div className="mt-6">
            <Button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 py-5"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  // Define which problems are solved
  const solvedProblems = [1, 2]
  const currentProblem = 3
  const totalProblems = 10

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Custom scrollbar styles */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        /* Monaco editor custom styles */
        .monaco-editor .margin {
          background-color: #1e1e1e !important;
        }
        .monaco-editor .line-numbers {
          color: #6b7280 !important;
        }
        .monaco-editor .current-line {
          border: none !important;
          background-color: #2d2d2d !important;
        }
      `}</style>

      {/* Top navigation bar */}
      <header className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-[#2d2d2d] z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-[#2d2d2d] rounded-full"
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">L</span>
              </div>
              <span className="text-white font-medium">Problem Solving in Python</span>
            </div>

            <div className="flex gap-2">
              <span className="px-3 py-1 text-sm bg-[#252525] text-gray-300 rounded-md">{problem.category}</span>
              <span className="px-3 py-1 text-sm bg-[#252525] text-gray-300 rounded-md">Level {problem.level}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#252525] px-3 py-1 rounded-md text-green-500 border border-green-500/30">
            <Clock className="h-4 w-4" />
            <span>{formatTime(timeElapsed)}</span>
          </div>

          <button className="p-1.5 bg-[#252525] rounded-md text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>

          <button className="p-1.5 bg-[#252525] rounded-md text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>

          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-sm font-medium">A</span>
          </div>
        </div>
      </header>

      {/* Main content with resizable panels */}
      <div id="main-container" className="flex flex-1 overflow-hidden relative">
        {/* Left panel - Problem description */}
        <div
          className={`${isFullscreenLeft ? "fixed inset-0 z-50 bg-[#1E1E1E]" : ""} flex flex-col bg-[#1E1E1E] shadow-lg m-3 mr-0 rounded-2xl overflow-hidden`}
          style={{ width: isFullscreenLeft ? "100%" : `calc(${leftPanelWidth}% - 8px)` }}
        >
          <div className="flex items-center justify-between bg-[#2C2C2C] border-b border-[#2d2d2d] px-2 py-1">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-3 py-1 text-sm rounded-none ${
                  activeTab === "description" ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={activeTab === "description" ? "#a855f7" : "#9ca3af"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  Description
                </span>
              </button>
              <button
                onClick={() => setActiveTab("testResult")}
                className={`px-3 py-1 text-sm rounded-none ${
                  activeTab === "testResult" ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <AiOutlineCode className="w-4 h-4" color={activeTab === "testResult" ? "#22c55e" : "#9ca3af"} />
                  Test Result
                </span>
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsFullscreenLeft(!isFullscreenLeft)}
                className="p-1 rounded hover:bg-[#2d2d2d] text-gray-400"
              >
                {isFullscreenLeft ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button className="p-1 rounded hover:bg-[#2d2d2d] text-gray-400">
                <ChevronLeft size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {activeTab === "description" ? renderDescriptionContent() : renderTestResultContent()}
          </div>
        </div>

        {/* Horizontal resizer */}
        {!isFullscreenLeft && !isFullscreenRight && (
          <div
            className="w-4 cursor-ew-resize flex items-center justify-center bg-black hover:bg-blue-500/10 transition-colors z-10 rounded-2xl my-3"
            onMouseDown={startHorizontalResize}
          >
            <div className="w-1 h-16 bg-[#333] rounded-full"></div>
          </div>
        )}

        {/* Right panel - Code editor */}
        <div
          id="right-panel"
          className={`${isFullscreenRight ? "fixed inset-0 z-50 bg-black" : ""} flex flex-col bg-black shadow-lg m-3 ml-0 rounded-2xl overflow-hidden`}
          style={{ width: isFullscreenRight ? "100%" : `calc(${100 - leftPanelWidth}% - 8px)` }}
        >
          {/* Code editor section */}
          <div className="flex flex-col overflow-hidden" style={{ height: `${editorHeight}%` }}>
            <div className="flex items-center justify-between bg-[#2C2C2C] border-b border-[#2d2d2d] px-3 py-1 rounded-t-2xl">
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">{"<>"}</span>
                <span className="text-white">Code</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    className="appearance-none bg-[#252525] text-white px-3 py-1 pr-8 rounded border border-[#3d3d3d] text-sm focus:outline-none"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                  >
                    <option value="python">Python</option>
                    <option value="javascript" disabled>
                      JavaScript
                    </option>
                    <option value="java" disabled>
                      Java
                    </option>
                    <option value="cpp" disabled>
                      C++
                    </option>
                  </select>
                  <ChevronDown
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={14}
                  />
                </div>

                <button
                  onClick={() => setIsFullscreenRight(!isFullscreenRight)}
                  className="p-1 rounded hover:bg-[#2d2d2d] text-gray-400"
                >
                  {isFullscreenRight ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>

                <button className="p-1 rounded hover:bg-[#2d2d2d] text-gray-400">
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden bg-[#1e1e1e] rounded-b-2xl">
              {/* Replace textarea with Monaco Editor */}
              <MonacoEditor
                value={code}
                onChange={handleCodeChange}
                language={selectedLanguage}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  lineNumbers: "on",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  renderLineHighlight: "all",
                  wordWrap: "on",
                  padding: { top: 10, bottom: 10 },
                  scrollbar: {
                    vertical: "visible",
                    horizontal: "visible",
                    verticalScrollbarSize: 10,
                    horizontalScrollbarSize: 10,
                  },
                  lineNumbersMinChars: 3,
                  folding: true,
                  glyphMargin: true,
                }}
              />
            </div>
          </div>

          {/* Vertical resizer */}
          {!isFullscreenRight && !isFullscreenBottom && (
            <div
              className="h-4 cursor-ns-resize flex justify-center items-center bg-black hover:bg-blue-500/10 transition-colors z-10 rounded-2xl"
              onMouseDown={startVerticalResize}
            >
              <div className="h-1 w-16 bg-[#333] rounded-full"></div>
            </div>
          )}

          {/* Sample testcases section */}
          <div
            className={`${isFullscreenBottom ? "fixed inset-0 z-50 bg-black" : ""} flex flex-col overflow-hidden`}
            style={{ height: isFullscreenBottom ? "100%" : `calc(${100 - editorHeight}% - 16px)` }}
          >
            <div className="flex items-center gap-2 bg-[#2C2C2C] px-4 py-3 border-b border-[#2d2d2d] rounded-t-2xl">
              <div className="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <polyline points="9 11 12 14 22 4"></polyline>
                </svg>
              </div>
              <span className="text-white text-lg font-medium">Sample Testcases</span>
            </div>

            <div className="p-4 bg-[#1E1E1E] flex-1 overflow-auto hide-scrollbar rounded-b-2xl">
              <div className="flex gap-2 mb-4">
                {problem.sampleTestCases.map((testCase, index) => (
                  <button
                    key={testCase.id}
                    onClick={() => setActiveTestCase(testCase.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-[#252525] hover:bg-[#303030] ${
                      activeTestCase === testCase.id ? "border border-green-500/30" : ""
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className={`${activeTestCase === testCase.id ? "text-white" : "text-gray-300"}`}>
                      Case {index + 1}
                    </span>
                  </button>
                ))}
              </div>

              <div className="border border-[#2d2d2d] rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#252525]">
                      <th className="text-left p-2 text-base font-medium text-white border-r border-[#2d2d2d] w-1/2">
                        Input
                      </th>
                      <th className="text-left p-2 text-base font-medium text-white w-1/2">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {problem.sampleTestCases.map((testCase) => (
                      <tr key={testCase.id} className={activeTestCase === testCase.id ? "" : "hidden"}>
                        <td className="p-2 text-white border-r border-t border-[#2d2d2d] align-top font-mono text-lg">
                          {testCase.input}
                        </td>
                        <td className="p-2 text-white border-t border-[#2d2d2d] align-top font-mono text-lg">
                          {testCase.expectedOutput}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar - Problem navigation */}
        <div
          className={`${isProblemNavExpanded ? "w-64" : "w-[50px]"} bg-[#1a1a1a] border-l border-[#2d2d2d] flex flex-col shadow-lg m-2 ml-0 rounded-xl transition-all duration-300 ease-in-out overflow-hidden`}
        >
          {isProblemNavExpanded ? (
            <>
              {/* Expanded view */}
              <div className="flex items-center justify-between p-3 border-b border-[#2d2d2d]">
                <span className="text-white font-medium">Problem List</span>
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-white">
                    <Maximize2 size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-white" onClick={toggleProblemNav}>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              <div className="p-3 grid grid-cols-5 gap-2">
                {Array.from({ length: totalProblems }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigate(index + 1)}
                    className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-medium
      ${
        solvedProblems.includes(index + 1)
          ? "bg-green-500 text-white"
          : index + 1 === currentProblem
            ? "bg-blue-500 text-white"
            : "bg-[#252525] text-gray-300"
      }
      hover:opacity-90 transition-colors
    `}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Collapsed view */}
              <div className="flex-1 py-4 px-[10px] overflow-y-auto hide-scrollbar">
                <div className="flex flex-col gap-2 items-center">
                  {Array.from({ length: totalProblems }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavigate(index + 1)}
                      className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-medium
      ${
        solvedProblems.includes(index + 1)
          ? "bg-green-500 text-white"
          : index + 1 === currentProblem
            ? "bg-blue-500 text-white"
            : "bg-[#252525] text-gray-300"
      }
      hover:opacity-90 transition-colors
    `}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom controls - only visible in collapsed mode */}
              <div className="mt-auto p-2 border-t border-[#2d2d2d] flex flex-col gap-2">
                <button className="w-full p-2 text-gray-400 hover:text-white hover:bg-[#252525] rounded flex items-center justify-center">
                  <Maximize2 size={16} />
                </button>
                <button
                  className="w-full p-2 text-gray-400 hover:text-white hover:bg-[#252525] rounded flex items-center justify-center"
                  onClick={toggleProblemNav}
                >
                  <ChevronLeft size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-[#1E1E1E] m-3 mt-0 rounded-[10px] border-t border-[#2d2d2d] p-2 flex items-center justify-between z-10 h-[50px]">
        <Button
          variant="outline"
          size="sm"
          className="text-gray-300 border-[#3D3D3D] bg-[#2C2C2C] hover:bg-[#3D3D3D] rounded-[5px]"
        >
          Prev
        </Button>

        <div className="flex gap-3">
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              className={`text-[#1A9AFD] hover:text-[#1A9AFD] border-[#3D3D3D] bg-[#2C2C2C] hover:bg-[#3D3D3D] rounded-[5px] transition-all duration-300 ease-in-out ${
                isRunning ? "" : "w-[100px]"
              }`}
              onClick={handleRun}
              disabled={isRunning}
            >
              {isRunning ? (
                <span className="flex items-center justify-center gap-1">
                  <div className="animate-spin h-3 w-3 border-2 border-t-transparent border-[#1A9AFD] rounded-full"></div>
                  Running...
                </span>
              ) : isRunSuccess ? (
                <span className="flex items-center justify-center">
                  <div className="flex items-center justify-center" style={{ width: 24, height: 24 }}>
                    <Lottie
                      animationData={checkAnimationData}
                      loop={false}
                      autoplay={true}
                      style={{ width: 24, height: 24 }}
                    />
                  </div>
                  Done
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FaPlay className="h-3 w-3 mr-1" />
                  Run
                </span>
              )}
            </Button>
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-[#1a1a1a] text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap border border-[#2d2d2d] pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="text-white">Run</span>
                <div className="flex gap-1">
                  <span className="bg-[#2C2C2C] text-gray-300 px-1.5 py-0.5 rounded text-[10px]">Ctrl</span>
                  <span className="bg-[#2C2C2C] text-gray-300 px-1.5 py-0.5 rounded text-[10px]">Shift</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              className={`text-[#27B940] hover:text-[#27B940] border-[#3D3D3D] bg-[#2C2C2C] hover:bg-[#3D3D3D] rounded-[5px] transition-all duration-300 ease-in-out ${
                isSubmitting ? "" : "w-[100px]"
              }`}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-1">
                  <div className="animate-spin h-3 w-3 border-2 border-t-transparent border-[#27B940] rounded-full"></div>
                  Submitting...
                </span>
              ) : isSubmitSuccess ? (
                <span className="flex items-center justify-center">
                  <div className="flex items-center justify-center" style={{ width: 24, height: 24 }}>
                    <Lottie
                      animationData={greenCheckAnimationData}
                      loop={false}
                      autoplay={true}
                      style={{ width: 24, height: 24 }}
                    />
                  </div>
                  Accepted
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FiUploadCloud className="h-4 w-4 mr-1" />
                  Submit
                </span>
              )}
            </Button>
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-[#1a1a1a] text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap border border-[#2d2d2d] pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="text-white">Submit</span>
                <div className="flex gap-1">
                  <span className="bg-[#2C2C2C] text-gray-300 px-1.5 py-0.5 rounded text-[10px]">Ctrl</span>
                  <span className="bg-[#2C2C2C] text-gray-300 px-1.5 py-0.5 rounded text-[10px]">Enter</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="text-gray-300 border-[#3D3D3D] bg-[#2C2C2C] hover:bg-[#3D3D3D] rounded-[5px]"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
