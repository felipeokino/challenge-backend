import express, { Request, Response } from 'express';
import User from '../models/User';
import { userController } from '../controllers/userController';
import { authController } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Get all users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The id of the user
 *                   email:
 *                     type: string
 *                     description: The email of the user
 *                   password:
 *                     type: string
 *                     description: The password of the user
 *                   createdAt:
 *                     type: string
 *                     description: The date and time the user was created
 *                   updatedAt:
 *                     type: string
 *                     description: The date and time the user was updated
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    await userController.findAll(req, res);
  } catch (error) {
    console.log('error');
    // res.status(500).json({ message: 'Error retrieving users' });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     description: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               name:
 *                   type: string
 *                   description: The password of the user
 *     responses:
 *       200:
 *         description: Successfully created user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The id of the user
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                 email:
 *                   type: string
 *                   description: The email of the user
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */

router.post('/', async (req: Request, res: Response) => {
  try {
     await userController.store(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     description: Get a user by id
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The id of the user
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                 email:
 *                   type: string
 *                   description: The email of the user
 *                 createdAt:
 *                   type: string
 *                   description: The date and time the user was created
 *                 updatedAt:
 *                   type: string
 *                   description: The date and time the user was updated
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */
router.get('/:id', authMiddleware,  async (req: Request, res: Response) => {
  try {
     await User.findByPk(req.params.id);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     description: Update a user by id
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *     responses:
 *       200:
 *         description: Successfully updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The id of the user
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                 email:
 *                   type: string
 *                   description: The email of the user
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
     await userController.update(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     description: Delete a user by id
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the user
 *     responses:
 *       200:
 *         description: Successfully deleted user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The id of the user
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                 email:
 *                   type: string
 *                   description: The email of the user
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message 
 */
router.delete('/:id', authController.validateToken, async (req: Request, res: Response) => {
  try {
     await userController.destroy(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
