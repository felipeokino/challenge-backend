"use strict";

// src/routes/challenge.ts
var express = require("express");
var router = express.Router();
router.get("/", function(req, res) {
  res.send("Wiki home page");
});
router.post("/user", function(req, res) {
  res.send("About this wiki");
});
module.exports = router;
