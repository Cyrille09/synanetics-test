const User = require('../models/userModel');
const Product = require('../models/productModel');
const Basket = require('../models/basketModel');

/**
 * Delete users
 */
async function CascadeDeleteUser(id) {
  const userId = await User.findById(id);

  if (!userId) {
    return null;
  }

  // Delete cascade basket
  await Basket.deleteMany({ product: userId._id });

  //Update cascade product
  await Product.updateMany(
    {
      user: userId._id,
    },
    {
      user: undefined,
    }
  );

  return userId;
}
module.exports.CascadeDeleteUser = CascadeDeleteUser;

/**
 * Delete product
 */
async function CascadeDeleteProduct(id) {
  const productId = await Product.findById(id);

  if (!productId) {
    return null;
  }

  // Delete cascade basket
  await Basket.deleteMany({ product: productId._id });

  return productId;
}
module.exports.CascadeDeleteProduct = CascadeDeleteProduct;

/**
 * Delete basket
 */
async function CascadeDeleteBasket(id) {
  const basketId = await Basket.findById(id);

  if (!basketId) {
    return null;
  }
  return basketId;
}
module.exports.CascadeDeleteBasket = CascadeDeleteBasket;
