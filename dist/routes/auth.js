"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/routes/auth.ts
var import_express = __toESM(require("express"));

// src/models/User.ts
var import_sequelize = require("sequelize");
var User = class _User extends import_sequelize.Model {
  static initModel(sequelize) {
    return _User.init({
      name: import_sequelize.DataTypes.STRING,
      email: import_sequelize.DataTypes.STRING,
      password: import_sequelize.DataTypes.STRING
    }, {
      sequelize,
      modelName: "User"
    });
  }
};

// src/controllers/authController.ts
var import_dotenv = require("dotenv");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var authController = {
  async findUser(email, password) {
    return await User.findOne({ where: { email, password } });
  },
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await this.findUser(email, password);
      if (!user) {
        throw new Error("User not found");
      }
      const token = jwt.sign({ id: user.get("id") }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  async validateToken(req, res) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return false;
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
};

// src/routes/auth.ts
var router = import_express.default.Router();
router.post("/login", async (req, res) => {
  try {
    return await authController.login(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});
module.exports = router;
