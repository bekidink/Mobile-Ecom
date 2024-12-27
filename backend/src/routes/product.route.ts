import { Router } from 'express';
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { validateData } from '../middlewares/validationMiddleware';

import { verifySeller, verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductById);
router.post(
  '/',
  verifyToken,
  verifySeller,
  
  createProduct
);
router.put(
  '/:id',
  verifyToken,
  verifySeller,
  
  updateProduct
);
router.delete('/:id', verifyToken, verifySeller, deleteProduct);

export default router;
