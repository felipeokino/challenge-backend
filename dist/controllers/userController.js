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

// src/controllers/userController.ts
var userController_exports = {};
__export(userController_exports, {
  userController: () => userController
});
module.exports = __toCommonJS(userController_exports);

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

// src/controllers/userController.ts
var userController = {
  async store(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const userData = await User.create({ name, email, password });
    return res.status(201).json(userData);
  },
  async show(req, res) {
    const user = await User.findByPk(req.params.id);
    return res.status(200).json(user);
  },
  async update(req, res) {
    const user = await User.update(req.body, {
      where: { id: req.params.id }
    });
    return res.status(200).json(user);
  },
  async destroy(req, res) {
    const user = await User.destroy({
      where: { id: req.params.id }
    });
    return res.status(200).json(user);
  },
  async findAll(req, res) {
    const users = await User.findAll() || [];
    return res.status(200).json(users);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userController
});
