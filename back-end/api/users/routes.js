const express = require('express');
const UserModel = require('./models');

const userRouter = express();

/* create user */
userRouter.post("/", async (req, res) => {
    try {

        /* get user from body of request */
        const userInfo = req.body;

        /* check user exist or not */
        const existEmail = await UserModel.findOne({
            email: userInfo.email,
        }).exec();

        if (existEmail) {

        } else {
            const newUser =  await UserModel.create(userInfo);
        }

    } catch (error) {
        res.status(500).end(error.message || "Internal server error");
    }
})