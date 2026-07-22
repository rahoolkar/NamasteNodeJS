const express = require("express");
const loginRouter = express.Router();

loginRouter.post("/login", (req, res) => {
  res.send("Login Router Response");
});

loginRouter.post("/logout", (req, res) => {
  res.send("Login Router Response");
});

loginRouter.post("/signup", (req, res) => {
  res.send("Login Router Response");
});

module.exports = loginRouter;
