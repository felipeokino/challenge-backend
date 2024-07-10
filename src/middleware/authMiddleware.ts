import { Request, Response, NextFunction } from 'express';
import { authController } from '../controllers/authController';

const authMiddleware =  async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const isAuthenticated = await authController.validateToken(req, res);
  if (!isAuthenticated) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

export default authMiddleware;
