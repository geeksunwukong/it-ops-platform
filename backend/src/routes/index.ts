import { Router } from 'express';
import authRoutes from './auth';
import assetRoutes from './assets';
import monitoringRoutes from './monitoring';
import automationRoutes from './automation';

const router: Router = Router();

router.use('/auth', authRoutes);
router.use('/assets', assetRoutes);
router.use('/monitoring', monitoringRoutes);
router.use('/automation', automationRoutes);

export default router;