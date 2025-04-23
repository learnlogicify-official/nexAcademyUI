"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileLevelCard } from "@/components/profile-level-card"
import { LearningAnalyticsGraph } from "./learning-analytics-graph"
import { DailyTasks } from "./daily-tasks"

// Import components
import { WelcomeSection } from "./welcome-section"
import { CoursesSection } from "./courses-section"
import { ActivityFeed } from "./activity-feed"
import { AchievementsList } from "./achievements-list"
import { DailyStreakCard } from "./daily-streak-card"
import { DailyQuestsCard } from "./daily-quests-card"
import { PlayerStatsCard } from "./player-stats-card"
import { UpcomingEventsCard } from "./upcoming-events-card"

// Import data
import {
  userData,
  coursesData,
  questsData,
  activityFeedData,
  achievementsData,
  weeklyStreakData,
  upcomingEventsData,
  playerStatsData,
} from "./dashboard-data"

// Add these imports at the top of the file if they don't exist
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Create a context to track sidebar state
export const SidebarContext = {
  Consumer: ({ children }) => {
    // Get the sidebar collapsed state from localStorage on client side
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    useEffect(() => {
      // Check localStorage for sidebar state
      const storedState = localStorage.getItem("sidebarCollapsed")
      if (storedState !== null) {
        setSidebarCollapsed(storedState === "true")
      }

      // Set up event listener for sidebar state changes
      const handleStorageChange = () => {
        const currentState = localStorage.getItem("sidebarCollapsed")
        setSidebarCollapsed(currentState === "true")
      }

      // Listen for custom event for sidebar toggle
      window.addEventListener("sidebarStateChange", handleStorageChange)

      return () => {
        window.removeEventListener("sidebarStateChange", handleStorageChange)
      }
    }, [])

    return children(sidebarCollapsed)
  },
}

// Main Dashboard component
export function Dashboard() {
  const [mounted, setMounted] = useState(false)
  // Add this state near the beginning of the component function
  const [rightSidebarVisible, setRightSidebarVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  // Add this effect to detect mobile screens
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    // Check on mount
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Add this effect to handle body scroll locking when the sidebar is open on mobile
  useEffect(() => {
    if (isMobile) {
      if (rightSidebarVisible) {
        // Lock the body scroll when sidebar is open
        document.body.style.overflow = "hidden"
      } else {
        // Restore scrolling when sidebar is closed
        document.body.style.overflow = ""
      }
    }

    return () => {
      // Cleanup: ensure body scroll is restored when component unmounts
      document.body.style.overflow = ""
    }
  }, [rightSidebarVisible, isMobile])

  // Then add this effect after the other useEffect hooks to apply a global style for hiding scrollbars on mobile
  useEffect(() => {
    // Add a style tag to hide scrollbars on mobile
    if (typeof document !== "undefined") {
      const style = document.createElement("style")
      style.innerHTML = `
      @media (max-width: 1023px) {
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      }
    `
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [])

  if (!mounted) return null

  // Replace the existing grid layout with this new layout
  return (
    <div className="space-y-6 scrollbar-hide">
      {/* Welcome section */}
      <div className="relative">
        {/* Floating toggle button for mobile */}
        {isMobile && (
          <Button
            variant="secondary"
            size="icon"
            className="fixed right-0 top-1/2 z-40 rounded-l-md rounded-r-none shadow-lg"
            onClick={() => setRightSidebarVisible(!rightSidebarVisible)}
            aria-label={rightSidebarVisible ? "Hide sidebar" : "Show sidebar"}
          >
            {rightSidebarVisible ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}

        {/* Main content and sidebar container */}
        <div className="flex">
          {/* Main content area */}
          <div className="flex-1 space-y-6">
            {/* Welcome section */}
            <WelcomeSection userData={userData} />

            {/* Main grid layout */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Course progress section */}
              <SidebarContext.Consumer>
                {(sidebarCollapsed) => <CoursesSection courses={coursesData} sidebarCollapsed={sidebarCollapsed} />}
              </SidebarContext.Consumer>

              {/* Activity/Achievements and Daily Tasks side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Tabs for activity and achievements - with equal height */}
                <Card className="flex flex-col h-full">
                  <Tabs defaultValue="activity" className="w-full flex flex-col flex-1">
                    <CardHeader className="pb-0 pt-4 px-4">
                      <TabsList className="w-full justify-start bg-transparent p-0">
                        <TabsTrigger
                          value="activity"
                          className="rounded-t-lg rounded-b-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2"
                        >
                          Activity
                        </TabsTrigger>
                        <TabsTrigger
                          value="achievements"
                          className="rounded-t-lg rounded-b-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2"
                        >
                          Achievements
                        </TabsTrigger>
                      </TabsList>
                    </CardHeader>

                    <CardContent className="pt-4 flex-1 flex flex-col">
                      <TabsContent value="activity" className="space-y-4 m-0 flex-1 flex flex-col">
                        <ActivityFeed activities={activityFeedData} />
                      </TabsContent>

                      <TabsContent value="achievements" className="m-0 flex-1 flex flex-col">
                        <AchievementsList achievements={achievementsData} />
                      </TabsContent>
                    </CardContent>
                  </Tabs>
                </Card>

                {/* Daily To-Do List - with equal height */}
                <div className="h-full">
                  <DailyTasks />
                </div>
              </div>

              {/* Learning Analytics Graph */}
              <LearningAnalyticsGraph />
            </div>
          </div>

          {/* Right sidebar */}
          <div
            className={cn(
              "w-full lg:w-80 space-y-6 lg:pl-6 transition-all duration-300 ease-in-out",
              isMobile
                ? "fixed right-0 top-0 bottom-0 z-30 bg-background pt-16 px-4 shadow-xl overflow-y-auto"
                : "relative",
              isMobile && !rightSidebarVisible ? "translate-x-full" : "translate-x-0",
            )}
          >
            {/* Profile Level Card */}
            <ProfileLevelCard userData={userData} className="w-full" />

            {/* Daily Streak Card */}
            <DailyStreakCard currentStreak={userData.streak} highestStreak={7} weeklyStreak={weeklyStreakData} />

            {/* Daily Quests Card */}
            <DailyQuestsCard quests={questsData} />

            {/* About the player section */}
            <PlayerStatsCard stats={playerStatsData} />

            {/* Upcoming Events */}
            <UpcomingEventsCard events={upcomingEventsData} />
          </div>
        </div>
      </div>
    </div>
  )
}
