import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth_middleware.js';
import { getMe } from '../controllers/user_controller.js';

const router = Router();

router.get('/me', authenticateToken, getMe);

export default router;