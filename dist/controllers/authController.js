"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/authController.ts
var authController_exports = {};
__export(authController_exports, {
  authController: () => authController
});
module.exports = __toCommonJS(authController_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authController
});
