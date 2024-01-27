const mongoose = require('mongoose');
const { validateUrlPattern, validateEmailPattern, findUserByCredencials } = require('../utils/utils');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    default: "Explorador",
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
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
    select: false,
  },
});

userSchema.statics.findUserByCredencials = findUserByCredencials

module.exports = mongoose.model('user', userSchema);
