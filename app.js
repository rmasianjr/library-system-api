const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const books = require('./routes/books');
const categories = require('./routes/categories');
const error = require('./middleware/error');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/categories', categories);
app.use('/api/books', books);
app.use(error);

module.exports = app;
