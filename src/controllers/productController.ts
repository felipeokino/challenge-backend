import { Response, Request } from 'express';
import Product from '../models/ProductModel';
import { Op } from 'sequelize';
import { HTTPStatusCodes } from '../utils';

const productController = {
  async store(req: Request, res: Response) {
    console.log('LOG: productController.store started');
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const productCreated = await Product.create({ name, description, price });
      res.status(HTTPStatusCodes.CREATED).json({ data: productCreated });
    } catch (error) {
      res.status(HTTPStatusCodes.BAD_REQUEST).json(error);
    } finally {
      console.log('LOG: productController.store ended');
    }
  },
  async show(req: Request, res: Response) {
    console.log('LOG: productController.show started');
    const productId = req.params.id;
    try {
      const product = await Product.findByPk(productId);

      if (product) {
        res.status(HTTPStatusCodes.OK).json({ data: product });
      } else {
        res.status(HTTPStatusCodes.NOT_FOUND).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json(error);
    } finally {
      console.log('LOG: productController.show ended');
    }
  },
  async update(req: Request, res: Response) {
    console.log('LOG: productController.update started');
    const productId = req.params.id;
    const { name, description, price } = req.body;

    try {
      const product = await Product.findByPk(productId);
      if (!product)
        return res.status(404).json({ message: 'Product not found' });

      const productUpdated = await Product.update({ name, description, price }, {
        where: { id: productId },
      });
      if (!productUpdated)
        return res.status(HTTPStatusCodes.NOT_FOUND).json({ message: 'Product not found' });

      res.status(HTTPStatusCodes.OK).json({ data:'Product updated successfully' });
    } catch (error) {
      res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json(error);
    } finally {
      console.log('LOG: productController.update ended');
    }
  },
  async delete(req: Request, res: Response) {
    console.log('LOG: productController.delete started');
    const productId = req.params.id;
    try {
      const productDeleted = await Product.update({ deletedAt: new Date() }, {
        where: {
          id: productId,
        },
      });
      if (!productDeleted)
        return res.status(HTTPStatusCodes.NOT_FOUND).json({ message: 'Product not found' });

      res.status(HTTPStatusCodes.OK).json({ data: 'Product deleted successfully' });
    } catch (error) {
      res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json(error);
    } finally {
      console.log('LOG: productController.delete ended');
    }
  },
  async findAll(req: Request, res: Response) {
    console.log('LOG: productController.findAll started');
    const { deleted = false } = req.query as { deleted?: boolean; };
    try {
      const products = await Product.findAll({
        where: deleted ? { deletedAt: { [Op.not]: null } } : { deletedAt: null },
        order: [['id', 'ASC']],
      }) || [];
      return res.status(HTTPStatusCodes.OK).json({ products, total: products.length });
    } catch (error) {
      res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json(error);
    } finally {
      console.log('LOG: productController.findAll ended');
    }
  }
};

export default productController;
