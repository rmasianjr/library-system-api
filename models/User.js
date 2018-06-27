const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  }
});

function validateUser(user) {
  const schema = {
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().min(10).max(100).required(),
    password: Joi.string().min(6).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.User = mongoose.model('User', userSchema);
exports.validateUser = validateUser;