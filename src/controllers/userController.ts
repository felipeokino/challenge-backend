import { Request, Response } from 'express';
import User from '../models/UserModel';

export const userController = {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const userData = await User.create({ name, email, password });
    return res.status(201).json(userData);
  },

  async show(req: Request, res: Response) {
    const user = await User.findByPk(req.params.id);
    return res.status(200).json(user);
  },

  async update(req: Request, res: Response) {
    const user = await User.update(req.body, {
      where: { id: req.params.id },
    });
    return res.status(200).json(user);
  },

  async destroy(req: Request, res: Response) {
    const user = await User.destroy({
      where: { id: req.params.id },
    });
    return res.status(200).json(user);
  },

  async findAll(req: Request, res: Response) {
    const users = await User.findAll() || [];
    return res.status(200).json(users);
  },
}
