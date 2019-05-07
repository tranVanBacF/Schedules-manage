const express = require('express');
const bcrytjs = require('bcryptjs');
const UserModel = require('../users/models');

const authRouter = express();

/* register user */
authRouter.post('/register', async (req, res) => {

    try {

        /* get userInfo from body of request */
        const userInfo = req.body.userInfo;

        console.log(userInfo);


        /* check email is valid */
        const isValid = /^[A-Za-z]\w+@\w+(\.[a-zA-Z0-9]{1,})+$/.test(userInfo.email);

        if (!isValid) {

            res.status(200).json({
                success: false,
                message: 'Email not isValid',

            })

            return;
        }


        /* check user exist or not */
        const isExist = await UserModel.findOne({
            email: userInfo.email,
        }).exec();


        if (!isExist) {

            /* encode password */
            const hashPassword = await bcrytjs.hash(userInfo.password, 10);

            /* create new user */
            const newUser = await UserModel.create({
                ...userInfo,
                password: hashPassword,
            })

            /* send result to client */
            res.status(200).json({
                success: true,
                message:'Register success',
                newUser,
            })

        } else {

            /* send email exist */
            res.status(200).json({
                success: false,
                message: 'Email exist'

            })

        }

    } catch (error) {
        res.status(500).end(error.message || "Internal server error");
    }

})


/* login */
authRouter.post('/login', async (req, res) => {

    try {
        console.log(12323)

        const loginInfo = req.body.loginInfo;

        /* check email is valid */
        const isValid = /^[A-Za-z]\w+@\w+(\.[a-zA-Z0-9]{1,})+$/.test(loginInfo.email);

        if (!isValid) {

            res.status(200).json({
                success: false,
                message: 'Email not isValid',
            })

            return;
        }

        /* check user exist */
        const user = await UserModel.findOne({
            email: loginInfo.email
        }).exec();

        if (!user) {

            res.status(200).json({
                message: 'User not found',
                success: false,
            })

        }
        else {

            /* check password */
            const comparePassword = await bcrytjs.compare(loginInfo.password, user.password);

            /* correct */
            if (comparePassword) {

                /* save session storage */
                req.session.user = {
                    _id: user._id,
                    email: user.email,
                    permissions: user.permissions || [],
                }

                req.session.save();

                res.status(200).json({
                    success: true,
                    message: 'Login Sucess',
                })

            }
            else {

                /* password is wrong */
                res.status(200).json({
                    message: 'password is not correct',
                    success: false,
                })

            }

        }

    } catch (error) {
        res.status(500).end(error.message||"internal server error");
    }

})

/* Logout */
authRouter.get('/logout',async ()=>{

    try {
        
        req.session.destroy();
        res.status(200).json({
            message:'log out success',
            success:true,
        })

    } catch (error) {
        res.status(500).end(error.message||"internal server error");
    }

})

module.exports = authRouter;