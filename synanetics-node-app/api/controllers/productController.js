require('dotenv').config();
const Product = require('../models/productModel');
const ProductService = require('../services/productService');
const { CascadeDeleteProduct } = require('../deleteCascade/deleteCascade');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlinkSync);

/**
 * GET: /api/synanetics/products
 * Returns all products
 */
async function getAllProducts(req, res, next) {
  try {
    const PER_PAGE = 10;
    const { status = 'active', page = 1 } = req.query;
    let products = [];

    // Build DB query
    let query = {};

    if (status) {
      query[`status`] = status;
    }
    // Count results
    const total = await Product.countDocuments(query);
    const originalProducts = await Product.find(query).populate(
      'user',
      'firstName lastName'
    );

    for (var product of originalProducts) {
      product.currentPrice = (product.price * product.discount) / 100;
      currentPrice = product.currentPrice =
        product.price - product.currentPrice;

      products.push(product);
    }
    res.status(200).json({ products, page, perPage: PER_PAGE, total });
  } catch (error) {
    next(error);
  }
}

/**
 * GET: /api/synanetics/products/:id
 * Returns a single product by ID
 */
async function getEachProduct(req, res, next) {
  try {
    const product = await ProductService.getProductById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, error: 'Product ID does not exist' });
    }

    res.status(200).json({ product });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ status: 404, error: 'Invalid ID' });
    }
    next(error);
    console.log(error);
  }
}

/**
 * POST: /api/synanetics/products
 * Add a new product and returns it response
 */
async function addProduct(req, res, next) {
  let newProduct = new Product(req.body);

  try {
    // Return error message
    let errorMessage = '';
    let { priceError, nameError, userError } = errorMessage;

    if (!req.body.user || !req.body.name || !req.body.price) {
      if (!req.body.name) {
        nameError = 'Required';
      }

      if (!req.body.user) {
        userError = 'Required';
      }
      if (!req.body.price) {
        priceError = 'Required';
      }
      return res.status(400).json({
        status: 400,
        nameError: nameError,
        userError: userError,
        priceError: priceError,
      });
    }

    // Save a product record
    if (req.file && req.file.filename) {
      newProduct.productImage = req.file.filename;
    } else {
      newProduct.productImage = undefined;
    }

    if (!newProduct.discount) {
      newProduct.discount = 0;
    }

    const product = await newProduct.save();

    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT: /api/synanetics/products/:id
 * Update a product by ID and returns it response
 */
async function updateProduct(req, res, next) {
  try {
    const productUpdate = await Product.findById(req.params.id);

    if (req.file && req.file.filename) {
      req.body.productImage = req.file.filename;
    } else {
      req.body.productImage = productUpdate.productImage;
    }

    if (
      productUpdate &&
      productUpdate.productImage &&
      req.file &&
      req.file.filename
    ) {
      const dir = `public/images/products/${productUpdate.productImage}`;
      fs.access(dir, (err) => {
        err ? null : unlinkFile(dir);
      });
    }

    if (!req.body.discount) {
      req.body.discount = 0;
    }

    // Save a product record
    const product = await ProductService.updateProductById(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!product) {
      return res
        .status(404)
        .json({ status: 404, error: 'Record does not exist' });
    }

    res.json(product);
  } catch (error) {
    // Return invalid product ID error message
    if (error.name === 'CastError') {
      return res.status(404).json({ status: 404, error: 'Invalid ID' });
    }
    next(error);
  }
}

/**
 * DELETE: /api/synanetics/products/:id
 * Delete a product by ID and returns a json message
 */
async function deleteProduct(req, res, next) {
  try {
    const deleteProduct = await CascadeDeleteProduct(req.params.id);
    await deleteProduct.remove();

    // Delete product image from public folder
    if (deleteProduct.productImage) {
      const dir = `public/images/products/${deleteProduct.productImage}`;
      fs.access(dir, (err) => {
        err ? null : unlinkFile(dir);
      });
    }

    const name = `${deleteProduct.name}  has been deleted`;
    res.status(200).json({ status: 200, message: name });
  } catch (error) {
    // Return invalid role ID error message
    if (error.name === 'CastError') {
      return res.status(404).json({ status: 404, error: 'Invalid ID' });
    }
    next(error);
  }
}

module.exports = {
  getAllProducts,
  getEachProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
