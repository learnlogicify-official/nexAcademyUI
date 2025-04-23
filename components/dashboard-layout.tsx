"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { useMobile } from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"
import { CourseChaptersSidebar } from "@/components/course-chapters-sidebar"
import { Menu } from "lucide-react"
import { TbLayoutSidebarRightCollapse } from "react-icons/tb"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const isMobile = useMobile()
  const pathname = usePathname()

  // Initialize sidebar state based on screen size
  useEffect(() => {
    // On mobile, sidebar should be closed by default
    setSidebarOpen(!isMobile)
  }, [isMobile])

  // Check if we're in a course page - more specific pattern matching
  const isCoursePage =
    /^\/my-learning\/[^/]+$/.test(pathname) || (pathname.includes("/my-learning/") && pathname.includes("/lessons/"))

  // Extract courseId from the pathname
  const getCourseId = () => {
    const match = pathname.match(/\/my-learning\/([^/]+)/)
    return match ? match[1] : ""
  }

  // Get course title based on courseId
  const getCourseTitle = () => {
    const courseId = getCourseId()
    const courseTitles: Record<string, string> = {
      "python-basics": "Python Basics",
      "javascript-fundamentals": "JavaScript Fundamentals",
      "web-development": "Web Development",
      "data-structures": "Data Structures & Algorithms",
    }
    return courseTitles[courseId] || "Course"
  }

  // On mobile, sidebar is hidden by default
  const effectiveSidebarOpen = isMobile ? sidebarOpen : true

  // Toggle sidebar function
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Toggle sidebar collapse function
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed)

  return (
    <div className="flex h-screen overflow-hidden bg-background max-w-full">
      {/* Hamburger Menu Button - Fixed Position when sidebar is closed on mobile */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className={`fixed left-4 top-4 z-50 lg:hidden ${effectiveSidebarOpen ? "hidden" : "flex"}`}
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      {isCoursePage ? (
        <div
          className={`transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? "w-0 opacity-0 overflow-hidden" : "w-72 opacity-100"
          } bg-card border-r border-border ${
            isMobile && !effectiveSidebarOpen ? "-translate-x-full" : ""
          } ${isMobile ? "fixed inset-y-0 left-0 z-50" : "relative"}`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <h2 className="font-semibold truncate">Course Content</h2>
            <div className="flex items-center space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={toggleSidebarCollapse}>
                      <TbLayoutSidebarRightCollapse className="h-4 w-4" />
                      <span className="sr-only">Hide sidebar</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Hide sidebar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </div>
          </div>
          <CourseChaptersSidebar courseId={getCourseId()} />
        </div>
      ) : (
        <Sidebar
          className={`transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? "w-16" : "w-72"
          } bg-card border-border`}
          open={effectiveSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapse}
          hamburgerMenu={
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          }
        />
      )}

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden transition-all duration-300 bg-background max-w-full">
        <TopBar
          onMenuClick={toggleSidebar}
          isCoursePage={isCoursePage}
          isSidebarCollapsed={sidebarCollapsed}
          onExpandSidebar={toggleSidebarCollapse}
          courseTitle={isCoursePage ? getCourseTitle() : undefined}
        />
        <main
          className={`flex-1 ${pathname.includes("/lessons/") ? "overflow-hidden" : "overflow-y-auto overflow-x-hidden"} p-4 md:p-6 w-full`}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
