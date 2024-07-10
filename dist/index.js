"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// src/models/User.ts
var import_sequelize, User;
var init_User = __esm({
  "src/models/User.ts"() {
    "use strict";
    import_sequelize = require("sequelize");
    User = class _User extends import_sequelize.Model {
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
  }
});

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
var require_database2 = __commonJS({
  "src/database/index.ts"(exports2, module2) {
    "use strict";
    var import_sequelize2 = require("sequelize");
    init_User();
    var database = require_database();
    var sequelize = new import_sequelize2.Sequelize(database);
    sequelize.authenticate();
    var user = User.initModel(sequelize);
    user.sync();
    module2.exports = sequelize;
  }
});

// src/routes/challenge.ts
var require_challenge = __commonJS({
  "src/routes/challenge.ts"(exports2, module2) {
    "use strict";
    var express2 = require("express");
    var router = express2.Router();
    router.get("/", function(req, res) {
      res.send("Wiki home page");
    });
    router.post("/user", function(req, res) {
      res.send("About this wiki");
    });
    module2.exports = router;
  }
});

// src/controllers/userController.ts
var userController;
var init_userController = __esm({
  "src/controllers/userController.ts"() {
    "use strict";
    init_User();
    userController = {
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
  }
});

// src/controllers/authController.ts
var import_dotenv, bcrypt, jwt, authController;
var init_authController = __esm({
  "src/controllers/authController.ts"() {
    "use strict";
    init_User();
    import_dotenv = require("dotenv");
    bcrypt = require("bcrypt");
    jwt = require("jsonwebtoken");
    authController = {
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
  }
});

// src/middleware/authMiddleware.ts
var authMiddleware, authMiddleware_default;
var init_authMiddleware = __esm({
  "src/middleware/authMiddleware.ts"() {
    "use strict";
    init_authController();
    authMiddleware = async (req, res, next) => {
      const isAuthenticated = await authController.validateToken(req, res);
      if (!isAuthenticated) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      next();
    };
    authMiddleware_default = authMiddleware;
  }
});

// src/routes/user.ts
var require_user = __commonJS({
  "src/routes/user.ts"(exports2, module2) {
    "use strict";
    var import_express2 = __toESM(require("express"));
    init_User();
    init_userController();
    init_authController();
    init_authMiddleware();
    var router = import_express2.default.Router();
    router.get("/", async (req, res) => {
      try {
        await userController.findAll(req, res);
      } catch (error) {
        res.status(500).json({ message: "Error retrieving users" });
      }
    });
    router.post("/", async (req, res) => {
      try {
        await userController.store(req, res);
      } catch (error) {
        res.status(500).json({ message: "Error creating user" });
      }
    });
    router.get("/:id", authMiddleware_default, async (req, res) => {
      try {
        await User.findByPk(req.params.id);
      } catch (error) {
        res.status(500).json({ message: "Error retrieving user" });
      }
    });
    router.put("/:id", async (req, res) => {
      try {
        await userController.update(req, res);
      } catch (error) {
        res.status(500).json({ message: "Error updating user" });
      }
    });
    router.delete("/:id", authController.validateToken, async (req, res) => {
      try {
        await userController.destroy(req, res);
      } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
      }
    });
    module2.exports = router;
  }
});

// src/routes/auth.ts
var require_auth = __commonJS({
  "src/routes/auth.ts"(exports2, module2) {
    "use strict";
    var import_express2 = __toESM(require("express"));
    init_authController();
    var router = import_express2.default.Router();
    router.post("/login", async (req, res) => {
      try {
        return await authController.login(req, res);
      } catch (error) {
        res.status(500).json({ message: "Error logging in" });
      }
    });
    module2.exports = router;
  }
});

// src/swagger.ts
var swaggerJSDoc = require("swagger-jsdoc");
var swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Challenge API",
      version: "1.0.0",
      description: "This is the API for the challenge"
    },
    servers: [
      {
        url: "http://localhost:3000/api"
      }
    ]
  },
  apis: ["./src/routes/*.ts"]
});

// src/index.ts
var import_express = __toESM(require("express"));
var import_swagger_ui_express = __toESM(require("swagger-ui-express"));
var import_cors = __toESM(require("cors"));
var import_dotenv2 = __toESM(require("dotenv"));
var import_database = __toESM(require_database2());
import_dotenv2.default.config();
var app = (0, import_express.default)();
app.use((0, import_cors.default)());
app.use(import_express.default.json());
app.use("/api-docs", import_swagger_ui_express.default.serve, import_swagger_ui_express.default.setup(swaggerSpec));
app.use("/api", require_challenge());
app.use("/api/users", require_user());
app.use("/api", require_auth());
app.use("/", require_challenge());
app.listen(3e3, () => {
  console.log("Server is running on port 3000");
});
module.exports = app;
