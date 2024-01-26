module.exports = function handleError(err, req, res, next) {
  res.status(err.statusCode).send(err.message)
}