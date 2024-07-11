const jwt = require('jsonwebtoken');
import User from '../models/UserModel';
import { HTTPStatusCodes } from '../utils';
import 'dotenv'

import { Request, Response } from 'express';

export const authController = {

  async login(req: Request, res: Response) {
    console.log('LOG: authController.login started');
    const { email, password } = req.body;

    console.log('LOG: authController.login email: ' + email);

    try {
      const user = await User.findOne({ where: { email, password } });

      if (!user) {
        return res.status(HTTPStatusCodes.NOT_FOUND).json({ message: 'User not found' });
      }
      const userResponse = {
        id: user.get('id'),
        email: user.get('email'),
        name: user.get('name'),
      }

      const token = jwt.sign({ id: user.get('id') }, process.env.JWT_SECRET);
      res.status(HTTPStatusCodes.OK).json({ token, user: userResponse });
    } catch (error: any) {
      res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    } finally {
      console.log('LOG: authController.login ended');
    }
  },

  async validateToken(req: Request, res: Response): Promise<boolean> {
    console.log('LOG: authController.validateToken started');
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return false;
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number };
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return false;
      }
      return true;
    } catch (error: any) {
      return false;
    } finally {
      console.log('LOG: authController.validateToken ended');
    }
  },
};
