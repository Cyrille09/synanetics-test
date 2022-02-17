const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const connectDB = require('./db');
const { DB_PORT } = require('./config');
const { socketIO } = require('./socket/socket');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
require('dotenv').config();

// Create express app

(async function () {
  // Connect to the database
  connectDB();

  /**
   * add localisations
   */
  //   i18next
  //     .use(Backend)
  //     .use(middleware.LanguageDetector)
  //     .init({
  //       // debug: true,
  //       backend: {
  //         // eslint-disable-next-line no-path-concat
  //         loadPath: './localisations/{{lng}}/translation.json',
  //       },
  //       fallbackLng: 'en',
  //     });

  // Add middlewares
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static('public'));
  //app.use(fileUpload());
  //   app.use(middleware.handle(i18next));

  // Add routes
  app.use('', require('./api'));

  /**
   * List of socket io
   */
  socketIO(io);

  //start express app
  const PORT = DB_PORT || 5000;
  server.listen(PORT, () => {
    console.log(
      `server listening in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
})();
