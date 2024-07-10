import { Router } from 'express';
import productController from '../controllers/productController';
import authMiddleware from '../middleware/authMiddleware';

const productsRouter = Router();

productsRouter.get('/', authMiddleware, productController.findAll);
productsRouter.post('/', authMiddleware, productController.store);
productsRouter.get('/:id', authMiddleware, productController.show);
productsRouter.put('/:id', authMiddleware, productController.update);
productsRouter.delete('/:id', authMiddleware, productController.delete);

module.exports = productsRouter;
