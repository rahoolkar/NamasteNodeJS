const express = require("express");
const app = express();

const main = require("./config/database");

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
