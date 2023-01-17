//importing modules
const express = require("express");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Assigning db.users to User variable
const User = db.users;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveUser = async (req, res, next) => {
  //search the database to see if user exist
  try {
    const userCheck = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });
    //if username exist in the database respond with a status of 409
    if (userCheck) {
      return res.json(409).send("username already taken");
    }

    //checking if email already exist
    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    //if email exist in the database respond with a status of 409
    if (emailcheck) {
      return res.json(409).send("Email already taken");
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

// login auth
const login = async (req, res) => {
  try {
    //search the database to see if user exist
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    // if user exist in the database
    if (user) {
      //compare the password in the database with the password in the request body
      const valid = await bcrypt.compare(req.body.password, user.password);
      //if password is valid
      if (valid) {
        //generate token with the user's id and the secretKey in the env file
        // set cookie with the token generated
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        //send users details
        return res.status(201).send(user);
      } else {
        return res.status(409).send("Check your password");
      }
    } else {
      return res.status(409).send("Check your email");
    }
  } catch (error) {
    console.log(error);
  }
};

//exporting module
module.exports = {
  saveUser,
  login,
};
