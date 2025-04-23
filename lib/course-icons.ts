import {
  Code,
  Database,
  FileCode,
  Braces,
  Cpu,
  PenTool,
  Layers,
  Terminal,
  Workflow,
  Atom,
  Boxes,
  Brain,
  type LucideIcon,
} from "lucide-react"

interface CourseTheme {
  icon: LucideIcon
  color: string
  bgColor: string
}

const defaultThemes: Record<string, CourseTheme> = {
  python: {
    icon: FileCode,
    color: "#3776AB",
    bgColor: "#EBF5FF",
  },
  javascript: {
    icon: Braces,
    color: "#F7DF1E",
    bgColor: "#FFFBEB",
  },
  react: {
    icon: Atom,
    color: "#61DAFB",
    bgColor: "#F0FDFF",
  },
  web: {
    icon: Code,
    color: "#E44D26",
    bgColor: "#FFF1EE",
  },
  data: {
    icon: Database,
    color: "#4DB6AC",
    bgColor: "#E0F7FA",
  },
  machine: {
    icon: Brain,
    color: "#9C27B0",
    bgColor: "#F3E5F5",
  },
  design: {
    icon: PenTool,
    color: "#FF7043",
    bgColor: "#FBE9E7",
  },
  algorithms: {
    icon: Workflow,
    color: "#26A69A",
    bgColor: "#E0F2F1",
  },
  structures: {
    icon: Boxes,
    color: "#5C6BC0",
    bgColor: "#E8EAF6",
  },
  systems: {
    icon: Cpu,
    color: "#78909C",
    bgColor: "#ECEFF1",
  },
  devops: {
    icon: Terminal,
    color: "#546E7A",
    bgColor: "#ECEFF1",
  },
  default: {
    icon: Layers,
    color: "#607D8B",
    bgColor: "#ECEFF1",
  },
}

// File extensions that should use the Python icon
const pythonFileExtensions = [
  "py",
  "ipynb",
  "pyc",
  "pyd",
  "pyo",
  "pyw",
  "pyz",
  "pyi",
  "csv",
  "json",
  "xml",
  "yaml",
  "yml",
  "toml",
  "ini",
  "cfg",
  "txt",
  "md",
  "rst",
  "log",
  "dat",
  "db",
  "sqlite",
  "sql",
]

export function getCourseTheme(title: string, keywords: string[] = []): CourseTheme {
  const titleLower = title.toLowerCase()

  // Check if the title contains a file extension
  const fileExtensionMatch = title.match(/\.([a-zA-Z0-9]+)$/)
  if (fileExtensionMatch) {
    const extension = fileExtensionMatch[1].toLowerCase()
    if (pythonFileExtensions.includes(extension)) {
      return defaultThemes.python
    }
  }

  // Check title for keywords
  if (titleLower.includes("python")) return defaultThemes.python
  if (titleLower.includes("javascript") || titleLower.includes("js")) return defaultThemes.javascript
  if (titleLower.includes("react")) return defaultThemes.react
  if (titleLower.includes("web") || titleLower.includes("html") || titleLower.includes("css")) return defaultThemes.web
  if (titleLower.includes("data")) return defaultThemes.data
  if (titleLower.includes("machine") || titleLower.includes("ai") || titleLower.includes("ml"))
    return defaultThemes.machine
  if (titleLower.includes("design") || titleLower.includes("ui") || titleLower.includes("ux"))
    return defaultThemes.design
  if (titleLower.includes("algorithm")) return defaultThemes.algorithms
  if (titleLower.includes("structure")) return defaultThemes.structures
  if (titleLower.includes("system")) return defaultThemes.systems
  if (titleLower.includes("devops") || titleLower.includes("ops") || titleLower.includes("ci/cd"))
    return defaultThemes.devops

  // Check if title contains "file" or "document"
  if (
    titleLower.includes("file") ||
    titleLower.includes("document") ||
    titleLower.includes("data") ||
    titleLower.includes("report") ||
    titleLower.includes("notebook") ||
    titleLower.includes("script")
  ) {
    return defaultThemes.python
  }

  // Check additional keywords
  for (const keyword of keywords) {
    const keywordLower = keyword.toLowerCase()

    // Check if keyword contains a file extension
    const keywordExtMatch = keyword.match(/\.([a-zA-Z0-9]+)$/)
    if (keywordExtMatch) {
      const extension = keywordExtMatch[1].toLowerCase()
      if (pythonFileExtensions.includes(extension)) {
        return defaultThemes.python
      }
    }

    if (
      keywordLower.includes("file") ||
      keywordLower.includes("document") ||
      keywordLower.includes("data") ||
      keywordLower.includes("report") ||
      keywordLower.includes("notebook") ||
      keywordLower.includes("script")
    ) {
      return defaultThemes.python
    }

    if (keywordLower.includes("python")) return defaultThemes.python
    if (keywordLower.includes("javascript") || keywordLower.includes("js")) return defaultThemes.javascript
    if (keywordLower.includes("react")) return defaultThemes.react
    if (keywordLower.includes("web") || keywordLower.includes("html") || keywordLower.includes("css"))
      return defaultThemes.web
    if (keywordLower.includes("data")) return defaultThemes.data
    if (keywordLower.includes("machine") || keywordLower.includes("ai") || keywordLower.includes("ml"))
      return defaultThemes.machine
    if (keywordLower.includes("design") || keywordLower.includes("ui") || keywordLower.includes("ux"))
      return defaultThemes.design
    if (keywordLower.includes("algorithm")) return defaultThemes.algorithms
    if (keywordLower.includes("structure")) return defaultThemes.structures
    if (keywordLower.includes("system")) return defaultThemes.systems
    if (keywordLower.includes("devops") || keywordLower.includes("ops") || keywordLower.includes("ci/cd"))
      return defaultThemes.devops
  }

  return defaultThemes.default
}
