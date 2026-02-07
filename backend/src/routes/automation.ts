import { Router } from 'express';
import { 
  getAllTasks, 
  getTaskById, 
  createTask, 
  updateTask, 
  deleteTask,
  runTaskNow,
  getScheduledTasks
} from '../controllers/automationController';

const router: Router = Router();

router.get('/', getAllTasks);
router.get('/scheduled', getScheduledTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/run', runTaskNow);

export default router;