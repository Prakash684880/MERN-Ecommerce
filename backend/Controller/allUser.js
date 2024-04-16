const userModel = require("../models/userModel")

async function allUser(req, res) {

    try {
        console.log("all user", req.userId)

        const allUser = await userModel.find()

        res.status(401).json({
            message: "All Users",
            success: true,
            error: false,
            data: allUser,
        })
    }
    catch (err) {
        console.log("error:", err.message)
        res.json({
            message: err.message || err,
            success: false,
            error: true,
        })
    }
}

module.exports = allUser