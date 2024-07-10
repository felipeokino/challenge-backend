"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/config/database.js
var require_database = __commonJS({
  "src/config/database.js"(exports2, module2) {
    "use strict";
    require("dotenv").config();
    module2.exports = {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      url: process.env.POSTGRES_URL,
      host: process.env.POSTGRES_HOST,
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: true
      },
      define: {
        timestamps: true,
        underscored: false
      }
    };
  }
});

// src/database/index.ts
var import_sequelize2 = require("sequelize");

// src/models/User.ts
var import_sequelize = require("sequelize");
var User = class _User extends import_sequelize.Model {
  static initModel(sequelize2) {
    return _User.init({
      name: import_sequelize.DataTypes.STRING,
      email: import_sequelize.DataTypes.STRING,
      password: import_sequelize.DataTypes.STRING
    }, {
      sequelize: sequelize2,
      modelName: "User"
    });
  }
};

// src/database/index.ts
var database = require_database();
var sequelize = new import_sequelize2.Sequelize(database);
sequelize.authenticate();
var user = User.initModel(sequelize);
user.sync();
module.exports = sequelize;
