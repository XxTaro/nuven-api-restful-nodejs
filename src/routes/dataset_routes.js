import { Router } from 'express';
import { uploadDataset, getDatasetById, getAllDatasets } from '../controllers/dataset_controller.js';
import { authenticateToken } from '../middlewares/auth_middleware.js';
import upload from '../middlewares/upload_middleware.js';

const router = Router();

router.post(
  '/upload',
  authenticateToken,
  upload.single('datasetFile'),
  uploadDataset
);

router.get(
    '/:id/records',
    authenticateToken,
    getDatasetById
)

router.get(
    '/',
    authenticateToken,
    getAllDatasets
);

export default router;