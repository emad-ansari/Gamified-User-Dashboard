import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, Flame } from "lucide-react"
import { useDashboard } from "@/hooks/useDashboard"
import type { StreakDay } from "@/hooks/useDashboard"

export function StreakCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [streakDays, setStreakDays] = useState<StreakDay[]>([])
  const [loading, setLoading] = useState(true)
  const { getStreakCalendar } = useDashboard()

  useEffect(() => {
    fetchStreakData()
  }, [currentDate])

  const fetchStreakData = async () => {
    setLoading(true)
    const data = await getStreakCalendar(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    )
    setStreakDays(data)
    setLoading(false)
  }

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
    // Ensure we're working with local dates
    const date = new Date(year, month, day);
    return date.toISOString().split('T')[0];
  }

  const isToday = (day: number) => {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    return (
      todayDate === day &&
      todayMonth === currentDate.getMonth() &&
      todayYear === currentDate.getFullYear()
    );
  }

  const getStreakDay = (day: number): StreakDay | undefined => {
    if (!day) return undefined;
    const dateKey = formatDateKey(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const foundStreak = streakDays.find(streak => streak.date === dateKey);

    return foundStreak;
  }

  const getDayStatus = (day: number, streakDay: StreakDay | undefined) => {
    // If it's today and no streak data, show as inactive
    if (isToday(day) && !streakDay?.status) {
      return 'none'
    }
    return streakDay?.status || 'none'
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
        {loading ? (
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            Loading...
          </div>
        ) : (
          <>
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
              {getDaysInMonth(currentDate).map((day, index) => {
                const streakDay = day ? getStreakDay(day) : undefined;
                const status = day ? getDayStatus(day, streakDay) : 'none';
                const isActiveDay = status === 'completed';
                
                return (
                  <div key={index} className="aspect-square flex items-center justify-center relative">
                    {day && (
                      <div
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium relative
                          ${isActiveDay ? "bg-green-400 text-gray-900" : 
                            status === 'missed' ? "bg-red-400/20 text-red-400" : 
                            "bg-gray-700 text-gray-400"}
                          ${isToday(day) ? "ring-2 ring-blue-400" : ""}
                        `}
                      >
                        {status === 'completed' ? (
                          <Flame className="w-4 h-4 text-orange-500" />
                        ) : status === 'missed' ? (
                          "😢"
                        ) : (
                          day
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-4 mt-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                <span>Inactive</span>
              </div>
              <div className="flex items-center space-x-1">
                <Flame className="w-3 h-3 text-orange-500" />
                <span>Active Day</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-red-400">😢</span>
                <span>Missed</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
