const CastError = require('./CastError');

module.exports = class VoidError extends CastError {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
};
