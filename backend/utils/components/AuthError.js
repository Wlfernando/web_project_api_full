module.exports = class AuthError extends Error {
  statusCode = 401
  name = 'AuthError'

  constructor(message) {
    super(message);
  }
}