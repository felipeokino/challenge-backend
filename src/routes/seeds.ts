import e, { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import seedsController from '../controllers/seedController';

const seedsRouter = Router();

seedsRouter.post('/', authMiddleware, seedsController.seed);
seedsRouter.delete('/', authMiddleware, seedsController.removeAllProducts);

module.exports = seedsRouter;
