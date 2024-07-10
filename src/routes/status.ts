const express = require("express");
const router = express.Router();

router.get("/", function (req: any, res: any) {
  res.json({ message: "Server working normally" });
});

module.exports = router;
