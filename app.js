const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(logger(process.env.ENVIRONMENT));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use('/locations', require('./app/routes/locations'));
// All the routes for the application
app.use((req, res, next) => {
  const error = new Error('Page you are looking for is not found. Please check the link or try again later');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      handler: 'GLOBAL',
      message: error.message
    }
  })
});

module.exports = app;
