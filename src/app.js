const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const loginRouter = require("./routes/login");
const userRouter = require("./routes/user");

app.use(cookieParser());
app.use(express.json());

app.use("/", loginRouter);
app.use("/", userRouter);

app.listen(3000);
