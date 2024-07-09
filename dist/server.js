"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

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

// src/server.ts
var express = require("express");
var swaggerUi = require("swagger-ui-express");
var swaggerJSDoc = require("swagger-jsdoc");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());
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
        url: "http://localhost:3000/"
      }
    ]
  },
  apis: ["./src/routes/*.ts"]
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", require_challenge());
app.listen(3e3, () => {
  console.log("Server is running on port 3000");
});
