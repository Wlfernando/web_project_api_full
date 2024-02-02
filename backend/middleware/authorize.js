const jwt = require('jsonwebtoken');
const Forbidden = require('../utils/components/Forbidden');
const { key } = require('../utils/const');

const rejected = new Forbidden('Authorization needed.');

module.exports = function authorize(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(rejected);
    return;
  }

  const token = authorization.replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, key);
  } catch (e) {
    next(rejected);
    return;
  }

  next();
};
