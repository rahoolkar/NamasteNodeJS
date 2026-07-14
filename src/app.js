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

  try {
    await userLogined.save();
    res.send("User saved in the database");
  } catch (error) {
    res.status(400).send("Error occured while saving user to the database");
  }
});
