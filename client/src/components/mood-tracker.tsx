"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface MoodTrackerProps {
  onMoodSelect: (mood: string) => void
}

export function MoodTracker({ onMoodSelect }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [todayMood, setTodayMood] = useState<string | null>(null)

  const moods = [
    { emoji: "😄", label: "Excellent", value: "excellent" },
    { emoji: "🙂", label: "Good", value: "good" },
    { emoji: "😐", label: "Okay", value: "okay" },
    { emoji: "😔", label: "Bad", value: "bad" },
    { emoji: "😢", label: "Terrible", value: "terrible" },
  ]

  const handleMoodSelect = (mood: (typeof moods)[0]) => {
    setSelectedMood(mood.value)
    setTodayMood(mood.emoji)
    onMoodSelect(mood.value)
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-pink-400">
          <Heart className="w-5 h-5" />
          <span>Mood Tracker</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {todayMood ? (
          <div className="text-center">
            <div className="text-4xl mb-2">{todayMood}</div>
            <p className="text-gray-400 text-sm">Today's mood recorded!</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setTodayMood(null)
                setSelectedMood(null)
              }}
              className="mt-2 text-gray-400 hover:text-white"
            >
              Change mood
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-400 text-sm text-center">How are you feeling today?</p>
            <div className="grid grid-cols-5 gap-2">
              {moods.map((mood) => (
                <Button
                  key={mood.value}
                  variant="ghost"
                  className={`
                    h-12 text-2xl hover:bg-gray-800 transition-all
                    ${selectedMood === mood.value ? "bg-gray-800 scale-110" : ""}
                  `}
                  onClick={() => handleMoodSelect(mood)}
                >
                  {mood.emoji}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
