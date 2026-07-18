const express = require("express");
const app = express();
const main = require("./config/database");
const User = require("./models/user");

main()
  .then(() => {
    console.log("database connected successfully");
    app.listen(3000, () => {
      console.log("app is listening to the port 3000");
    });
  })
  .catch(() => {
    console.error("database connection cannot be established");
  });

app.post("/user", async (req, res) => {
  const userLogined = new User({
    firstName: "rahul",
    lastName: "kar",
    email: "rahul@gmail.com",
    password: "rahul@123",
  });

  app.get("/user", async (req, res) => {
    const mailId = req.body.email;

    try {
      const user = await User.findOne({ email: mailId });
      if (!user) {
        res.status(400).send("User not found");
      } else {
        res.send(user);
      }
    } catch (error) {
      res.status(400).send("Error occurred");
    }
  });

  app.get("/feed", async (req, res) => {
    try {
      const users = await User.find({});
      if (users.length == 0) {
        res.status(400).send("User not found");
      } else {
        res.send(users);
      }
    } catch (error) {
      res.status(400).send("Error occurred");
    }
  });

  try {
    await userLogined.save();
    res.send("User saved in the database");
  } catch (error) {
    res.status(400).send("Error occured while saving user to the database");
  }
});
