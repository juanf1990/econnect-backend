//importing modules
const express = require("express");
const userController = require("../Controllers/userController");
const { signup, login } = userController;
const userAuth = require("../Middleware/userAuth");

const router = express.Router();

//signup endpoint
//passing the middleware function to the signup
router.post("/signup", userAuth.saveUser, signup);

//login endpoint
//passing the middleware function to the login
router.post("/login", userAuth.login, login);

module.exports = router;
