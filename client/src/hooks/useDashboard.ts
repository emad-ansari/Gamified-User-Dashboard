import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/useToast';

export interface StreakDay {
  date: string;
  status: 'completed' | 'missed' | 'none';
  hasStreak: boolean;
}

export interface MoodData {
  date: string;
  mood: number;
  description: string;
}

export interface UserProfile {
  username: string;
  xp: number;
  maxXp: number;
  level: number;
  streak: number;
  streakCalendar?: StreakDay[];
}

export const useDashboard = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  console.log('user profile data: ', profile);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {

    try {
      const response = await api.user.getProfile() as { data: UserProfile, error?: string };
       
      if (response.error) {
        throw new Error(response.error);
      }

      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      toast.showToast("Failed to load profile", "error");
      // If unauthorized, redirect to login
      if ((error as any)?.message?.includes("unauthorized")) {
        navigate("/");
      }
    }
  };

  const addXP = async (amount: number) => {
    if (!profile) return;

    try {
      const response = await api.xp.update(amount);
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Update local state with new XP data
      setProfile(prev => {
        if (!prev) return prev;
        const newXP = prev.xp + amount;
        if (newXP >= prev.maxXp) {
          return {
            ...prev,
            level: prev.level + 1,
            xp: newXP - prev.maxXp
          };
        }
        return {
          ...prev,
          xp: newXP
        };
      });
    } catch (error) {
      toast.showToast("Failed to update XP", "error");
    }
  };

  const updateStreak = async () => {
    if (!profile) return;

    try {
      const response = await api.streak.update();
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Update local state with new streak data
      setProfile(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          streak: prev.streak + 1
        };
      });
      
      // Add XP for maintaining streak
      addXP(25);
      toast.showToast("Daily streak updated! +25 XP", "success");
    } catch (error) {
      toast.showToast("Failed to update streak", "error");
    }
  };

  const updateMood = async (mood: string) => {
    try {
      const response = await api.mood.update(mood);
      if (response.error) {
        throw new Error(response.error);
      }
      addXP(10);
      toast.showToast("Mood updated! +10 XP", "success");
    } catch (error) {
      toast.showToast("Failed to update mood", "error");
    }
  };

  const getMoodHistory = async () => {
    try {
      const response = await api.mood.getHistory() as { data: MoodData[], error?: string };
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    } catch (error) {
      toast.showToast("Failed to load mood history", "error");
      return [];
    }
  };

  const saveJournalEntry = async (entry: string) => {
    if (!entry.trim()) return;
    
    try {
      const response = await api.journal.save(entry);
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Add XP for journal entry
      addXP(15);
      toast.showToast("Journal entry saved! +15 XP", "success");
    } catch (error) {
      toast.showToast("Failed to save journal entry", "error");
    }
  };

  const getStreakCalendar = async (year: number, month: number) => {
    try {
      const response = await api.streak.getCalendar(year, month) as { data: StreakDay[], error?: string };
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    } catch (error) {
      toast.showToast("Failed to load streak calendar", "error");
      return [];
    }
  };

  return {
    profile,
    loading,
    addXP,
    updateStreak,
    updateMood,
    getMoodHistory,
    saveJournalEntry,
    getStreakCalendar
  };
}; 