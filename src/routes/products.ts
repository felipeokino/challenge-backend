import { Router } from 'express';
import productController from '../controllers/productController';
import authMiddleware from '../middleware/authMiddleware';

const productsRouter = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                 total:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Unauthorized
 *       500:
 *         description: Error retrieving products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Error retrieving products
 *   /products:
 *     post:
 *       summary: Create a new product
 *       tags:
 *         - Products
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Name of the product
 *                   example: iPhone 12
 *                 description:
 *                   type: string
 *                   description: Description of the product
 *                   example: The latest iPhone model
 *                 price:
 *                   type: number
 *                   description: Price of the product
 *                   example: 999.99
 *       responses:
 *         201:
 *           description: Product created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                 example:
 *                   data:
 *                     id: 1
 *                     name: iPhone 12
 *                     description: The latest iPhone model
 *                     price: 999.99
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Error message
 *                     example: Missing required fields
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Error message
 *                     example: Unauthorized
 *         500:
 *           description: Error creating product
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Error message
 *                     example: Error creating product
 
 
 
 */
productsRouter.get('/', authMiddleware, productController.findAll);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *                 example: iPhone 12
 *               description:
 *                 type: string
 *                 description: Description of the product
 *                 example: The latest iPhone model
 *               price:
 *                 type: number
 *                 description: Price of the product
 *                 example: 999.99
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *               example:
 *                 data:
 *                   id: 1
 *                   name: iPhone 12
 *                   description: The latest iPhone model
 *                   price: 999.99
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Missing required fields
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Unauthorized
 *       500:
 *         description: Error creating product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Error creating product
 */
productsRouter.post('/', authMiddleware, productController.store);

/**
 * @swagger
 * /products/{id}:
 *     get:
 *       summary: Get a product by ID
 *       tags:
 *         - Products
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true 
 *           schema:
*             type: integer              
 *       responses:
 *         200:
 *           description: Product found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                 example:
 *                   data:
 *                     id: 1
 *                     name: iPhone 12
 *                     description: The latest iPhone model
 *                     price: 999.99
 *         404:
 *           description: Not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Error message
 *                     example: Product not found
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Error message
 *                     example: Unauthorized
 *         500:
 *           description: Error retrieving product
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Error message
 *                     example: Error retrieving product
 */
productsRouter.get('/:id', authMiddleware, productController.show);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true 
 *         schema:
 *           type: integer              
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *                 example: iPhone 12
 *               description:
 *                 type: string
 *                 description: Description of the product
 *                 example: The latest iPhone model
 *               price:
 *                 type: number
 *                 description: Price of the product
 *                 example: 999.99
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Message
 *                   example: Product updated successfully
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Product not found
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Unauthorized
 *       500:
 *         description: Error updating product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Error updating product
 */             


/**
 * @swagger
 * /products/{id}:
 *     delete:
 *       summary: Delete a product by ID
 *       tags:
 *         - Products
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true 
 *           schema:
*             type: integer              
 *       responses:
 *         200:
 *           description: Product deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: string
 *                     description: Message
 *                     example: Product deleted successfully
 *         404:
 *           description: Not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Error message
 *                     example: Product not found
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Error message
 *                     example: Unauthorized
 *         500:
 *           description: Error deleting product
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Error message
 *                     example: Error deleting product
 * 
 */
productsRouter.delete('/:id', authMiddleware, productController.delete);

module.exports = productsRouter;
