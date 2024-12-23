const mongoose = require("mongoose")
const {Schema} = mongoose

const cartSchema = mongoose.Schema({
    quantity: { type: Number, required: true },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product', // Refers to the Product model
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user', // Refers to the User model
      required: true
    },
    color1: { type: String },
    size1: { type: String }
  });
  

const virtual  = cartSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
cartSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

const Cart = mongoose.model('Cart',cartSchema)
module.exports = Cart;