require('dotenv').config();
const Basket = require('../models/basketModel');
const { CascadeDeleteBasket } = require('../deleteCascade/deleteCascade');

/**
 * GET: /api/synanetics/baskets
 * Returns all baskets
 */
async function getBasketRecord(req, res, next) {
  try {
    // Count results
    let baskets = [];
    let total = 0;
    let totalWithDiscount = 0;
    let totalQuantity = 0;

    let originalBaskets = await Basket.find({ user: req.user._id }).populate(
      'user product'
    );

    for (let basket of originalBaskets) {
      // discount price
      basket.product.currentPrice =
        (basket.product.price * basket.product.discount) / 100;

      // Ge the total percentage
      basket.product.currentPrice = basket.product.currentPrice =
        basket.product.price - basket.product.currentPrice;

      // Get items total price with discount
      basket.product.currentPrice =
        basket.product.currentPrice * basket.quantity;

      // Get items total price
      basket.product.price = basket.product.price * basket.quantity;
      total += basket.product.price;
      totalWithDiscount += basket.product.currentPrice;
      baskets.push(basket);
    }

    // Get the total quantities for the basket
    for ({ quantity } of originalBaskets) {
      totalQuantity += quantity;
    }

    res.status(200).json({ baskets, total, totalWithDiscount, totalQuantity });
  } catch (error) {
    next(error);
  }
}

/**
 * POST: /api/synanetics/baskets
 * Add a new basket and returns it response
 */
async function addBasket(req, res, next) {
  const newBasket = new Basket(req.body);
  try {
    // Get existent record
    const existentBasket = await Basket.findOne({
      user: req.body.user,
      product: req.body.product,
    });

    // Return error message
    let errorMessage = '';
    let { productError, userError } = errorMessage;

    if (!req.body.user || !req.body.product) {
      if (!req.body.product) {
        productError = 'Required';
      }
      if (!req.body.user) {
        userError = 'Required';
      }
      return res.status(400).json({
        status: 400,
        productError: productError,
        userError: userError,
      });
    }

    // Save a basket record
    let basket = null;
    if (existentBasket) {
      basket = await Basket.findOneAndUpdate(
        { _id: existentBasket._id },
        { quantity: existentBasket.quantity + 1 },
        {
          new: true,
        }
      );
    } else {
      basket = await newBasket.save();
      await basket.populate('user product');
    }

    res.status(201).json({ basket });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT: /api/synanetics/baskets/increase/:id
 * Update a basket by ID and returns it response
 */
async function updateBasketWithIncrease(req, res, next) {
  try {
    // Get existent record
    const existentBasket = await Basket.findOne({
      user: req.body.user,
      product: req.body.product,
    });

    // Save a basket record
    let basket = null;
    if (existentBasket) {
      basket = await Basket.findOneAndUpdate(
        { _id: existentBasket._id },
        { quantity: existentBasket.quantity + 1 },
        {
          new: true,
        }
      );
    }

    if (!basket) {
      return res
        .status(404)
        .json({ status: 404, error: 'Record does not exist' });
    }

    res.json(basket);
  } catch (error) {
    next(error);
  }
}

/**
 * PUT: /api/synanetics/baskets/decrease/:id
 * Update a basket by ID and returns it response
 */
async function updateBasketWithDecrease(req, res, next) {
  try {
    // Get existent record
    const existentBasket = await Basket.findOne({
      user: req.body.user,
      product: req.body.product,
    });

    // Save a basket record
    let basket = null;
    if (existentBasket) {
      basket = await Basket.findOneAndUpdate(
        { _id: existentBasket._id },
        { quantity: existentBasket.quantity - 1 },
        {
          new: true,
        }
      );
    }

    if (!basket) {
      return res
        .status(404)
        .json({ status: 404, error: 'Record does not exist' });
    }

    res.json(basket);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE: /api/synanetics/baskets/:id
 * Delete a basket by ID and returns a json message
 */
async function deleteBasket(req, res, next) {
  try {
    const deleteBasket = await CascadeDeleteBasket(req.params.id);
    await deleteBasket.remove();

    res.status(200).json({ status: 200, message: 'Delete' });
  } catch (error) {
    // Return invalid role ID error message
    if (error.name === 'CastError') {
      return res.status(404).json({ status: 404, error: 'Invalid ID' });
    }
    next(error);
  }
}

async function deleteBasketWithLastItem(req, res, next) {
  try {
    // Get existent record
    const existentBasket = await Basket.findOne({
      user: req.body.user,
      product: req.body.product,
    });

    // Save a basket record
    let basket = null;
    if (existentBasket) {
      basket = await Basket.deleteMany({ _id: existentBasket._id });
    }

    res.json(basket);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBasketRecord,
  addBasket,
  updateBasketWithIncrease,
  updateBasketWithDecrease,
  deleteBasketWithLastItem,
  deleteBasket,
};
