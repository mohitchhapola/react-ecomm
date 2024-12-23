const Order = require("../models/order")



const fetchOrderByUser = async (req, res) => {
    const { userId } = req.query;

    try {
        const orders = await Order.find({ 'id': userId });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Orders not found' });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchAllOrder = async(req,res)=>{
    try {
        const order = await Order.find({})
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json(error)
    }
}


const addOrder = async(req,res)=>{
    const data = new Order(req.body);
    console.log(data)
    try {
       const doc = await data.save();
        res.status(200).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}



module.exports = {
    fetchOrderByUser,
    fetchAllOrder,
    addOrder
}