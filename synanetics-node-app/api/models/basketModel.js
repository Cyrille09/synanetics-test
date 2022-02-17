const mongoose = require('mongoose');

// Basket schema
const basketSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      trim: true,
      required: true,
      default: 1,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Basket = mongoose.model('Basket', basketSchema);

module.exports = Basket;
