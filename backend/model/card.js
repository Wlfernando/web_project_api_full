const mongoose = require('mongoose');
const { validateUrlPattern } = require('../utils/utils');

const types = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: validateUrlPattern(),
  },
  owner: {
    type: types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: types.ObjectId,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
