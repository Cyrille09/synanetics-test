const ApiRouter = require('express').Router();

// Calling api from ApiRoutes page
ApiRouter.use('/api/synanetics', require('./apiRoutes'));

// Landing page api
ApiRouter.get('/', function (req, res, next) {
  res.send('Welcome to our synanetics platform');
});
ApiRouter.get('/api', function (req, res, next) {
  res.json({
    name: 'Cyrille Senami Hounvio',
    email: 'cyrisenahoun@gmail.com',
    age: 30,
  });
});

module.exports = ApiRouter;
