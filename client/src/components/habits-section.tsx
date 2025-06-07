"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Plus, Target, X } from "lucide-react"

interface Habit {
  id: string
  title: string
  completed: boolean
  xp: number
}

interface HabitsSectionProps {
  onHabitComplete: (xp: number) => void
}

export function HabitsSection({ onHabitComplete }: HabitsSectionProps) {
  const [habits, setHabits] = useState<Habit[]>([
    { id: "1", title: "Drink 8 glasses of water", completed: false, xp: 20 },
    { id: "2", title: "Meditate for 10 minutes", completed: true, xp: 25 },
    { id: "3", title: "Read for 30 minutes", completed: false, xp: 30 },
    { id: "4", title: "Exercise for 20 minutes", completed: false, xp: 35 },
    { id: "5", title: "Write in journal", completed: true, xp: 15 },
  ])

  const [newHabit, setNewHabit] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id && !habit.completed) {
          onHabitComplete(habit.xp)
          return { ...habit, completed: true }
        }
        return habit
      }),
    )
  }

  const addHabit = () => {
    if (newHabit.trim()) {
      const habit: Habit = {
        id: Date.now().toString(),
        title: newHabit.trim(),
        completed: false,
        xp: 20,
      }
      setHabits((prev) => [...prev, habit])
      setNewHabit("")
      setShowAddForm(false)
    }
  }

  const removeHabit = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id))
  }

  const completedCount = habits.filter((h) => h.completed).length
  const totalXP = habits.reduce((sum, habit) => sum + (habit.completed ? habit.xp : 0), 0)

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-green-400">
            <Target className="w-5 h-5" />
            <span>Daily Habits</span>
          </div>
          <div className="text-sm text-gray-400">
            {completedCount}/{habits.length} completed (+{totalXP} XP)
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className={`
              flex items-center justify-between p-3 rounded-lg border transition-all
              ${
                habit.completed
                  ? "bg-green-400/10 border-green-400/30"
                  : "bg-gray-800 border-gray-700 hover:border-gray-600"
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleHabit(habit.id)}
                className={`
                  h-8 w-8 rounded-full
                  ${habit.completed ? "text-green-400 hover:text-green-300" : "text-gray-400 hover:text-white"}
                `}
                disabled={habit.completed}
              >
                <CheckCircle2 className="w-5 h-5" />
              </Button>
              <span
                className={`
                ${habit.completed ? "line-through text-gray-400" : "text-white"}
              `}
              >
                {habit.title}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">+{habit.xp} XP</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeHabit(habit.id)}
                className="h-6 w-6 text-gray-400 hover:text-red-400"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {showAddForm ? (
          <div className="flex space-x-2">
            <Input
              placeholder="Add new habit..."
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addHabit()}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              autoFocus
            />
            <Button onClick={addHabit} size="sm" className="bg-green-400 hover:bg-green-500 text-gray-900">
              Add
            </Button>
            <Button
              onClick={() => {
                setShowAddForm(false)
                setNewHabit("")
              }}
              variant="ghost"
              size="sm"
              className="text-gray-400"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setShowAddForm(true)}
            variant="ghost"
            className="w-full border-2 border-dashed border-gray-700 hover:border-gray-600 text-gray-400 hover:text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Habit
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
