"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Plus, Target, Trash2 } from "lucide-react"
import { api } from "@/lib/api"
import { useToast } from "@/hooks/useToast"

interface Habit {
  _id: string
  title: string
  completed: boolean
  xp: number
}

interface ApiResponse<T> {
  data: T
  error?: string
}

interface HabitsSectionProps {
  onHabitComplete: (xp: number) => void
}

export const HabitsSection: React.FC<HabitsSectionProps> = ({ onHabitComplete }) => {
  const [habits, setHabits] = useState<Habit[]>([])
  const [newHabit, setNewHabit] = useState({ title: '', xp: 10 })
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    fetchHabits()
  }, [])

  const fetchHabits = async () => {
    try {
      const response = await api.habits.getAll() as ApiResponse<Habit[]>
      if (response.error) {
        throw new Error(response.error)
      }
      setHabits(response.data)
    } catch (error) {
      toast.showToast('Failed to load habits', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newHabit.title.trim()) return

    try {
      const response = await api.habits.add(newHabit.title, newHabit.xp) as ApiResponse<Habit>
      if (response.error) {
        throw new Error(response.error)
      }
      setHabits(prev => [...prev, response.data])
      setNewHabit({ title: '', xp: 10 })
      toast.showToast('Habit added successfully!', 'success')
    } catch (error) {
      toast.showToast('Failed to add habit', 'error')
    }
  }

  const handleToggleHabit = async (habit: Habit) => {
    try {
      const response = await api.habits.update(habit._id, !habit.completed) as ApiResponse<Habit>
      if (response.error) {
        throw new Error(response.error)
      }
      setHabits(prev =>
        prev.map(h => (h._id === habit._id ? response.data : h))
      )
      if (!habit.completed) {
        onHabitComplete(habit.xp)
        toast.showToast(`Completed "${habit.title}"! (+${habit.xp} XP)`, 'success')
      }
    } catch (error) {
      toast.showToast('Failed to update habit', 'error')
    }
  }

  const handleDeleteHabit = async (habitId: string) => {
    try {
      const response = await api.habits.delete(habitId) as ApiResponse<void>
      if (response.error) {
        throw new Error(response.error)
      }
      setHabits(prev => prev.filter(h => h._id !== habitId))
      toast.showToast('Habit deleted successfully!', 'success')
    } catch (error) {
      toast.showToast('Failed to delete habit', 'error')
    }
  }

  if (isLoading) {
    return <div>Loading habits...</div>
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-green-400">
          <Target className="w-5 h-5" />
          <span>Daily Habits</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddHabit} className="flex gap-2 mb-4">
          <Input
            placeholder="Add a new habit..."
            value={newHabit.title}
            onChange={(e) => setNewHabit(prev => ({ ...prev, title: e.target.value }))}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
          />
          <Button type="submit" className="bg-green-400 hover:bg-green-500 text-gray-900">
            <Plus className="w-4 h-4" />
          </Button>
        </form>

        <div className="space-y-2">
          {habits.map((habit) => (
            <div
              key={habit._id}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-0 hover:bg-transparent ${
                    habit.completed ? 'text-green-400' : 'text-gray-400'
                  }`}
                  onClick={() => handleToggleHabit(habit)}
                >
                  <CheckCircle className="w-5 h-5" />
                </Button>
                <span className={habit.completed ? 'line-through text-gray-500' : ''}>
                  {habit.title}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">+{habit.xp} XP</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-transparent"
                  onClick={() => handleDeleteHabit(habit._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          {habits.length === 0 && (
            <p className="text-center text-gray-400 py-4">
              No habits added yet. Add your first habit above!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
