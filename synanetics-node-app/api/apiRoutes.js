const ApiRouter = require('express').Router();

ApiRouter.use('/users', require('./routes/userRoutes'));
ApiRouter.use('/products', require('./routes/productRoutes'));
ApiRouter.use('/baskets', require('./routes/basketRoutes'));

ApiRouter.get('/', function (req, res, next) {
  res.json({ name: 'Cyrille Senami Hounvio', email: 'cyrisenahoun@gmail.com' });
});

module.exports = ApiRouter;
