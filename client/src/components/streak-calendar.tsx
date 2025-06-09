import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, Flame } from "lucide-react"

export function StreakCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Sample streak data - in a real app, this would come from your backend
  const streakDays = new Set([
    "2024-01-02",
    "2024-01-05",
    "2024-01-10",
    "2024-01-11",
    "2024-01-12",
    "2024-01-13",
    "2024-01-14",
    "2024-01-15",
    "2024-01-18",
    "2024-01-19",
    "2024-01-22",
    "2024-01-25",
  ])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const isStreakDay = (day: number) => {
    if (!day) return false
    const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day)
    return streakDays.has(dateKey)
  }

  const hasConsecutiveStreak = (day: number) => {
    if (!day) return false
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // Check if this day and the next few days are all streak days
    let consecutiveCount = 0
    for (let i = 0; i < 6; i++) {
      const checkDay = day + i
      const dateKey = formatDateKey(year, month, checkDay)
      if (streakDays.has(dateKey)) {
        consecutiveCount++
      } else {
        break
      }
    }

    return consecutiveCount >= 3 // Show flame if 3+ consecutive days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-orange-400">
            <Calendar className="w-5 h-5" />
            <span>Streak Calendar</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth("prev")}
              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-semibold min-w-[80px] text-center text-gray-400">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth("next")}
              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth(currentDate).map((day, index) => (
            <div key={index} className="aspect-square flex items-center justify-center relative">
              {day && (
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium relative
                  ${isStreakDay(day) ? "bg-yellow-400 text-gray-900" : "bg-gray-700 text-gray-400"}
                `}
                >
                  {hasConsecutiveStreak(day) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Flame className="w-4 h-4 text-orange-500" />
                    </div>
                  )}
                  {!hasConsecutiveStreak(day) && day}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-gray-700"></div>
            <span>Inactive</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center space-x-1">
            <Flame className="w-3 h-3 text-orange-500" />
            <span>Streak</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
