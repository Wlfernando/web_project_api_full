module.exports = class CastError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = 'CastError';
  }
};
