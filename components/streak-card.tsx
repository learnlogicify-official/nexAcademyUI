import { Flame, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StreakCardProps {
  currentStreak: number
  highestStreak: number
  completedDays: string[]
  className?: string
}

export function StreakCard({ currentStreak, highestStreak, completedDays, className }: StreakCardProps) {
  // Days of the week
  const daysOfWeek = ["Su", "M", "Tu", "W", "Th", "F", "Sa"]

  // Get current day index (0 = Sunday, 1 = Monday, etc.)
  const today = new Date().getDay()

  return (
    <Card className={`bg-[#121212] border-0 shadow-md w-full h-[360px] ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-gray-100">Daily Streak</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        {/* Flame Icon */}
        <div className="bg-[#3d2e17] rounded-full p-3">
          <Flame className="h-6 w-6 text-orange-500" />
        </div>

        {/* Streak Count */}
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{currentStreak} Days</div>
          <div className="text-sm text-gray-400">Highest streak: {highestStreak} days</div>
        </div>

        {/* Weekly Calendar */}
        <div className="bg-[#1a1a1a] rounded-lg p-3 w-full">
          <div className="grid grid-cols-7 gap-1">
            {/* Day Labels */}
            {daysOfWeek.map((day, index) => (
              <div key={`label-${day}`} className="text-xs text-center text-gray-400">
                {day}
              </div>
            ))}

            {/* Day Circles */}
            {daysOfWeek.map((day, index) => {
              const isCompleted = completedDays.includes(day)
              const isPast = index <= today

              return (
                <div key={`circle-${day}`} className="flex justify-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isCompleted ? "bg-orange-500" : "bg-gray-700"
                    }`}
                  >
                    {isCompleted && <Check className="h-3.5 w-3.5 text-white" />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="text-sm text-gray-400">Keep your streak going!</div>
      </CardContent>
    </Card>
  )
}
