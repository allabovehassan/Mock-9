const express = require("express");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [],
    friends: [],
    friendRequests: [],
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("UserModel", userSchema);

module.exports = { userModel };