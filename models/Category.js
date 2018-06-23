const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100
  }
});

function validateCategory(category) {
  const schema = {
    name: Joi.string().trim().min(5).max(100).required()
  };

  return Joi.validate(category, schema);
}

exports.Category = mongoose.model('Category', categorySchema);
exports.validateCategory = validateCategory;