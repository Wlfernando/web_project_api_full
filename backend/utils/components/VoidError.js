const CastError = require('./CastError');

module.exports = class VoidError extends CastError {
  constructor(message) {
    super(message);
    this.name = 'VoidError';
    this.statusCode = 500;
  }
};
