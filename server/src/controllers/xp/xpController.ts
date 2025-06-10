import { Request, Response } from 'express';
import User from '../../models/User';

export const updateXP = async (req: Request, res: Response) => {
  try {
    const { xpAmount } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.xp += xpAmount;
    
    // Level up logic
    while (user.xp >= user.maxXp) {
      user.level += 1;
      user.xp -= user.maxXp;
      user.maxXp = Math.floor(user.maxXp * 1.2); // Increase max XP by 20% each level
    }

    await user.save();
    res.json({ level: user.level, xp: user.xp, maxXp: user.maxXp });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 