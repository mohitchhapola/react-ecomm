const express = require('express')
const { fetchCartByUser, addToCart, deleteItemFromCart, updateCart } = require('../controllers/cart')
const router = express.Router()

router.get('/cart',fetchCartByUser)
router.post('/cart/addToCart',addToCart)
router.delete('/cart/deleteItem',deleteItemFromCart)
router.patch('/cart/update/:id',updateCart)

exports.router = router;