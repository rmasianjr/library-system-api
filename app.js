const express = require('express');
const bodyParser = require('body-parser');

const categories = require('./routes/categories');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/categories', categories);

module.exports = app;
