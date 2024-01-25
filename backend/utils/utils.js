const { isEmail } = require('validator');

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

module.exports = {
  validateUrlPattern,
  validateEmailPattern,
};
