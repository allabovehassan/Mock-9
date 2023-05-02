const express = require('express');
const { userModel } = require('../model/userModel');
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    try {
        let data = await userModel.find();
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send({message:error.message})
    }
})


userRouter.post("/:id/friends", async (req, res) => {
    let ID = req.params.id
    try {
        let data = await userModel.findById({ _id: ID });
        
    } catch (error) {
        
    }
})

module.exports = { userRouter };