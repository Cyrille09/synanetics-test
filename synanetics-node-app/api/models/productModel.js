const mongoose = require('mongoose');

// Product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    discount: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
    },
    currentPrice: {
      type: Number,
    },
    productImage: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
