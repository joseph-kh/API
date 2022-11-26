const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

// Create a new a new user
router.post("/register", userController.registerUser);

// Login in user
router.post("/login", userController.loginUser);

module.exports = router;
