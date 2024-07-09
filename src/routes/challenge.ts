const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/challenge:
 *   get:
 *     summary: Retrieve a list of anything
 *     description: Retrieve some list from anything. Can be used to populate a list of fake users when prototyping or testing an API.
*/
router.get("/", function (req: any, res: any) {
  res.send("Wiki home page");
});

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user. Can be used to create a new user when prototyping or testing an API.
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
 *                 description: The email address of the user
 *               phone:
 *                 type: string
 *                 description: The phone number of the user
 */
router.post("/user", function (req: any, res: any) {
  res.send("About this wiki");
});

module.exports = router;

