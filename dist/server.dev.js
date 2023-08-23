"use strict";

var express = require('express');

var dotenv = require('dotenv');

var morgan = require('morgan');

var bodyparser = require('body-parser');

var path = require('path');

var cookieParser = require('cookie-parser');

var app = express();

var connectDB = require('./server/database/connection'); // Dotenv config


dotenv.config({
  path: 'config.env'
});
var PORT = process.env.PORT || 8080; // Log requests with Morgan

app.use(morgan('tiny')); // mongoDB connection

connectDB(); // Middleware

app.use(express.json());
app.use(cookieParser()); // Parse requests with body-parser

app.use(bodyparser.urlencoded({
  extended: true
})); // Set view engine

app.set('view engine', 'ejs'); // Define the path to the views directory 

var viewsPath = path.join(__dirname, 'views'); // Serve static assets

app.use(express["static"](path.join(__dirname, 'assets'))); // app.use(express.static(viewsPath));
// load routers

app.use('/', require('./server/Routes/router'));
app.use('/', require('./server/Routes/playersRoutes'));
app.listen(PORT, function () {
  console.log("Server running on port http://localhost:".concat(PORT));
});
//# sourceMappingURL=server.dev.js.map
