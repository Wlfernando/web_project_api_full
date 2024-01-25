const mongoose = require('mongoose');
const { validateUrlPattern, validateEmailPattern } = require('../utils/utils');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: validateUrlPattern(),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validateEmailPattern(),
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
});

module.exports = mongoose.model('user', userSchema);
