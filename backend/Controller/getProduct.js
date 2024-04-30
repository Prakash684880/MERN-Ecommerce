const productModel = require("../models/productModel")

async function getAllProductController(req, res) {
    try {

        const allproduct = await productModel.find().sort({ createdAt: -1 })

        res.json({
            message: "all product",
            success: true,
            error: false,
            data: allproduct,
        })

    } catch (err) {
        res.statu(401).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = getAllProductController