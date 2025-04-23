"use client"

import { useEffect, useRef, useState } from "react"
import * as monaco from "monaco-editor"
import { Loader2 } from "lucide-react"

interface MonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  theme?: string
  options?: monaco.editor.IStandaloneEditorConstructionOptions
}

export function MonacoEditor({
  value,
  onChange,
  language = "python",
  theme = "vs-dark",
  options = {},
}: MonacoEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditorReady, setIsEditorReady] = useState(false)

  // Initialize Monaco editor
  useEffect(() => {
    if (!editorRef.current) return

    // Set loading state
    setIsLoading(true)

    // Ensure Monaco is loaded
    if (monaco) {
      try {
        // Configure Monaco editor with default options
        const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
          value,
          language,
          theme,
          automaticLayout: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: "on",
          renderLineHighlight: "all",
          wordWrap: "on",
          scrollbar: {
            vertical: "visible",
            horizontal: "visible",
            useShadows: false,
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
          padding: {
            top: 10,
            bottom: 10,
          },
          folding: true,
          glyphMargin: true,
          // Merge with user-provided options
          ...options,
        }

        // Create editor instance
        monacoEditorRef.current = monaco.editor.create(editorRef.current, defaultOptions)

        // Add change event listener
        monacoEditorRef.current.onDidChangeModelContent(() => {
          if (monacoEditorRef.current) {
            const newValue = monacoEditorRef.current.getValue()
            onChange(newValue)
          }
        })

        // Force layout update to ensure proper rendering
        setTimeout(() => {
          if (monacoEditorRef.current) {
            monacoEditorRef.current.layout()
          }
        }, 100)

        // Set editor ready state
        setIsEditorReady(true)
        setIsLoading(false)

        // Log success for debugging
        console.log("Monaco editor initialized successfully")
      } catch (error) {
        console.error("Error initializing Monaco editor:", error)
        setIsLoading(false)
      }
    }

    // Cleanup function
    return () => {
      if (monacoEditorRef.current) {
        monacoEditorRef.current.dispose()
        monacoEditorRef.current = null
      }
    }
  }, []) // Empty dependency array to run only once on mount

  // Update editor value when prop changes
  useEffect(() => {
    if (monacoEditorRef.current && isEditorReady) {
      const currentValue = monacoEditorRef.current.getValue()
      if (value !== currentValue) {
        monacoEditorRef.current.setValue(value)
      }
    }
  }, [value, isEditorReady])

  // Update language when prop changes
  useEffect(() => {
    if (monacoEditorRef.current && isEditorReady) {
      const model = monacoEditorRef.current.getModel()
      if (model) {
        monaco.editor.setModelLanguage(model, language)
      }
    }
  }, [language, isEditorReady])

  // Update theme when prop changes
  useEffect(() => {
    if (isEditorReady) {
      monaco.editor.setTheme(theme)
    }
  }, [theme, isEditorReady])

  // Handle window resize to ensure editor layout is updated
  useEffect(() => {
    const handleResize = () => {
      if (monacoEditorRef.current) {
        monacoEditorRef.current.layout()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="h-full w-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e] z-10">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}
      <div
        ref={editorRef}
        className="h-full w-full"
        style={{
          visibility: isLoading ? "hidden" : "visible",
          // Add explicit styles to ensure proper rendering
          display: "block",
          position: "relative",
          overflow: "hidden",
        }}
      />
    </div>
  )
}
