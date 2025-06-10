import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Make sure to use environment variable in production

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user: IUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data and token (excluding password)
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      level: user.level,
      xp: user.xp,
      maxXp: user.maxXp,
      streak: user.streak
    };

    res.status(201).json({
      message: 'User created successfully',
      user: userData,
      token
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
      console.log('user details: ', email, password)

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data and token (excluding password)
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      level: user.level,
      xp: user.xp,
      maxXp: user.maxXp,
      streak: user.streak
    };

    res.json({
      message: 'Login successful',
      user: userData,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
}; 