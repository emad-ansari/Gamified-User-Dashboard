import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Zap, Trophy, Flame, BookOpen, Star, TrendingUp } from "lucide-react"
import { StreakCalendar } from "@/components/streak-calendar"
import { MoodTracker } from "@/components/mood-tracker"
import { HabitsSection } from "@/components/habits-section"
import { SideBar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { useDashboard } from "@/hooks/useDashboard"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, loading, updateStreak, updateMood, saveJournalEntry, addXP } = useDashboard();
  const [journalEntry, setJournalEntry] = useState("");
  const [currentTime] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("Gtoken");
    if(!token) navigate('/');
  }, [navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Failed to load profile
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SideBar/>
      <div className="ml-16 p-6">
        <DashboardHeader profile={profile} currentTime={currentTime} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lime-400">
                    <Zap className="w-5 h-5" />
                    <span>Experience Points</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-lime-400">{profile.xp}</span>
                      <span className="text-gray-400">/ {profile.maxXp} XP</span>
                    </div>
                    <Progress value={(profile.xp / profile.maxXp) * 100} className="h-3 [&>div]:bg-lime-300 bg-lime-100" />
                    <p className="text-sm text-gray-400">{profile.maxXp - profile.xp} XP to next level</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-purple-400">
                    <Trophy className="w-5 h-5" />
                    <span>Current Level</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2">{profile.level}</div>
                    <Badge variant="secondary" className="bg-purple-400/20 text-purple-400">
                      {profile.level < 5 ? "Beginner" : profile.level < 10 ? "Intermediate" : "Advanced"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-orange-400">
                    <Flame className="w-5 h-5" />
                    <span>Daily Streak</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">🔥 {profile.streak}</div>
                    <p className="text-gray-400">Days in a row</p>
                    <Button
                      onClick={updateStreak}
                      className="mt-3 bg-orange-400 hover:bg-orange-500 text-gray-900"
                      size="sm"
                    >
                      Check In Today
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <MoodTracker onMoodSelect={updateMood} />
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-400">
                  <BookOpen className="w-5 h-5" />
                  <span>Daily Journal</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="How was your day? Write your thoughts here..."
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 min-h-[100px]"
                />
                <Button
                  onClick={() => {
                    if (journalEntry.trim()) {
                      saveJournalEntry(journalEntry);
                      setJournalEntry("");
                    }
                  }}
                  className="mt-3 bg-blue-400 hover:bg-blue-500 text-gray-900"
                  disabled={!journalEntry.trim()}
                >
                  Save Entry (+15 XP)
                </Button>
              </CardContent>
            </Card>

            <HabitsSection onHabitComplete={(xp) => addXP(xp)} />
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-yellow-400">
                  <Star className="w-5 h-5" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">🏆</div>
                  <div>
                    <p className="font-semibold text-sm">First Week!</p>
                    <p className="text-xs text-gray-400">Complete 7 day streak</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">📝</div>
                  <div>
                    <p className="font-semibold text-sm">Journal Master</p>
                    <p className="text-xs text-gray-400">Write 10 journal entries</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg opacity-50">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">🎯</div>
                  <div>
                    <p className="font-semibold text-sm">Goal Crusher</p>
                    <p className="text-xs text-gray-400">Complete 50 tasks</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <StreakCalendar />

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-400">
                  <TrendingUp className="w-5 h-5" />
                  <span>This Week</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">XP Earned</span>
                  <span className="font-semibold text-green-400">+{profile.xp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Tasks Completed</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Journal Entries</span>
                  <span className="font-semibold">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Active Days</span>
                  <span className="font-semibold text-orange-400">{profile.streak}/7</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
