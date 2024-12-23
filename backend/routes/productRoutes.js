const {fetchProductById, updateProductById, fetchAllProducts, createProduct} = require("../controllers/product")
const express = require("express")
const router = express.Router()

router.get("/products", fetchAllProducts),
router.get("/products/:id", fetchProductById),
router.patch("/products/:id", updateProductById)
router.post('/product',createProduct)
module.exports = router;
