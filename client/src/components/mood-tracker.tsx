"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smile } from "lucide-react"

interface MoodTrackerProps {
  onMoodSelect: (mood: string) => void
}

const moods = [
  { emoji: "😊", label: "Happy", color: "bg-green-400" },
  { emoji: "😌", label: "Calm", color: "bg-blue-400" },
  { emoji: "😐", label: "Neutral", color: "bg-gray-400" },
  { emoji: "😔", label: "Sad", color: "bg-purple-400" },
  { emoji: "😤", label: "Frustrated", color: "bg-red-400" },
]

export const MoodTracker: React.FC<MoodTrackerProps> = ({ onMoodSelect }) => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-blue-400">
          <Smile className="w-5 h-5" />
          <span>Mood Tracker</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2">
          {moods.map((mood) => (
            <Button
              key={mood.label}
              onClick={() => onMoodSelect(mood.label)}
              className={`h-auto flex flex-col items-center p-3 ${mood.color} hover:opacity-90 text-gray-900`}
              variant="ghost"
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
