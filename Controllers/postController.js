//importing modules
const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// Assigning users to the variable User
const Post = db.posts;

//posting a post
const post = async (req, res) => {
  try {
    const { imgUrl, text, userId, readBy } = req.body;
    const data = {
      imgUrl,
      text,
      userId,
      readBy,
    };
    //saving the post
    const post = await Post.create(data);
  } catch (error) {
    console.log(error);
  }
};

//getting all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  post,
  getPosts,
};
