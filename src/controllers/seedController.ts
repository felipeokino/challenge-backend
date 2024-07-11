import { Response, Request } from 'express';
import Product from '../models/ProductModel';
import { Op } from 'sequelize';
import sequelize from '../database';
import { HTTPStatusCodes } from '../utils';

function getRandomIncrement(max: number) {
  return Math.floor(Math.random() * max);
}

function updateProgress(progress: number, increment: number, max: number) {
  if (progress + increment > max) {
    return max - progress;
  }
  return increment;
}

const seedsController = {
  async seed(req: Request, res: Response) {
    try {
      await Product.bulkCreate(
        new Array(50).fill(0).map((_, i) => ({
          name: `Product ${i + 1}`,
          description: `Description of product ${i + 1}`,
          price: i + 1,
        }))
      );
      res.status(HTTPStatusCodes.OK).json({ message: 'Products seeded successfully' });
    } catch (error) {
      res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  async removeAllProducts(req: Request, res: Response) {
    console.log('LOG: removeAllProducts started');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    let chunks = 0;

    const productCount: number = await Product.max('id');

    const t = await sequelize.transaction();

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      while (chunks < productCount) {
        let increment = getRandomIncrement(10);
        increment = updateProgress(chunks, increment, productCount);
        chunks += increment;

        res.write(`${Math.round((chunks / productCount) * 100)} `);

        await Product.update({ deletedAt: new Date() }, { where: { id: { [Op.lt]: chunks + 1 }, deletedAt: { [Op.is]: null } }, silent: true, transaction: t });

        await sleep(10);
      }
    } catch (error) {
      await t.rollback();
      res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }

      await t.commit();
      console.log('LOG: removeAllProducts ended');
      res.end();
  },
};

export default seedsController;
