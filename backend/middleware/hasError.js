module.exports = function hasError(err, req, res, next) {
  switch (err.name) {
    case undefined:
      res.status(500).send({ message: 'Internal Error' })
      break

    case 'ValidationError':
      const theErrors = Object
        .entries(err.errors)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value.message }), {});

      res.status(400).send(theErrors);
      break

    case 'MongoServerError':
      res.status(400).send({ message: 'Already registered.'})
      break

    default:
      res.status(err.statusCode).send({message: err.message})
  }
}