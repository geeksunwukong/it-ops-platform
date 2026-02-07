import { Router } from 'express';
import { 
  getAllAssets, 
  getAssetById, 
  createAsset, 
  updateAsset, 
  deleteAsset,
  searchAssets
} from '../controllers/assetController';

const router: Router = Router();

router.get('/', getAllAssets);
router.get('/search', searchAssets);
router.get('/:id', getAssetById);
router.post('/', createAsset);
router.put('/:id', updateAsset);
router.delete('/:id', deleteAsset);

export default router;