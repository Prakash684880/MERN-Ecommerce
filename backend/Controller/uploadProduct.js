const uploadProductPermission = require("../helpers/Permission")
const productModel = require("../models/productModel")

async function uploadProductController(req, res) {
    try {

        const sessionUserId = req.UserId

        if (!uploadProductPermission(sessionUserId)) {
            throw new ERROR("Permission Denied")
        }

        const UploadProduct = new productModel(req.body)
        const saveProduct = await UploadProduct.save()

        res.status(201).json({
            message: "successfully uploaded",
            error: false,
            success: true,
            data: saveProduct,
        })

    }
    catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })

    }
}

module.exports = uploadProductController