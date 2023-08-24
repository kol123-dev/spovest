const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
 
const connectDB = require('./server/database/connection');



// Dotenv config
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

// Log requests with Morgan
app.use(morgan('tiny'));

// mongoDB connection
connectDB();  

// Middleware
app.use(express.json());
app.use(cookieParser());

// Parse requests with body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');

// Define the path to the views directory 
const viewsPath = path.join(__dirname, 'views');

// Serve static assets
app.use(express.static(path.join(__dirname, 'assets')));
// app.use(express.static(viewsPath));

// load routers
app.use('/', require('./server/Routes/router')); 
app.use('/', require('./server/Routes/playersRoutes')); 




app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`); 
});
  