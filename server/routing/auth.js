const express = require("express");
const router = express.Router();
const authController = require("../controller/authControllers");

console.log("🔐 Auth routes being loaded...");

router.post("/register", (req, res, next) => {
  console.log("📝 POST /register called");
  console.log("Body:", req.body);
  authController.register(req, res);
});

router.post("/login", (req, res, next) => {
  console.log("🔑 POST /login called");
  console.log("Body:", req.body);
  authController.login(req, res);
});
module.exports = router;
