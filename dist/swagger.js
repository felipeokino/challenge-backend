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

// src/swagger.ts
var swagger_exports = {};
__export(swagger_exports, {
  swaggerSpec: () => swaggerSpec
});
module.exports = __toCommonJS(swagger_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  swaggerSpec
});
