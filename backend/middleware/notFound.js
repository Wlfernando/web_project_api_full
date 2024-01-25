function notFound(req, res) {
  res.status(404).send({ message: 'Request not found.' });
}

module.exports = notFound;
