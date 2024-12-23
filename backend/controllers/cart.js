const mongoose = require('mongoose');
const Cart = require('../models/cart'); // Adjust the path as necessary

const fetchCartByUser = async (req, res) => {
  const { user } = req.query;
  // console.log(user)
  try {
    
    const cartItems = await Cart.find({ user: user }).populate('product');

    res.status(200).json(cartItems);
  } catch (err) {
    
    res.status(400).json(err);
  }
};


const deleteItemFromCart = async (req, res) => {
  const { id } = req.query;
  // console.log('ID received:', id);

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    // Convert the string ID to an ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    const doc = await Cart.findByIdAndDelete(objectId);

    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // console.log('Deleted document:', doc);
    res.status(200).json(doc);
  } catch (err) {
    console.error('Error deleting document:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const addToCart = async (req, res) => {
  try {
    // Destructure the fields from the request body
    const { quantity, product, user, color1, size1 } = req.body;

    // console.log(req.body)
    // console.log(user)

    // Validate that 'product' and 'user' are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(product)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Create a new Cart document
    const newCartItem = new Cart({
      quantity,
      product,  
      user,     
      color1,
      size1,
    });

    // Save the new cart item
    await newCartItem.save();

    // Send the newly created cart item as the response
    res.status(201).json(newCartItem);
  } catch (error) {
    // Handle errors (e.g., validation or database issues)
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateCart = async(req,res)=>{
  const {id} = req.params;
  try {
    const doc = await Cart.findByIdAndUpdate(id , req.body , {new:true});
    const result = await doc.populate('product')
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error)
  }
}
module.exports = {
    fetchCartByUser,
    addToCart,
    deleteItemFromCart,
    updateCart
  };
