import { Request, Response } from 'express';
import User from '../../models/User';

export const updateMood = async (req: Request, res: Response) => {
  try {
    const { mood } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.moodHistory.push({ mood, date: new Date() });
    await user.save();
    
    res.json({ message: 'Mood updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMoodHistory = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Sort entries by date in descending order (newest first)
    const moodHistory = user.moodHistory
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(entry => ({
        date: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
        mood: getMoodValue(entry.mood),
        description: entry.mood
      }));
    
    res.json(moodHistory);
  } catch (error) {
    console.error('Error in getMoodHistory:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to convert mood strings to numerical values
const getMoodValue = (mood: string): number => {
  const moodValues: { [key: string]: number } = {
    'Happy': 9,
    'Calm': 7,
    'Neutral': 5,
    'Sad': 3,
    'Frustrated': 2
  };
  return moodValues[mood] || 5;
}; 