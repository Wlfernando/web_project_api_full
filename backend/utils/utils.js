const { isEmail, isURL } = require('validator');
const { celebrate, Joi } = require('celebrate');
const bcrypt = require('bcryptjs');
const AuthError = require('./components/AuthError');

const credencialsError = new AuthError('Incorrect password or email.');

function validateUrlPattern() {
  return {
    validator(v) {
      const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

      return urlPattern.test(v);
    },
    message: 'Introduce a valid url.',
  };
}

function validateEmailPattern() {
  return {
    validator(v) {
      return isEmail(v);
    },
    message: 'Introduce a valid email.',
  };
}

function validateMailAndPass() {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    }),
  });
}

async function findUserByCredencials({ email, password }) {
  const theUser = await this.findOne({ email }).select('+password');

  if (!theUser) {
    return Promise.reject(credencialsError);
  }

  const matched = await bcrypt.compare(password, theUser.password);

  if (!matched) {
    return Promise.reject(credencialsError);
  }

  return Promise.resolve(theUser);
}

function validateURL(value, helpers) {
  if (isURL(value)) {
    return value;
  }

  return helpers.error('string.uri');
}

function validateAvatar() {
  return celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  });
}

function validateCard() {
  return celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  });
}

module.exports = {
  validateUrlPattern,
  validateEmailPattern,
  validateMailAndPass,
  findUserByCredencials,
  validateAvatar,
  validateCard,
};
