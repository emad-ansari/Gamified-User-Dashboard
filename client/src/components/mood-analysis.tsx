import  { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Brain } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";

interface MoodData {
  date: string;
  mood: number;
  description: string;
}

export function MoodAnalysis() {
  const [moodHistory, setMoodHistory] = useState<MoodData[]>([]);
  const [loading, setLoading] = useState(true);
  const { getMoodHistory } = useDashboard();

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  const fetchMoodHistory = async () => {
    try {
      const data = await getMoodHistory();
      setMoodHistory(data);
    } catch (error) {
      console.error("Failed to fetch mood history:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="flex items-center justify-center h-[400px]">
          Loading mood data...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-400">
          <Brain className="w-5 h-5" />
          <span>Mood Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis
                stroke="#9CA3AF"
                fontSize={12}
                domain={[0, 10]}
                ticks={[0, 2, 4, 6, 8, 10]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#9CA3AF" }}
                itemStyle={{ color: "#60A5FA" }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#60A5FA"
                strokeWidth={2}
                dot={{ fill: "#60A5FA", strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Average Mood:</span>
            <span className="text-blue-400 font-medium">
              {(moodHistory.reduce((acc, curr) => acc + curr.mood, 0) / moodHistory.length).toFixed(1)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Highest Mood:</span>
            <span className="text-green-400 font-medium">
              {Math.max(...moodHistory.map(d => d.mood))}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Lowest Mood:</span>
            <span className="text-red-400 font-medium">
              {Math.min(...moodHistory.map(d => d.mood))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 