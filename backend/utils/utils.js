const { isEmail } = require('validator');
const { celebrate, Joi } = require('celebrate')

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
      return isEmail(v)
    },
    message: 'Introduce a valid email.'
  }
}

function validateMailAndPass() {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    })
  })
}

module.exports = {
  validateUrlPattern,
  validateEmailPattern,
  validateMailAndPass,
};
