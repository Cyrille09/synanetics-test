const Product = require('../models/productModel');

/**
 * Fetch product by ID
 */
async function getProductById(id) {
  const product = await Product.findById(id);
  if (!product) {
    return null;
  }
  return product;
}
module.exports.getProductById = getProductById;

/**
 * Find product by ID and update
 */
async function updateProductById(id, updates) {
  const product = await Product.findByIdAndUpdate(id, updates, { new: true });
  if (!product) {
    return null;
  }
  return product;
}
module.exports.updateProductById = updateProductById;
