const express = require("express")
const { fetchOrderByUser, fetchAllOrder, addOrder } = require("../controllers/order")
const router = express.Router()


router.get("/orders/:id",fetchOrderByUser),
router.get("/orders",fetchAllOrder),
router.post("/orders/addOrder",addOrder)

module.exports = router;