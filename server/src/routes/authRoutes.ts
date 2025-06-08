import { RequestHandler, Router } from 'express';
import { login, signup } from '../controllers/authController';

const router = Router();

// Authentication routes

router.post('/signup', signup as RequestHandler);  
router.post('/login', login as RequestHandler);

export default router; 