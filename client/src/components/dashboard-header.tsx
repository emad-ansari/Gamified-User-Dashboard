import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { UserProfile } from "@/hooks/useDashboard"

interface DashboardHeaderProps {
  profile: UserProfile;
  currentTime: Date;
}

export function DashboardHeader({ profile, currentTime }: DashboardHeaderProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback className="bg-lime-400 text-gray-900 font-semibold">
            {profile.username.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{getGreeting()}, {profile.username}!</h1>
          <p className="text-gray-400">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-400">Current Time</p>
        <p className="text-xl font-mono">{formatTime(currentTime)}</p>
      </div>
    </div>
  );
} 