import { Request, Response } from 'express';
import User from '../../models/User';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    console.log('profile rout hit')
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 