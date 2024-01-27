const jwt = require('jsonwebtoken');
const AuthError = require('../utils/components/AuthError');

const rejected = new AuthError('Authorization needed.');

module.exports = function authorize(req, res, next) {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(rejected)
    return
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'chanchito')
  } catch {
    next(rejected)
    return
  }

  req.user = payload
  next()
}