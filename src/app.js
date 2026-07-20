const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

app.listen(3000);

app.post("/signup", (req, res) => {});

app.post("/login", async (req, res) => {
  try {
    const { emailIdFromUser: email, passwordFromUser: password } = req.body;

    const userToMatch = await User.find({ email: emailIdFromUser });

    const { password } = userToMatch;

    const isPasswordCorrect = await bcrypt.compare(passwordFromUser, password);

    if (isPasswordCorrect) {
      //create a jwt
      const token = await jwt.sign({ id: userToMatch._id }, "superserum");

      //wrap it inside a cookie and send it to client browser
      res.cookie("token", token);

      res.send("Welcome");
    } else {
      throw new Error("Please provide correct credentials");
    }
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token doesnot exists");
    }

    const dedcoded = await jwt.verify(token, "superserum");

    const { id } = dedcoded;

    const userToFetchProfile = await User.findById(id);

    if (!userToFetchProfile) {
      throw new Error("User doesnot exists");
    }

    res.send(userToFetchProfile);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});
