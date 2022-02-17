const Router = require('express').Router();
const productController = require('../controllers/productController');
const { auth, adminAuth } = require('../../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'public/images/products' });

Router.get('/', productController.getAllProducts);
Router.get('/:id', auth, adminAuth, productController.getEachProduct);
Router.post(
  '/',
  upload.single('productImage'),
  auth,
  adminAuth,
  productController.addProduct
);
Router.put(
  '/:id',
  upload.single('productImage'),
  auth,
  adminAuth,
  productController.updateProduct
);
Router.delete('/:id', auth, adminAuth, productController.deleteProduct);

module.exports = Router;
