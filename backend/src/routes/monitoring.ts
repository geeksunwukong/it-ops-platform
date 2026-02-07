import { Router } from 'express';
import { 
  getServerMetrics, 
  getNetworkMetrics, 
  getAlerts, 
  createAlert, 
  getSystemHealth 
} from '../controllers/monitoringController';

const router: Router = Router();

router.get('/server-metrics', getServerMetrics);
router.get('/network-metrics', getNetworkMetrics);
router.get('/alerts', getAlerts);
router.post('/alerts', createAlert);
router.get('/health', getSystemHealth);

export default router;