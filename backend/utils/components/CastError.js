module.exports = class CastError extends Error {
  statusCode = 404;
  name = 'CastError'
  
  constructor(message) {
    super(message);
  }
}