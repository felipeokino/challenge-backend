import { Request, Response } from 'express';
import User from '../models/UserModel';
import { HTTPStatusCodes } from '../utils';

export const userController = {
  async store(req: Request, res: Response) {
    console.log('LOG: userController.store started');
    const { name, email, password } = req.body;

    try {
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const userData = await User.create({ name, email, password });
      return res.status(HTTPStatusCodes.CREATED).json(userData);
    } catch (error) {
      res.status(HTTPStatusCodes.BAD_REQUEST).json(error);
    } finally {
      console.log('LOG: userController.store ended');
    }
  },

  async show(req: Request, res: Response) {
    console.log('LOG: userController.show started');
    try {
      const user = await User.findByPk(req.params.id);
      return res.status(HTTPStatusCodes.OK).json(user);
    } catch (error) {
      res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json(error);
    } finally {
      console.log('LOG: userController.show ended');
    }
  },

  async update(req: Request, res: Response) {
    console.log('LOG: userController.update started');
    try {
      const user = await User.update(req.body, {
        where: { id: req.params.id },
      });
      return res.status(HTTPStatusCodes.OK).json(user);
    } catch (error) {
      res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json(error);
    } finally {
      console.log('LOG: userController.update ended');
    }
  },

  async destroy(req: Request, res: Response) {
    console.log('LOG: userController.destroy started');
    try {
      const user = await User.destroy({
        where: { id: req.params.id },
      });
      return res.status(HTTPStatusCodes.OK).json(user);
    } catch (error) {
      res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json(error);
    } finally {
      console.log('LOG: userController.destroy ended');
    }
  },

  async findAll(req: Request, res: Response) {
    console.log('LOG: userController.findAll started');
    try {
      const users = await User.findAll() || [];
      return res.status(HTTPStatusCodes.OK).json(users);
    } catch (error) {
      res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json(error);
    } finally {
      console.log('LOG: userController.findAll ended');
    }
  },
};
