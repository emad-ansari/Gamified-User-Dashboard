import { RequestHandler, Router } from 'express';
import { auth } from '../middleware/auth';
import { saveJournalEntry, getJournalEntries } from '../controllers/journal/journalController';

const router = Router();

// Protected routes - require authentication
router.use(auth as RequestHandler);

router.post('/', saveJournalEntry as RequestHandler);
router.get('/', getJournalEntries as RequestHandler);

export default router; 