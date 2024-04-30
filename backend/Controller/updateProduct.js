const uploadProductPermission = require("../helpers/Permission")

const productModel = require("../models/productModel")

async function updateProductController(req, res) {
    try {

        sessionUserId = req.userId
        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("permisssion denied")
        }

        const { _id, ...resBody } = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.json({
            message: "successfully updated",
            data: updateProduct,
            success: true,
            error: false,
        })

    }
    catch (err) {

        res.status(401).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = updateProductController