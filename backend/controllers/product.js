// const {products} = require("../models/product")
// const mongoose = require("mongoose")
const Product = require('../models/productModel')

// console.log(Product)
const createProduct = async (req, res) => {
    const data = req.body;
    try {
      const product = new Product(data); // Create a new product instance
      const savedProduct = await product.save(); // Save the new product
      res.status(200).json(savedProduct); // Send response with saved product
    //   console.log('saved')
    } catch (error) {
    //   console.error(error); // Log the error for debugging
      res.status(400).json({ message: "Error creating product" }); // Send a user-friendly error message
    }
  };
  
const fetchProductById = async(req,res)=>{
    const {id} = req.params;
    try {
        // console.log(typeof(id))
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (err) {
        // console.log(err)
        res.status(400).json(err)
    }
}

const fetchAllProducts = async(req,res)=>{
    try {
        const product = await Product.find({})
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json(error)        
    }
}


const updateProductById = async (req, res) => {
    const {id}  = req.params;
    const update = req.body;

    // Check if the id is a valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({ error: "Invalid ID format" });
    // }

    try {
        const product = await Product.findOneAndUpdate(id , update, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




module.exports = {
    fetchProductById,
    updateProductById,
    fetchAllProducts,
    createProduct
}