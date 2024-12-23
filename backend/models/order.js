const mongoose = require("mongoose")
const {Schema} = mongoose;
const orderSchema = mongoose.Schema({
    items : {type:[Schema.Types.Mixed], required:true},
    totalAmount:{type:Number},
    user :{
        type:Schema.Types.ObjectId, ref:'user', required:true
    },
    paymentMethod:{type: String, required:true},
    status:{type:String , default: 'pending'},
    selectAddress:{
        type:[Schema.Types.Mixed], required: true}
})

const Order = mongoose.model('Order',orderSchema)
module.exports = Order;