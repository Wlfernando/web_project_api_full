function validateUrlPattern() {
  return {
    validator(v) {
      const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

      return urlPattern.test(v);
    },
    message: 'Introduce a valid url.',
  };
}

module.exports = {
  validateUrlPattern,
};
