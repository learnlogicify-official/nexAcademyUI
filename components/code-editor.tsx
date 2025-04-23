"use client"

import type React from "react"

import { useState } from "react"
import type { Problem } from "@/data/problems"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Maximize2, Minimize2, ChevronDown, ChevronUp } from "lucide-react"

interface CodeEditorProps {
  problem: Problem
  onRun: (code: string) => void
  onSubmit: (code: string) => void
  isRunning: boolean
  isSubmitting: boolean
}

export function CodeEditor({ problem, onRun, onSubmit, isRunning, isSubmitting }: CodeEditorProps) {
  const [code, setCode] = useState("#write your code")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTestCase, setActiveTestCase] = useState("1")
  const [showTestCases, setShowTestCases] = useState(true)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
  }

  const handleRun = () => {
    onRun(code)
  }

  const handleSubmit = () => {
    onSubmit(code)
  }

  return (
    <div
      className={`flex flex-col h-full bg-[#121212] rounded-2xl overflow-hidden ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
    >
      <div className="flex items-center justify-between border-b border-[#2d2d2d] bg-[#1a1a1a] p-2">
        <div className="flex items-center">
          <span className="text-[#0091FF] mr-2">{"<>"}</span>
          <span className="text-white font-medium">Code</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              className="appearance-none bg-[#252525] text-white px-3 py-1 pr-8 rounded border border-[#3d3d3d] text-sm focus:outline-none focus:ring-1 focus:ring-[#0091FF]"
              defaultValue="python"
            >
              <option value="python">Python</option>
              <option value="javascript" disabled>
                JavaScript
              </option>
              <option value="java" disabled>
                Java
              </option>
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={14}
            />
          </div>

          <button onClick={toggleFullscreen} className="p-1 rounded hover:bg-[#2d2d2d] text-gray-400">
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <textarea
          value={code}
          onChange={handleCodeChange}
          className="w-full h-full bg-[#1e1e1e] text-gray-300 p-4 font-mono text-sm resize-none focus:outline-none"
          spellCheck="false"
        />
      </div>

      <div className="border-t border-[#2d2d2d]">
        <div className="flex items-center justify-between p-2 bg-[#1a1a1a]">
          <div className="flex items-center gap-2">
            <span className="text-[#0091FF] text-sm">{"<>"}</span>
            <span className="text-white text-sm font-medium">Sample Testcases</span>
          </div>

          <button
            onClick={() => setShowTestCases(!showTestCases)}
            className="p-1 rounded hover:bg-[#2d2d2d] text-gray-400"
          >
            {showTestCases ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {showTestCases && (
          <div className="bg-[#1a1a1a] p-4 rounded-b-2xl">
            <Tabs defaultValue="1" value={activeTestCase} onValueChange={setActiveTestCase}>
              <TabsList className="bg-[#252525] mb-4 flex gap-2 p-1">
                {problem.sampleTestCases.map((testCase) => (
                  <TabsTrigger
                    key={testCase.id}
                    value={testCase.id.toString()}
                    className="flex items-center gap-2 data-[state=active]:bg-transparent data-[state=active]:text-white"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Case {testCase.id}
                  </TabsTrigger>
                ))}
              </TabsList>

              {problem.sampleTestCases.map((testCase) => (
                <TabsContent key={testCase.id} value={testCase.id.toString()} className="m-0">
                  <div className="border border-[#2d2d2d] rounded-2xl overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#252525]">
                          <th className="text-left p-4 text-base font-medium text-white border-r border-[#2d2d2d] w-1/2">
                            Input
                          </th>
                          <th className="text-left p-4 text-base font-medium text-white w-1/2">Output</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-4 text-white border-r border-t border-[#2d2d2d] align-top font-mono text-lg">
                            {testCase.input}
                          </td>
                          <td className="p-4 text-white border-t border-[#2d2d2d] align-top font-mono text-lg">
                            {testCase.expectedOutput}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
