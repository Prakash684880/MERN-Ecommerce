const userModel = require('../models/userModel');

async function userDetailController(req, res) {

    try {
        console.log("userId", req.userId)
        const user = await userModel.findById(req.userId)

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User details"
        })

        console.log("user", user)

    }
    catch (err) {
        console.log("error:", err.message)
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userDetailController