"use strict";

// src/config/database.js
require("dotenv").config();
module.exports = {
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
