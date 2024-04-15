const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

async function userLoginController(req, res) {
    try {
        const { email, password } = req.body

        if (!email) {
            throw new Error('Please Provide Email')
        }
        if (!password) {
            throw new Error('Please Provide Password')
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            throw new Error("user not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        console.log("checkpassword", checkPassword)


        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 80 });


            const tokenOption = {
                httpOnly: true,
                secure: true,
            }

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false,
            })
        }
        else {
            throw new Error("Please check Password")
        }

    } catch (err) {

        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userLoginController