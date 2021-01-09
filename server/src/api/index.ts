import { Router } from 'express';
import ProductRouter from './products';
import { canIBuy } from './canIBuy';

const router = Router();

router.get('/canibuy', canIBuy);
router.use(ProductRouter);

export default router;
