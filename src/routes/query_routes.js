import { Router } from 'express';
import { createQueryWithAI } from '../controllers/query_controller.js';
import { authenticateToken } from '../middlewares/auth_middleware.js';
import { getQueriesByUser } from '../controllers/query_controller.js';

const router = Router();

router.post('/', authenticateToken, createQueryWithAI);
router.get('/', authenticateToken, getQueriesByUser);

export default router;