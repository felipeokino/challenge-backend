const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import User from '../models/User';
import 'dotenv'

import { Request, Response } from 'express';

export const authController = {
  async findUser(email: string, password: string): Promise<User | null> {
     return await User.findOne({ where: { email, password } })
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await this.findUser(email, password);

      if (!user) {
        throw new Error('User not found');
      }

      const token = jwt.sign({ id: user.get('id') }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },

  async validateToken(req: Request, res: Response): Promise<boolean> {
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
    }
  },
};
