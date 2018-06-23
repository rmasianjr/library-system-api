const express = require('express');
const bodyParser = require('body-parser');

const categories = require('./routes/categories');
const error = require('./middleware/error');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/categories', categories);
app.use(error);

module.exports = app;
