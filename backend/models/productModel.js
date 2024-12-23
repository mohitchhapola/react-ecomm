const mongoose = require('mongoose');

const colorSchema = mongoose.Schema({
  name: { type: String, required: true },
  selected: { type: Boolean, required: true, default: false }
});

const sizeSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  inStock: { type: Boolean, required: true, default: false }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  href: { type: String, required: true },
  imageSrc: { type: String, required: true },
  imageAlt: { type: String, required: true },
  colors: [colorSchema],
  size: [sizeSchema],
  price: { type: Number, min: [10, 'Enter Price above 10'], max: [10000, 'Enter Price below 10000'] },
  rating: { type: Number, min: [0, 'Wrong min rating'], max: [5, 'Wrong max rating'], default: 0 },
  details: { type: String, required: true },
  highlight: { type: [String], required: true }
});

productSchema.virtual('id').get(function() {
  return this._id;
});

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
  }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
