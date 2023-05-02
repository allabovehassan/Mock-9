const express = require("express");
const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user: {},
    text: String,
    image: String,
    createdAt: Date,
    likes: [],
    comments: [],
  },
  {
    versionKey: false,
  }
);

const postModel = mongoose.model("PostModel", postSchema);

module.exports = { postModel };
