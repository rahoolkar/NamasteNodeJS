const express = require("express");

const app = express();

app.listen(3000);

app.get("/user", (req, res) => {
  res.send({ name: "rahul kar", age: 24 });
});

app.post("/user/:uid", (req, res) => {
  res.send("Data added successfully ->"+req.params.uid);
});

app.delete("/user/:uid", (req, res) => {
  const id = req.params.uid;
  res.send("user deleted ->"+id);
});

app.use("/", (req, res) => {
  res.send("meow meow ghop ghop");
});
