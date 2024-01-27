const jwt = require('jsonwebtoken');
const Forbidden = require('../utils/components/Forbidden');

const rejected = new Forbidden('Authorization needed.');

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