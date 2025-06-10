import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, TrendingUp, Calendar, Star } from "lucide-react";
import { SideBar } from "@/components/sidebar";
import { useDashboard } from "@/hooks/useDashboard";
import { MoodAnalysis } from "@/components/mood-analysis";

export const Statistics: React.FC = () => {
  const { profile, loading } = useDashboard();

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
      <SideBar />
      <div className="ml-16 p-6">
        <div className="flex items-center space-x-2 mb-8">
          <BarChart2 className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold">Statistics</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-400">
                <TrendingUp className="w-5 h-5" />
                <span>XP Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">{profile.xp}</div>
                <p className="text-gray-400">Total XP Earned</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-400">
                <Calendar className="w-5 h-5" />
                <span>Streak Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">{profile.streak}</div>
                <p className="text-gray-400">Current Streak</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-400">
                <Star className="w-5 h-5" />
                <span>Level Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">{profile.level}</div>
                <p className="text-gray-400">Current Level</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <MoodAnalysis />
        </div>

        <div className="mt-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-blue-400">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-gray-900">
                      ✓
                    </div>
                    <div>
                      <p className="font-medium">Completed Daily Tasks</p>
                      <p className="text-sm text-gray-400">Today</p>
                    </div>
                  </div>
                  <span className="text-green-400">+{profile.xp} XP</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-gray-900">
                      🔥
                    </div>
                    <div>
                      <p className="font-medium">Streak Milestone</p>
                      <p className="text-sm text-gray-400">{profile.streak} Days</p>
                    </div>
                  </div>
                  <span className="text-orange-400">Achievement</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-gray-900">
                      🏆
                    </div>
                    <div>
                      <p className="font-medium">Level Up!</p>
                      <p className="text-sm text-gray-400">Reached Level {profile.level}</p>
                    </div>
                  </div>
                  <span className="text-purple-400">Milestone</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}; 