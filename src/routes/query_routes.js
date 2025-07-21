import { Router } from 'express';
import { createQueryWithAI } from '../controllers/query_controller.js';
import { authenticateToken } from '../middlewares/auth_middleware.js';

const router = Router();

router.post('/', authenticateToken, createQueryWithAI);

export default router;