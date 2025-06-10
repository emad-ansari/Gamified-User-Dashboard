import { Request, Response } from 'express';
import User from '../../models/User';

export const updateStreak = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const now = new Date();
    // Convert to local date without time
    now.setHours(0, 0, 0, 0);
    
    const lastCheckIn = user.lastCheckIn ? new Date(user.lastCheckIn) : null;
    if (lastCheckIn) {
      lastCheckIn.setHours(0, 0, 0, 0);
    }

    console.log('Current check-in:', now.toISOString());
    console.log('Last check-in:', lastCheckIn?.toISOString());
    
    if (!lastCheckIn) {
      // First check-in ever
      user.streak = 1;
      user.streakHistory.push({
        date: now,
        status: 'completed' as const
      });
      console.log('First check-in recorded');
    } else {
      const timeDiff = now.getTime() - lastCheckIn.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      console.log('Days difference:', daysDiff);
      
      if (daysDiff === 0) {
        // Already checked in today
        return res.status(400).json({ message: 'Already checked in today' });
      } else if (daysDiff === 1) {
        // Consecutive day - increase streak
        user.streak += 1;
        user.streakHistory.push({
          date: now,
          status: 'completed' as const
        });
        console.log('Consecutive day recorded, new streak:', user.streak);
      } else {
        // Missed days - add them to history and reset streak
        const missedDays = [];
        for (let i = 1; i < daysDiff; i++) {
          const missedDate = new Date(lastCheckIn);
          missedDate.setDate(missedDate.getDate() + i);
          missedDays.push({
            date: new Date(missedDate),
            status: 'missed' as const
          });
        }
        user.streakHistory.push(...missedDays);
        
        // Start new streak
        user.streak = 1;
        user.streakHistory.push({
          date: now,
          status: 'completed' as const
        });
        console.log('Streak reset, missed days recorded:', missedDays.length);
      }
    }
    
    user.lastCheckIn = now;
    await user.save();
    
    res.json({
      streak: user.streak,
      lastCheckIn: user.lastCheckIn,
      todayStatus: 'completed' as const
    });
  } catch (error) {
    console.error('Error in updateStreak:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getStreakCalendar = async (req: Request, res: Response) => {
  try {
    const { year, month } = req.query;
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Convert year and month to numbers
    const targetYear = parseInt(year as string);
    const targetMonth = parseInt(month as string) - 1; // Convert to 0-based month

    // Get start and end dates for the requested month
    const startDate = new Date(targetYear, targetMonth, 1);
    const endDate = new Date(targetYear, targetMonth + 1, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    console.log('Fetching calendar data:', {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    });

    // Filter streak history for the requested month
    const monthStreaks = user.streakHistory.filter(day => {
      const streakDate = new Date(day.date);
      return streakDate >= startDate && streakDate <= endDate;
    });

    console.log('Found streak entries:', monthStreaks.map(day => ({
      date: new Date(day.date).toISOString(),
      status: day.status
    })));

    // Create a map of dates to streak statuses
    const streakMap = new Map();
    
    // Add all days of the month as 'none' first
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      streakMap.set(
        currentDate.toISOString().split('T')[0],
        { date: new Date(currentDate), status: 'none', hasStreak: false }
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Override with actual streak data
    monthStreaks.forEach(day => {
      const dateKey = new Date(day.date).toISOString().split('T')[0];
      streakMap.set(dateKey, { ...day, hasStreak: day.status === 'completed' });
    });

    // Convert map to array for response
    const response = Array.from(streakMap.entries()).map(([date, data]) => ({
      date,
      status: data.status,
      hasStreak: data.hasStreak
    }));

    console.log('Response data:', response);

    res.json(response);
  } catch (error) {
    console.error('Error in getStreakCalendar:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 