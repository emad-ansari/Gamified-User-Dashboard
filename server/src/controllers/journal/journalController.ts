import { Request, Response } from 'express';
import User from '../../models/User';

export const saveJournalEntry = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.journalEntries.push({ content, date: new Date() });
    await user.save();
    
    res.json({ 
      message: 'Journal entry saved successfully',
      entry: user.journalEntries[user.journalEntries.length - 1]
    });
  } catch (error) {
    console.error('Error in saveJournalEntry:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getJournalEntries = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Sort entries by date in descending order (newest first)
    const entries = user.journalEntries.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    res.json(entries);
  } catch (error) {
    console.error('Error in getJournalEntries:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 