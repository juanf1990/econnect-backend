//importing modules
const express = require("express");
const userController = require("../Controllers/userController");
const { post } = postController;
const userAuth = require("../Middleware/userAuth");

const router = express.Router();

//post endpoint
//passing the middleware function to the post
router.post("/post", userAuth.savePost, post);

module.exports = router;
