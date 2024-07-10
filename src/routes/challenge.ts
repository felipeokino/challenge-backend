const express = require("express");
const router = express.Router();

router.get("/", function (req: any, res: any) {
  res.send("Wiki home page");
});

router.post("/user", function (req: any, res: any) {
  res.send("About this wiki");
});

module.exports = router;
