const express = require("express");
const userRouter = express.Router();

userRouter.get("/user/view", (req, res) => {
  res.send("User Router Response");
});

userRouter.patch("/user/edit/profile", (req, res) => {
  res.send("User Router Response");
});

userRouter.patch("/user/edit/password", (req, res) => {
  res.send("User Router Response");
});

userRouter.delete("/user/delete", (req, res) => {
  res.send("User Router Response");
});

module.exports = userRouter;
