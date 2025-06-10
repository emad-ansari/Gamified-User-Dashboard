import { Request, Response } from 'express';
import User from '../../models/User';

export const getHabits = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.habits);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addHabit = async (req: Request, res: Response) => {
  try {
    const { title, xp } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $push: {
          habits: {
            title,
            completed: false,
            xp,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newHabit = user.habits[user.habits.length - 1];
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateHabit = async (req: Request, res: Response) => {
  try {
    const { habitId } = req.params;
    const { completed } = req.body;
    const user = await User.findOneAndUpdate(
      { 
        _id: req.userId,
        'habits._id': habitId 
      },
      { 
        $set: { 'habits.$.completed': completed } 
      },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    const updatedHabit = user.habits.find(h => h._id.toString() === habitId);
    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    const { habitId } = req.params;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { 
        $pull: { habits: { _id: habitId } } 
      },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 