import { RequestHandler, Router } from 'express';
import { auth } from '../middleware/auth';
import { getUserProfile } from '../controllers/profile/profileController';
import { updateXP } from '../controllers/xp/xpController';
import { updateMood } from '../controllers/mood/moodController';
import { updateStreak } from '../controllers/streak/streakController';
import { deleteHabit } from '../controllers/habits/habitsController';
import { updateHabit } from '../controllers/habits/habitsController';
import { addHabit } from '../controllers/habits/habitsController';
import { getHabits } from '../controllers/habits/habitsController';

const router = Router();

// Protected routes - require authentication
router.use(auth as RequestHandler);

// User profile
router.get('/profile', getUserProfile as RequestHandler);

// XP and Level routes
router.post('/xp', updateXP as RequestHandler);

// Streak routes
router.post('/streak', updateStreak as RequestHandler);   

// Mood tracking routes
router.post('/mood', updateMood as RequestHandler);

// Habits routes
router.get('/habits', getHabits as RequestHandler);
router.post('/habits', addHabit as RequestHandler);
router.put('/habits/:habitId', updateHabit as RequestHandler);
router.delete('/habits/:habitId', deleteHabit as RequestHandler);

export default router; 