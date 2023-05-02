const express = require("express");
const app = express();
require("dotenv").config();
const { connection } = require("./config/db");
const { userModel } = require("./model/userModel");
const { userRouter } = require('./routes/userRoutes');
const { postRouter } = require('./routes/postRoutes');
const bcrypt = require("bcrypt");

app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).send(`Api Working Fine`);
});

app.post("/api/register/", async (req, res) => {
  let { name, email, password, dob, bio, posts, friends, friendRequests } =
    req.body;
  try {
    bcrypt.hash(password, +process.env.sRound, async (err, hash) => {
      if (err) {
        console.log(err.message);
      } else {
        let data = new userModel({
          name,
          email,
          password: hash,
          dob,
          bio,
          posts,
          friends,
          friendRequests,
        });
        await data.save();
        res.status(201).send(`User Registered Sucessfully`);
      }
    });
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});


app.use("/api/users",userRouter)
app.use("/api/posts",postRouter)


app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected To DB");
  } catch (error) {
    console.log(error.message);
  }
  console.log(`Server Running at ${process.env.port}`);
});

