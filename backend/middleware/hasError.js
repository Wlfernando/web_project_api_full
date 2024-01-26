module.exports = function hasError(err, req, res, next) {
  if (err.name === 'ValidationError') {
    const theErrors = Object
      .entries(err.errors)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value.message }), {});

    res.status(400).send(theErrors);
    return;
  }

  if (!err.name) {
    res.status(500).send({ message: 'Internal Error' })
  }

  res.status(err.statusCode).send({message: err.message})
}