import {Response, Request} from 'express'
import Product from '../models/ProductModel'

const productController = {
  async store(req: Request, res: Response) {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const productCreated = await Product.create({ name, description, price });
      res.status(201).json({data: productCreated});
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async show(req: Request, res: Response) {
    const productId = req.params.id;
    try {
      const product = await Product.findByPk(productId);
      res.status(200).json({ data: product });
    } catch (error) {
      res.status(404).json(error);
    }
  },
  async update(req: Request, res: Response) {
    const productId = req.params.id;
    const { name, description, price } = req.body;

    try {
      const product = await Product.findByPk(productId);
      if (!product) 
        return res.status(404).json({ message: 'Product not found' });
      
      const productUpdated = await Product.update({ name, description, price }, {
        where: { id: productId },
      });
      res.status(200).json({data: productUpdated ? 'Product updated successfully' : 'Product not found'});
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async delete(req: Request, res: Response) {
    const productId = req.params.id;
    try {
      const productDeleted = await Product.destroy({
        where: {
          id: productId,
        },
      });
      res.status(200).json({data: productDeleted ? 'Product deleted successfully' : 'Product not found'});
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async findAll(req: Request, res: Response) {
    const products = await Product.findAll() || [];
    return res.status(200).json({ products, total: products.length });
  }
}

export default productController;
