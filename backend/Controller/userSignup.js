const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
async function userSignUpController(req, res) {
    try {
        const { email, name, password } = req.body

        const user = await userModel.findOne({ email })

        if (user) {
            throw new Error("Already user Exists");
        }

        if (!email) {
            throw new Error('Please Provide Email')
        }
        if (!name) {
            throw new Error('Please Provide Name')
        }
        if (!password) {
            throw new Error('Please Provide Password')
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something is Wrong")
        }

        const payload = {
            ...req.body,
            role: "General",
            password: hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: 'successfully created User !!',
        })


    } catch (err) {
        console.log("error:", err.message)
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignUpController