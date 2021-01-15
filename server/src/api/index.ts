import { Router } from 'express';
import ProductRouter from './products';
import { canIBuy } from './canIBuy';
import { addProduct } from './addProduct';

const router = Router();

router.post('/addproduct', addProduct);
router.get('/canibuy', canIBuy);
router.use(ProductRouter);

export default router;
