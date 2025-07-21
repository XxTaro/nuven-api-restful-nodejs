import { getRecordsByQuery } from '../controllers/record_controller.js';
import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth_middleware.js';

const router = Router();

router.get('/search',
    authenticateToken,
    getRecordsByQuery
);

export default router;