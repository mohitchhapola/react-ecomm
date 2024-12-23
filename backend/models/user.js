const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
// const addressSchema = require('./addressModel');

// Define user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  addresses: { type: [Schema.Types.Mixed] },  // Embed the address schema
  orders: { type: [mongoose.Schema.Types.Mixed], default: [] },
  salt: { type: Buffer }, // If you use password hashing
});

// Virtual for user ID
userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Modify JSON output
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password; // Remove password from the response
    delete ret.salt; // Remove salt from the response
  },
});

// Generate auth token for user
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
