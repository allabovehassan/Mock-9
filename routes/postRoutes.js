const express = require("express");
const postRouter = express.Router();

require("dotenv").config();

const { postModel } = require("../model/postModel");

postRouter.get("/", async (req, res) => {
  try {
    let postdata = await postModel.find();
    res.send(postdata);
  } catch (error) {
    res.send({ message: error.message });
  }
});

postRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const postCreateData = await new postModel(payload);
    await postCreateData.save();
    res.send({ message: "Post Created" });
  } catch (error) {
    res.send({ message: "Error while creating" });
    console.log({ message: error.message });
  }
});

postRouter.patch("/:id", async (req, res) => {
  let payload = req.body;
  let ID = req.params.id;
  try {
    await postModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send({ message: "Post Updated" });
  } catch (error) {
    console.log("Error");
    res.send({ message: error.message });
  }
});

postRouter.delete("/:id", async (req, res) => {
  let ID = req.params.id;
  try {
    await postModel.findByIdAndDelete({ _id: ID });
    res.send({ message: "Post Deleted" });
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = { postRouter };
