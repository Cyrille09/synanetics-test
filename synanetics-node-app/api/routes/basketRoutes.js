const Router = require('express').Router();
const basketController = require('../controllers/basketController');
const { auth, adminAuth } = require('../../middleware/auth');

Router.get('/each', auth, basketController.getBasketRecord);
Router.post('/', auth, basketController.addBasket);
Router.post(
  '/increase',
  auth,
  adminAuth,
  basketController.updateBasketWithIncrease
);
Router.post(
  '/decrease',
  auth,
  adminAuth,
  basketController.updateBasketWithDecrease
);
Router.post(
  '/delete',
  auth,
  adminAuth,
  basketController.deleteBasketWithLastItem
);
Router.delete('/:id', auth, adminAuth, basketController.deleteBasket);

module.exports = Router;
