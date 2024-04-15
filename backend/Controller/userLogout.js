async function userLogoutController(req, res) {
    try {
        res.clearCookie("token")

        res.json({
            message: "Logout successfully",
            success: true,
            error: false,
            data: [],
        })
    }
    catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }

}

module.exports = userLogoutController 